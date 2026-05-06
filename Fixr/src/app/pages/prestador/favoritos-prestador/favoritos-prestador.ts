import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface ClienteFavorito {
  id: number;
  nome: string;
  foto?: string;
  online: boolean;
  tempo?: string;
}

@Component({
  selector: 'app-favoritos-prestador',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './favoritos-prestador.html',
  styleUrls: ['./favoritos-prestador.css'],
})
export class FavoritosPrestador implements OnInit {

  constructor(private http: HttpClient, private router: Router){}

  termoBusca = '';

  favoritos: ClienteFavorito[] = [];
  favoritosFiltrados: ClienteFavorito[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    this.http.get<ClienteFavorito[]>(`http://localhost:8080/favorito/prestador/${usuario.id}`)
      .subscribe({
        next: (dados) => {
          this.favoritos = dados;
          this.favoritosFiltrados = dados;
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

  avaliar(fav: ClienteFavorito): void {
    this.router.navigate(['/avaliar-cliente', fav.id]);
  }
}