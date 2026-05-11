import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chats } from '../../../models/chats.models';
import { Mensagens, MensagensDTO } from '../../../models/mensagens.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-chat-vazio',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './chat-vazio.component.html',
  styleUrl: './chat-vazio.component.css'
})
export class ChatVazioComponent implements OnInit, OnDestroy, AfterViewChecked {

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
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { chatId: number };
    if (state?.chatId) {
      this.chatIdInicial = state.chatId;
    }
  }

  ngOnInit(): void {
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
        }this.cdr.detectChanges();
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
    this.cdr.detectChanges();
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
      papelRemetente: 'CLIENTE',
      tipo: 'CHAT',
    };

    this.chatService.enviarMensagem(dto);
    this.novaMensagem = '';
    this.cdr.detectChanges();
  }

  encerrar(): void {
    console.log('encerrar chamado, chatAtivo:', this.chatAtivo);
    if (!this.chatAtivo) return;
    this.chatService.encerrarChat(this.chatAtivo.id);
    this.cdr.detectChanges();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviar();
      this.cdr.detectChanges();
    }
  }

  isMinha(msg: Mensagens): boolean {
    return msg.papelRemetente === 'CLIENTE';
    this.cdr.detectChanges();
  }

  isSistema(msg: Mensagens): boolean {
    return msg.tipo === 'JOIN' || msg.tipo === 'LEAVE';
    this.cdr.detectChanges();
  }

  private rolarParaBaixo(): void {
    try {
      const el = this.mensagensContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }
}