import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { EstatisticasPrestadorDTO, PrestadorResponse } from '../../../models/prestadorDTO.model';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [SubHeaderPrestador, HeadrFixrPrestador, FormsModule, CommonModule],
  templateUrl: './estatisticas-prestador.html',
  styleUrls: ['./estatisticas-prestador.css'],
})

export class EstatisticasPrestador implements OnInit, OnDestroy{
  
  prestador: PrestadorResponse | null = null;
  stats: EstatisticasPrestadorDTO | null = null;
  carregando = true;
  profissoesAberto = false;

  editandoExperiencia = false;
  experienciaTemp = '';

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    const dados = sessionStorage.getItem('usuario');

    if (!dados) {
      this.router.navigate(['/']);
      return;
    }

    this.prestador = JSON.parse(dados);

    if (this.prestador?.id) {

      this.http.get<PrestadorResponse>(`http://localhost:8080/prestador/${this.prestador.id}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (prestadorCompleto) => {
            this.prestador = prestadorCompleto;
          },
          error: () => console.error('Erro ao buscar dados do prestador')
        });

      this.http.get<EstatisticasPrestadorDTO>(`http://localhost:8080/prestador/${this.prestador.id}/stats`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (stats) => {
            this.stats = stats;
            this.experienciaTemp = stats.experienciaTrabalho ?? '';
            this.carregando = false;
          },
          error: () => {
            this.stats = {
              avaliacoesRecebidas: 0,
              trabalhosRealizados: 0,
              tempoNoApp: '-',
              rankingPosicao: 0,
              precoMedio: 0,
              experienciaTrabalho: null
            };
            this.carregando = false;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleProfissoes(): void {
    this.profissoesAberto = !this.profissoesAberto;
  }

  iniciarEdicaoExperiencia(): void {
    this.experienciaTemp = this.stats?.experienciaTrabalho ?? '';
    this.editandoExperiencia = true;
  }

  salvarExperiencia(): void {
    if (!this.prestador?.id) {
      return;
    }


    this.http.patch(`http://localhost:8080/prestador/${this.prestador.id}/stats/experiencia`, {
      experienciaTrabalho: this.experienciaTemp})
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        if (this.stats) this.stats.experienciaTrabalho = this.experienciaTemp;
        this.editandoExperiencia = false;
      },
      error: (err) => {
        console.error('Erro completo:', err);
      }
    });
  }

  cancelarEdicao(): void {
    this.editandoExperiencia = false;
  }

  irParaPerfil(): void {
    this.router.navigate(['/perfil-prestador']);
  }

  editarPerfil(): void {
    this.router.navigate(['/editar-perfil-prestador']);
  }

}