import { Component, OnInit } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { AnuncioResponseDTO } from '../../../models/anuncioResponseDTO.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth-service';
import { StatusAnuncio } from '../../../models/enums/statusAnuncio.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anuncios-publicados',
  standalone: true,
  imports: [CommonModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './anuncios-publicados.html',
  styleUrl: './anuncios-publicados.css',
})

export class AnunciosPublicados implements OnInit {

  anuncios: AnuncioResponseDTO[] = [];
  carregando = true;
  erro: string | null = null;

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carregarAnuncios();
  }

  carregarAnuncios(): void {
    const usuario = this.authService.getUsuario();

    if (!usuario?.id) {
      this.erro = 'Usuário não autenticado.';
      this.carregando = false;
      return;
    }

    this.http.get<AnuncioResponseDTO[]>(`${this.apiUrl}/anuncio/cliente/${usuario.id}`).subscribe({
      next: (dados) => {
        this.anuncios = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar anúncios:', err);
        this.erro = 'Não foi possível carregar os anúncios.';
        this.carregando = false;
      }
    });
  }

  getImagemUrl(anuncio: AnuncioResponseDTO): string {
    return `${this.apiUrl}${anuncio.imagemUrl}`;
  }

  getStatusLabel(status: StatusAnuncio): string {
    const labels: Record<StatusAnuncio, string> = {
      [StatusAnuncio.RASCUNHO]: 'Rascunho',
      [StatusAnuncio.PUBLICADO]: 'Publicado',
      [StatusAnuncio.PAUSADO]: 'Pausado',
      [StatusAnuncio.EM_NEGOCIACAO]: 'Em Negociação',
      [StatusAnuncio.ACORDO_FECHADO]: 'Acordo Fechado',
      [StatusAnuncio.EM_ANDAMENTO]: 'Em Andamento',
      [StatusAnuncio.CONCLUIDO]: 'Concluído',
      [StatusAnuncio.CANCELADO]: 'Cancelado',
      [StatusAnuncio.EXPIRADO]: 'Expirado',
      [StatusAnuncio.ARQUIVADO]: 'Arquivado'
    };
    return labels[status] ?? status;
  }

  getStatusClasse(status: StatusAnuncio): string {
    const classes: Record<StatusAnuncio, string> = {
      [StatusAnuncio.RASCUNHO]: 'status-rascunho',
      [StatusAnuncio.PUBLICADO]: 'status-publicado',
      [StatusAnuncio.PAUSADO]: 'status-pausado',
      [StatusAnuncio.EM_NEGOCIACAO]: 'status-negociacao',
      [StatusAnuncio.ACORDO_FECHADO]: 'status-acordo',
      [StatusAnuncio.EM_ANDAMENTO]: 'status-andamento',
      [StatusAnuncio.CONCLUIDO]: 'status-concluido',
      [StatusAnuncio.CANCELADO]: 'status-cancelado',
      [StatusAnuncio.EXPIRADO]: 'status-expirado',
      [StatusAnuncio.ARQUIVADO]: 'status-arquivado'
    };
    return classes[status] ?? '';
  }

}
