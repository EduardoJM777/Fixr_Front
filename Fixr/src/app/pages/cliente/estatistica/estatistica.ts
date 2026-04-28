import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";
import { ClienteDTO } from '../../../models/clienteDTO.model';
import { Subject, takeUntil } from 'rxjs';


export interface EstatisticasDTO {
  avaliacoesRecebidas: number;
  anunciosPublicados: number;
  tempoNoApp: string;
  rankingPosicao: number;
  precoMedio: number;
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule, SubHeaderCliente, HeaderFixrCliente],
  templateUrl: './estatistica.html',
  styleUrls: ['./estatistica.css']
})

export class EstatisticasClienteComponent implements OnInit, OnDestroy {

  cliente: (ClienteDTO & { id: number }) | null = null;
  stats: EstatisticasDTO | null = null;
  carregando = true;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

   ngOnInit(): void {
    const dados = sessionStorage.getItem('usuario');

    if (!dados) {
      this.router.navigate(['/']);
      return;
    }

    this.cliente = JSON.parse(dados)

    if (this.cliente?.id) {
      this.http.get<EstatisticasDTO>(`http://localhost:8080/cliente/${this.cliente.id}/stats`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (stats) => {
            this.stats = stats;
            this.carregando = false;
          },
          error: () => {
            this.stats = {
              avaliacoesRecebidas: 0,
              anunciosPublicados: 0,
              tempoNoApp: '-',
              rankingPosicao: 0,
              precoMedio: 0
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

  irParaPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  editarPerfil(): void {
    this.router.navigate(['/editar-perfil']);
  }
}