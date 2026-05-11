import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';
import { ChatsDTO } from '../../../models/chats.models';
import { AnuncioResponseDTO } from '../../../models/anuncioResponseDTO.model';


@Component({
  selector: 'app-buscar-anuncio',
  standalone: true,
  imports: [CommonModule, FormsModule, SubHeaderPrestador, HeadrFixrPrestador],
  templateUrl: './buscar-anuncio.html',
  styleUrls: ['./buscar-anuncio.css']
})
export class BuscarAnuncioComponent implements OnInit {

  anuncios: AnuncioResponseDTO[] = [];
  anunciosFiltrados: AnuncioResponseDTO[] = [];
  profissoes: string[] = [];
  profissaoSelecionada: string = '';
  chamandoAnuncioId: number | null = null;
  chamadaRecusada = false;
  private sub: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.http.get<AnuncioResponseDTO[]>('http://localhost:8080/anuncio')
      .subscribe({
        next: (dados) => {
          this.anuncios = dados;
          this.anunciosFiltrados = dados;
          this.profissoes = [...new Set(dados.map(a => a.profissaoNome))];
        },
        error: () => alert('Erro ao carregar anúncios.')
      });
  }

  filtrar(): void {
    this.anunciosFiltrados = this.anuncios.filter(a =>
      !this.profissaoSelecionada || a.profissaoNome === this.profissaoSelecionada
    );
  }

  chamar(anuncio: AnuncioResponseDTO): void {
    console.log('anuncio:', anuncio);
    console.log('clienteId:', anuncio.clienteId);

    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    this.chamandoAnuncioId = anuncio.id;

    const dto: ChatsDTO = {
      idCliente: anuncio.clienteId,
      idPrestador: usuario.id,
      chamadorId: usuario.id,
      chamadorNome: usuario.nome,
      papelChamador: 'PRESTADOR',
      destinatarioId: anuncio.clienteId,
      destinatarioNome: anuncio.clienteNome,
      anuncioId: anuncio.id,
      anuncioTitulo: anuncio.descricao,
    };

    this.chatService.iniciarChamada(dto);

    this.sub = this.chatService.respostas$.subscribe(res => {
      this.chamandoAnuncioId = null;
      if (res.aceito) {
        this.chatService.chatIniciado$.next(res.chatId);
        this.router.navigate(['/chatVazioPrestador'], {
          state: { chatId: res.chatId }
        });
      } else {
        this.chamadaRecusada = true;
        setTimeout(() => this.chamadaRecusada = false, 4000);
      }
      this.sub?.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}