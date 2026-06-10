import { Component, OnInit } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { CommonModule } from '@angular/common';
import { AnuncioResponseDTO } from '../../../models/anuncioResponseDTO.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StatusAnuncio } from '../../../models/enums/statusAnuncio.enum';

export interface EstatisticasAnuncioDTO {
  anuncioId: number;
  ctr: number;
  visualizacoesUnicas: number;
  visualizacoesTotais: number;
  rankingPosicao: number;
}

@Component({
  selector: 'app-estatisticas-anuncio',
  standalone: true,
  imports: [CommonModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './estatisticas-anuncio.html',
  styleUrl: './estatisticas-anuncio.css',
})

export class EstatisticasAnuncio implements OnInit {

  anuncio: AnuncioResponseDTO | null = null;
  stats: EstatisticasAnuncioDTO | null = null;
  carregando = true;
  erro: string | null = null;

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.erro = 'Anúncio não encontrado.';
      this.carregando = false;
      return;
    }
    this.carregarDados(id);
  }

  private carregarDados(id: number): void {
    this.http.get<AnuncioResponseDTO>(`${this.apiUrl}/anuncio/${id}`).subscribe({
      next: (anuncio) => {
        this.anuncio = anuncio;
        this.carregarEstatisticas(id);
      },
      error: () => {
        this.erro = 'Não foi possível carregar o anúncio.';
        this.carregando = false;
      }
    });
  }

  private carregarEstatisticas(id: number): void {
    this.http.get<EstatisticasAnuncioDTO>(`${this.apiUrl}/estatisticas/anuncio/${id}`).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.carregando = false;
      },
      error: () => {
        this.stats = {
          anuncioId: id,
          ctr: 0,
          visualizacoesUnicas: 0,
          visualizacoesTotais: 0,
          rankingPosicao: 0
        };
        this.carregando = false;
      }
    });
  }

  getImagemUrl(): string {
    return this.anuncio ? `${this.apiUrl}${this.anuncio.imagemUrl}` : '';
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
