import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router){}

  termoBusca = '';

  favoritos: Favorito[] = [];

  favoritosFiltrados: Favorito[] = [];

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
     this.http.get<Favorito[]>(`http://localhost:8080/favoritos?usuarioId=${usuario.id}`)
      .subscribe({
        next: (dados) => {
          this.favoritos = dados;
          this.favoritosFiltrados = [...dados];
        },
        error: () => alert('Erro ao carregar favoritos.')
      });
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    this.favoritosFiltrados = termo
      ? this.favoritos.filter((f) => f.nome.toLowerCase().includes(termo))
      : [...this.favoritos];
  }

  desfavoritar(fav: Favorito): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    this.http.delete(`http://localhost:8080/favoritos/${fav.id}?usuarioId=${usuario.id}`)
      .subscribe({
        next: () => {
          this.favoritos = this.favoritos.filter(f => f.id !== fav.id);
          this.filtrar();
        },
        error: () => alert('Erro ao desfavoritar.')
      });
  }

  avaliar(fav: Favorito): void {
    this.router.navigate(['/avaliar', fav.id]);
  }
}