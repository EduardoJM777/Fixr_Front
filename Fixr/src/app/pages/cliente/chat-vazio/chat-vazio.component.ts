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

  chatSelecionado: Chats | null = null;
  chatsAtivos: Chats[] = [];
  mensagensPorChat: Map<number, Mensagens[]> = new Map();
  mensagens: Mensagens[] = [];
  novaMensagem = '';
  chatEncerrado = false;
  deveRolar = false;
  private chatIdInicial: number | null = null;
  private chatsSubscritos: Set<number> = new Set();

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
    // Ouve lista de chats ativos
    this.subs.push(
      this.chatService.chatsAtivos$.subscribe(chats => {
        this.chatsAtivos = chats;
        this.cdr.detectChanges();
      })
    );

    // Quando um novo chat é iniciado, entra nele e seleciona
    this.subs.push(
      this.chatService.chatIniciado$.subscribe(chatId => {
        this.entrarNoChat(chatId);
        this.chatService.buscarChat(chatId).subscribe(chat => {
          this.selecionarChat(chat);
        });
      })
    );

    // Ouve mensagens em tempo real
    this.subs.push(
      this.chatService.mensagens$.subscribe(msg => {
        if (!msg.chat?.id) return;
        const msgs = this.mensagensPorChat.get(msg.chat.id) || [];
        msgs.push(msg);
        this.mensagensPorChat.set(msg.chat.id, msgs);

        if (this.chatSelecionado?.id === msg.chat.id) {
          this.mensagens = [...msgs];
          if (msg.tipo === 'LEAVE') this.chatEncerrado = true;
          this.deveRolar = true;
        }
        this.cdr.detectChanges();
      })
    );

    // Se veio com chatId inicial (chamada aceita pelo cliente)
    if (this.chatIdInicial) {
      this.chatService.iniciarChatNaSidebar(this.chatIdInicial);
    }

    const usuario = this.authService.getUsuario();
if (usuario) {
    this.chatService.carregarChatsAtivos('CLIENTE', usuario.id);
}
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
    if (this.chatsSubscritos.has(chatId)) return;
    this.chatsSubscritos.add(chatId);

    // Só carrega histórico se ainda não tiver mensagens
    if (!this.mensagensPorChat.has(chatId)) {
        this.chatService.buscarHistorico(chatId).subscribe(msgs => {
            this.mensagensPorChat.set(chatId, msgs);
            if (this.chatSelecionado?.id === chatId) {
                this.mensagens = [...msgs];
                this.deveRolar = true;
            }
            this.cdr.detectChanges();
        });
    }

    this.chatService.entrarNoChat(chatId);
}

  selecionarChat(chat: Chats): void {
    this.chatSelecionado = chat;
    this.chatEncerrado = chat.status === 'ENCERRADO';
    this.mensagens = [...(this.mensagensPorChat.get(chat.id) || [])];
    this.deveRolar = true;
    this.entrarNoChat(chat.id);
    this.cdr.detectChanges();
}

  nomeOutroLado(chat: Chats): string {
    return chat.prestador.nome;
  }

  enviar(): void {
    const texto = this.novaMensagem.trim();
    if (!texto || !this.chatSelecionado || this.chatEncerrado) return;

    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    const dto: MensagensDTO = {
      texto,
      idChat: this.chatSelecionado.id,
      chatId: this.chatSelecionado.id,
      remetenteId: usuario.id,
      remetenteNome: usuario.nome,
      papelRemetente: 'CLIENTE',
      tipo: 'CHAT',
    };

    this.chatService.enviarMensagem(dto);
    this.novaMensagem = '';
  }

  encerrar(): void {
    if (!this.chatSelecionado) return;
    this.chatService.encerrarChat(this.chatSelecionado.id);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviar();
    }
  }

  isMinha(msg: Mensagens): boolean {
    return msg.papelRemetente === 'CLIENTE';
  }

  isSistema(msg: Mensagens): boolean {
    return msg.tipo === 'JOIN' || msg.tipo === 'LEAVE';
  }

  private rolarParaBaixo(): void {
    try {
      const el = this.mensagensContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }
}