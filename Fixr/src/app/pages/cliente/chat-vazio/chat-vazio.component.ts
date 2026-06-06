import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chats } from '../../../models/chats.models';
import { Mensagens, MensagensDTO } from '../../../models/mensagens.model';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';
import { AnuncioResponseDTO } from '../../../models/anuncioResponseDTO.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-vazio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderFixrCliente, SubHeaderCliente],
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
  meusAnuncios: AnuncioResponseDTO[] = [];
  isFavorito: boolean = false;
  carregandoFavorito: boolean = false;
  private chatIdInicial: number | null = null;
  private chatsSubscritos: Set<number> = new Set();
  private subs: Subscription[] = [];

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
      this.chatService.carregarChatsAtivos('CLIENTE', usuario.id);
      this.http.get<AnuncioResponseDTO[]>(`http://localhost:8080/anuncio/cliente/${usuario.id}`)
        .subscribe({
          next: (anuncios) => {
            // console.log('meus anuncios:', anuncios);
            this.meusAnuncios = anuncios;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('erro:', err)
        });
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

  adicionarFavorito(): void {
    if (!this.chatSelecionado || this.isFavorito || this.carregandoFavorito) return;

    const usuario = this.authService.getUsuario();
    // console.log('usuario logado:', usuario);
    if (!usuario) return;

    this.carregandoFavorito = true;
    const prestadorId = this.chatSelecionado.prestador.id;

    this.http.post(
      `http://localhost:8080/favorito/${prestadorId}?usuarioId=${usuario.id}`,
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

  private verificarFavorito(prestadorId: number): void {
    const usuario = this.authService.getUsuario();
    // console.log('verificarFavorito - usuario:', usuario);
    if (!usuario) return;

    this.http.get<any[]>(
      `http://localhost:8080/favorito?usuarioId=${usuario.id}`
    ).subscribe({
      next: (favoritos) => {
        this.isFavorito = favoritos.some(f => f.id === prestadorId);
        this.cdr.detectChanges();
      },
      error: () => { }
    });
  }

  selecionarChat(chat: Chats): void {
    this.chatSelecionado = chat;
    this.chatEncerrado = chat.status === 'ENCERRADO';
    this.mensagens = [...(this.mensagensPorChat.get(chat.id) || [])];
    this.deveRolar = true;
    this.isFavorito = false;
    this.entrarNoChat(chat.id);
    this.verificarFavorito(chat.prestador.id);
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
    } catch { }
  }

  irAnuncio() {
    this.router.navigate(['/criarAnuncio'])
  }

  irEdicaoAnuncio(id: number): void{
    this.router.navigate(['/edicaoAnuncio', id]);
  }

}