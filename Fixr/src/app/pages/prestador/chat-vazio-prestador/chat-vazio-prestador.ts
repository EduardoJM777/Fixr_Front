import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';
import { Chats } from '../../../models/chats.models';
import { Mensagens, MensagensDTO } from '../../../models/mensagens.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-chat-vazio-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './chat-vazio-prestador.html',
  styleUrl: './chat-vazio-prestador.css'
})
export class ChatVazioPrestadorComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('mensagensContainer') mensagensContainer!: ElementRef;

  chatAtivo: Chats | null = null;
  mensagens: Mensagens[] = [];
  novaMensagem = '';
  chatEncerrado = false;
  deveRolar = false;
  private chatIdInicial: number | null = null;

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { chatId: number };
    // console.log('nav:', nav);
    // console.log('state:', state);
    if (state?.chatId) {
      this.chatIdInicial = state.chatId;
      // console.log('chatIdInicial definido:', this.chatIdInicial);
    }
  }

  ngOnInit(): void {
    // console.log('ngOnInit, chatIdInicial:', this.chatIdInicial);
    if (this.chatIdInicial) {
      this.entrarNoChat(this.chatIdInicial);
    }

    this.subs.push(
        this.chatService.chatIniciado$.subscribe(chatId => {
            // console.log('chatIniciado$ recebido:', chatId);
            this.entrarNoChat(chatId);
        })
    );

    this.subs.push(
      this.chatService.mensagens$.subscribe(msg => {
        if (this.chatAtivo && msg.chat?.id === this.chatAtivo.id) {
          if (msg.tipo === 'LEAVE') {
            this.chatEncerrado = true;
          }
          this.mensagens.push(msg);
          this.deveRolar = true;
        }
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.deveRolar) {
      this.rolarParaBaixo();
      this.deveRolar = false;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  entrarNoChat(chatId: number): void {
    this.chatService.buscarChat(chatId).subscribe({
      next: (chat) => {
        // console.log('chat carregado:', chat);
        this.chatAtivo = chat;
      },
      error: (err) => {
        console.error('erro ao buscar chat:', err);
      }
    });

    this.chatService.buscarHistorico(chatId).subscribe(msgs => {
      this.mensagens = msgs;
      this.deveRolar = true;
    });

    this.chatService.entrarNoChat(chatId);
  }

  enviar(): void {
    const texto = this.novaMensagem.trim();
    if (!texto || !this.chatAtivo || this.chatEncerrado) return;

    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    const dto: MensagensDTO = {
      texto,
      idChat: this.chatAtivo.id,
      chatId: this.chatAtivo.id,
      remetenteId: usuario.id,
      remetenteNome: usuario.nome,
      papelRemetente: 'PRESTADOR',
      tipo: 'CHAT',
    };

    this.chatService.enviarMensagem(dto);
    this.novaMensagem = '';
  }

  encerrar(): void {
    // console.log('encerrar chamado, chatAtivo:', this.chatAtivo);
    if (!this.chatAtivo) return;
    this.chatService.encerrarChat(this.chatAtivo.id);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviar();
    }
  }

  isMinha(msg: Mensagens): boolean {
    return msg.papelRemetente === 'PRESTADOR';
  }

  isSistema(msg: Mensagens): boolean {
    return msg.tipo === 'JOIN' || msg.tipo === 'LEAVE';
  }

  private rolarParaBaixo(): void {
    try {
      const el = this.mensagensContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch { }
  }
}