import { Component, OnInit } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { AnuncioResponseDTO } from '../../../models/anuncioResponseDTO.model';
import { Profissao } from '../../../models/profissao.model';
import { StatusAnuncio } from '../../../models/enums/statusAnuncio.enum';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edicao-anuncio',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './edicao-anuncio.html',
  styleUrl: './edicao-anuncio.css',
})

export class EdicaoAnuncio implements OnInit {

  anuncio: AnuncioResponseDTO | null = null;
  profissoes: Profissao[] = [];

  descricao = '';
  profissaoSelecionadaId: number | null = null;
  statusSelecionado: StatusAnuncio | null = null;

  statusOpcoes = Object.values(StatusAnuncio);

  carregando = true;
  salvando = false;
  erro: string | null = null;

  private apiUrl = 'http://localhost:8080';
  private anuncioId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.anuncioId = Number(this.route.snapshot.params['id']);
    if (!this.anuncioId) {
      this.erro = 'Anúncio não encontrado.';
      this.carregando = false;
      return;
    }
    this.carregarDados();
  }

  private carregarDados(): void {
    this.http.get<AnuncioResponseDTO>(`${this.apiUrl}/anuncio/${this.anuncioId}`).subscribe({
      next: (anuncio) => {
        this.anuncio = anuncio;
        this.descricao = anuncio.descricao;
        this.profissaoSelecionadaId = anuncio.profissaoId;
        this.statusSelecionado = anuncio.statusAnuncio;
        this.carregarProfissoes();
      },
      error: () => {
        this.erro = 'Não foi possível carregar o anúncio.';
        this.carregando = false;
      }
    });
  }

  private carregarProfissoes(): void {
    this.http.get<Profissao[]>(`${this.apiUrl}/profissao`).subscribe({
      next: (profissoes) => {
        this.profissoes = profissoes;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as profissões.';
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

  atualizar(): void {
    if (this.salvando || !this.anuncioId || !this.anuncio) return;

    if (!this.descricao.trim()) {
      alert('A descrição não pode estar vazia.');
      return;
    }

    if (!this.profissaoSelecionadaId) {
      alert('Selecione um profissional necessário.');
      return;
    }

    this.salvando = true;

    const body = {
      descricao: this.descricao,
      profissaoId: this.profissaoSelecionadaId,
      clienteId: this.anuncio.clienteId,
      statusAnuncio: this.statusSelecionado
    };

    this.http.put<AnuncioResponseDTO>(`${this.apiUrl}/anuncio/${this.anuncioId}`, body).subscribe({
      next: () => {
        this.salvando = false;
        alert('Anúncio atualizado com sucesso!');
        this.router.navigate(['/meus-anuncios']);
      },
      error: () => {
        this.salvando = false;
        alert('Erro ao atualizar o anúncio.');
      }
    });
  }

}
