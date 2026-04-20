import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";

export interface Prestador {
  nome: string;
  foto: string;
  profissoes: string[];
  avaliacoes: number;
  trabalhos: number;
  tempoApp: string;
  experiencia: string;
  ranking: string;
  precoMedio: string;
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [NgFor, NgIf, SubHeaderPrestador, HeadrFixrPrestador],
  templateUrl: './estatisticas-prestador.html',
  styleUrls: ['./estatisticas-prestador.css'],
})
export class EstatisticasPrestador {
  profissoesAberto = false;

  prestador: Prestador = {
    nome: 'Marcelo',
    foto: 'https://randomuser.me/api/portraits/men/75.jpg',
    profissoes: ['Eletricista', 'Instalador'],
    avaliacoes: 10,
    trabalhos: 14,
    tempoApp: '2 meses',
    experiencia: '14 anos',
    ranking: '20º',
    precoMedio: 'R$220',
  };

  toggleProfissoes(): void {
    this.profissoesAberto = !this.profissoesAberto;
  }

  editarPerfil(): void {
    alert('Abrir tela de edição de perfil');
  }
}