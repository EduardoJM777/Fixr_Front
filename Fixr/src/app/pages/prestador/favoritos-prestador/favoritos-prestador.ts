import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";

export interface Favorito {
  id: number;
  nome: string;
  foto: string;
  online: boolean;
  tempo?: string;
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './favoritos-prestador.html',
  styleUrls: ['./favoritos-prestador.css'],
})
export class FavoritosPrestador implements OnInit {
  termoBusca = '';

  favoritos: Favorito[] = [
    {
      id: 1,
      nome: 'Cleber',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true,
      tempo: '5h',
    },
    {
      id: 2,
      nome: 'Rômulo',
      foto: 'https://randomuser.me/api/portraits/men/44.jpg',
      online: false,
    },
  ];

  favoritosFiltrados: Favorito[] = [];

  ngOnInit(): void {
    this.favoritosFiltrados = [...this.favoritos];
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    this.favoritosFiltrados = termo
      ? this.favoritos.filter((f) => f.nome.toLowerCase().includes(termo))
      : [...this.favoritos];
  }

  avaliar(fav: Favorito): void {
    alert(`Avaliar prestador: ${fav.nome}`);
  }
}