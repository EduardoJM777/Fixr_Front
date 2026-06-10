import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-vazio-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './chat-vazio-prestador.html',
  styleUrl: './chat-vazio-prestador.css'
})
export class ChatVazioPrestadorComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('mensagensContainer') mensagensContainer!: ElementRef;

  chatSelecionado: Chats | null = null;
  chatsAtivos: Chats[] = [];
  mensagensPorChat: Map<number, Mensagens[]> = new Map();
  mensagens: Mensagens[] = [];
  private chatsSubscritos: Set<number> = new Set();
  novaMensagem = '';
  chatEncerrado = false;
  deveRolar = false;
  isFavorito: boolean = false;
  carregandoFavorito: boolean = false;
  private chatIdInicial: number | null = null;
  private subs: Subscription[] = [];
  anunciosChamados: { id: number; descricao: string; imagemUrl?: string; chatId: number }[] = [];

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { chatId: number };
    if (state?.chatId) {
      this.chatIdInicial = state.chatId;
    }
  }

  ngOnInit(): void {
    this.subs.push(
      this.chatService.chatsAtivos$.subscribe(chats => {
        this.chatsAtivos = chats;

        this.anunciosChamados = chats
          .filter(c => c.anuncio)
          .map(c => ({
            id: c.anuncio!.id,
            descricao: c.anuncio!.descricao,
            imagemUrl: c.anuncio!.id
              ? `http://localhost:8080/anuncio/${c.anuncio!.id}/imagem`
              : undefined,
            chatId: c.id
          }));

        this.cdr.detectChanges();
      })
    );


    this.subs.push(
      this.chatService.chatIniciado$.subscribe(chatId => {
        this.entrarNoChat(chatId);
        this.chatService.buscarChat(chatId).subscribe(chat => {
          this.selecionarChat(chat);
        });
      })
    );

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

    if (this.chatIdInicial) {
      this.chatService.iniciarChatNaSidebar(this.chatIdInicial);
    }
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.chatService.carregarChatsAtivos('PRESTADOR', usuario.id);
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

    this.chatService.buscarHistorico(chatId).subscribe(msgs => {
      this.mensagensPorChat.set(chatId, msgs);
      if (this.chatSelecionado?.id === chatId) {
        this.mensagens = [...msgs];
        this.deveRolar = true;
      }
      this.cdr.detectChanges();
    });

    this.chatService.entrarNoChat(chatId);
  }

  selecionarChat(chat: Chats): void {
    this.chatSelecionado = chat;
    this.chatEncerrado = chat.status === 'ENCERRADO';
    this.mensagens = this.mensagensPorChat.get(chat.id) || [];
    this.deveRolar = true;
    this.isFavorito = false;
    this.entrarNoChat(chat.id);
    this.verificarFavorito(chat.cliente.id);
    this.cdr.detectChanges();
  }

  selecionarChatPorAnuncio(chatId: number): void {
    const chat = this.chatsAtivos.find(c => c.id === chatId);
    if (chat) this.selecionarChat(chat);
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
      papelRemetente: 'PRESTADOR',
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

  adicionarFavorito(): void {
    if (!this.chatSelecionado || this.isFavorito || this.carregandoFavorito) return;

    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    this.carregandoFavorito = true;
    const clienteId = this.chatSelecionado.cliente.id;

    this.http.post(
      `http://localhost:8080/favorito/${clienteId}?usuarioId=${usuario.id}`,
      {},
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.isFavorito = true;
        this.carregandoFavorito = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregandoFavorito = false;
        alert('Erro ao adicionar favorito.');
      }
    });
  }

  private verificarFavorito(clienteId: number): void {
    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    this.http.get<any[]>(
      `http://localhost:8080/favorito?usuarioId=${usuario.id}`
    ).subscribe({
      next: (favoritos) => {
        this.isFavorito = favoritos.some(f => f.id === clienteId);
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  fecharAcordo(): void {
  if (!this.chatSelecionado) return;
  this.router.navigate(['/fecharAcordo'], {
    state: {
      chatId: this.chatSelecionado.id,
      outroNome: this.chatSelecionado.cliente.nome,
      papel: 'PRESTADOR'
    }
  });
}
}