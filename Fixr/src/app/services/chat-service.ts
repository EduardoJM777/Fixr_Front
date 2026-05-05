import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Mensagens, MensagensDTO } from '../models/mensagens.model';
import { Chats, CallNotification, ChatsDTO } from '../models/chats.models';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class ChatService {

    private readonly API_URL = 'http://localhost:8080/chats';
    private readonly WS_URL = 'http://localhost:8080/ws-chat';

    private stompClient!: Client;
    private subscriptions: StompSubscription[] = [];

    mensagens$ = new Subject<Mensagens>();
    chamadas$ = new Subject<CallNotification>();
    respostas$ = new Subject<{ chatId: number; aceito: boolean }>();
    conectado$ = new BehaviorSubject<boolean>(false);
    chatIniciado$ = new Subject<number>();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    conectar(): void {
        const usuario = this.authService.getUsuario();
        if (!usuario) return;

        this.stompClient = new Client({
            webSocketFactory: () => new SockJS(this.WS_URL),
            reconnectDelay: 5000,

            onConnect: () => {
                this.conectado$.next(true);
                console.log('WebSocket conectado, userId:', usuario.id);


                this.stompClient.subscribe(
                    `/topic/usuario/${usuario.id}/chamada`,
                    (msg: IMessage) => {
                        console.log('Chamada recebida:', msg.body);
                        this.chamadas$.next(JSON.parse(msg.body));
                    }
                );


                this.stompClient.subscribe(
                    `/topic/usuario/${usuario.id}/resposta-chamada`,
                    (msg: IMessage) => {
                        console.log('resposta da chamada recebida:', msg.body);
                        this.respostas$.next(JSON.parse(msg.body));
                    }
                );
            },

            onDisconnect: () => this.conectado$.next(false),
            onStompError: (frame) => console.error('STOMP erro:', frame),
        });

        this.stompClient.activate();
    }

    desconectar(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
        this.stompClient?.deactivate();
        this.conectado$.next(false);
    }


    entrarNoChat(chatId: number): void {
        const sub = this.stompClient.subscribe(
            `/topic/chat/${chatId}`,
            (msg: IMessage) => this.mensagens$.next(JSON.parse(msg.body))
        );
        this.subscriptions.push(sub);
    }

    buscarChat(chatId: number): Observable<Chats> {
        return this.http.get<Chats>(`${this.API_URL}/${chatId}`);
    }


    iniciarChamada(dto: ChatsDTO): void {
        if (!this.stompClient?.connected) {
            console.warn('WebSocket não conectado, tentando reconectar...');
            this.conectar();

            const sub = this.conectado$.subscribe(conectado => {
                if (conectado) {
                    this.stompClient.publish({
                        destination: '/app/chat.chamar',
                        body: JSON.stringify(dto),
                    });
                    sub.unsubscribe();
                }
            });
            return;
        }

        this.stompClient.publish({
            destination: '/app/chat.chamar',
            body: JSON.stringify(dto),
        });
    }

    responderChamada(chatId: number, aceitar: boolean): void {
        const usuario = this.authService.getUsuario();
        this.stompClient.publish({
            destination: '/app/chat.responder',
            body: JSON.stringify({
                chatId,
                aceitar,
                respondeuId: usuario?.id,
            }),
        });
    }

    enviarMensagem(dto: MensagensDTO): void {
        this.stompClient.publish({
            destination: '/app/chat.enviar',
            body: JSON.stringify(dto),
        });
    }

    encerrarChat(chatId: number): void {
        this.stompClient.publish({
            destination: '/app/chat.encerrar',
            body: JSON.stringify({ chatId }),
        });
    }



    buscarHistorico(chatId: number): Observable<Mensagens[]> {
        return this.http.get<Mensagens[]>(`${this.API_URL}/historico/${chatId}`);
    }

    listarChats(): Observable<Chats[]> {
        return this.http.get<Chats[]>(this.API_URL);
    }
}