import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";

interface Usuario {
  id: number;
  nome: string;
  foto?: string;
}

interface Stats {
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
export class EstatisticasClienteComponent implements OnInit {

  usuario: Usuario | null = null;
  stats: Stats | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Pega o usuário logado do sessionStorage
    const dados = sessionStorage.getItem('usuario');
    if (dados) {
      this.usuario = JSON.parse(dados);
    }

    // Busca as estatísticas do cliente no backend
    // Ajuste o endpoint conforme sua API
    if (this.usuario?.id) {
      this.http.get<Stats>(`http://localhost:8080/cliente/${this.usuario.id}/stats`)
        .subscribe({
          next: (stats) => this.stats = stats,
          error: () => {
            
            this.stats = {
              avaliacoesRecebidas: 0,
              anunciosPublicados: 0,
              tempoNoApp: '-',
              rankingPosicao: 0,
              precoMedio: 0
            };
          }
        });
    }
  }

  irParaPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  editarPerfil(): void {
    this.router.navigate(['/editar-perfil']);
  }
}