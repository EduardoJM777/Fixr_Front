import { Component } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderSolid } from '../../../components/sub-header-solid/sub-header-solid';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PrestadorInfo {
  id: number;
  nome: string;
  foto?: string;
  trabalhosRealizados?: number;
}

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderSolid],
  templateUrl: './avaliacao.html',
  styleUrl: './avaliacao.css',
})

export class Avaliacao {

  prestador: PrestadorInfo | null = null;
  notaSelecionada: number = 0;
  notaHover: number = 0;
  comentario: string = '';
  sugestaoMelhoria: string = '';
  enviando: boolean = false;

  // Dados combinados (opcionais)
  valorCombinado?: string;
  dataCombinada?: string;
  horarioCombinado?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const state = history.state as {
      prestadorId?: number;
      prestadorNome?: string;
      prestadorFoto?: string;
      valorCombinado?: string;
      dataCombinada?: string;
      horarioCombinado?: string;
    };

    // console.log('state recebido:', state);

    if (state?.prestadorId) {
      this.prestador = {
        id: state.prestadorId,
        nome: state.prestadorNome || '',
        foto: state.prestadorFoto,
      };
      this.valorCombinado = state.valorCombinado;
      this.dataCombinada = state.dataCombinada;
      this.horarioCombinado = state.horarioCombinado;
    } else {
      // fallback: tenta pegar da rota
      const prestadorId = this.route.snapshot.paramMap.get('id');
      if (prestadorId) {
        this.http.get<any>(`http://localhost:8080/prestador/${prestadorId}`)
          .subscribe({
            next: (p) => {
              this.prestador = {
                id: p.id,
                nome: p.nome,
                foto: p.foto,
              };
            },
            error: () => this.router.navigate(['/chat'])
          });
      }
    }
  }

  estrelas(): number[] {
    return [1, 2, 3, 4, 5];
  }

  setNota(nota: number): void {
    this.notaSelecionada = nota;
  }

  setHover(nota: number): void {
    this.notaHover = nota;
  }

  clearHover(): void {
    this.notaHover = 0;
  }

  estrelaAtiva(index: number): boolean {
    const ref = this.notaHover || this.notaSelecionada;
    return index <= ref;
  }

  pular(): void {
    this.router.navigate(['/chatVazio']);
  }

  enviar(): void {
    if (this.enviando) return;

    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario?.id || !this.prestador?.id) return;

    this.enviando = true;

    const body = {
      nota: this.notaSelecionada || null,
      comentario: this.comentario || null,
      sugest_melhoria: this.sugestaoMelhoria || null,
      idCliente: usuario.id,
      idPrestador: this.prestador.id
    };

    this.http.post('http://localhost:8080/avaliacoes', body).subscribe({
      next: () => {
        this.enviando = false;
        alert('Avaliação enviada com sucesso! Obrigado pelo seu feedback.');
        this.router.navigate(['/chatVazio']);
      },
      error: () => {
        this.enviando = false;
        alert('Erro ao enviar avaliação.');
      }
    });
  }

  getFotoUrl(): string {
    if (!this.prestador?.foto) return '';
    if (this.prestador.foto.startsWith('http')) return this.prestador.foto;
    return `http://localhost:8080${this.prestador.foto}`;
  }

}
