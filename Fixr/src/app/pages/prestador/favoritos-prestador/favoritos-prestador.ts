import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";

export interface ClienteFavorito {
  id: number;
  nome: string;
  foto?: string;
  online?: boolean;
  dataCadastro?: string;
  email?: string;
  tempo?: string;
}

@Component({
  selector: 'app-favoritos-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './favoritos-prestador.html',
  styleUrls: ['./favoritos-prestador.css'],
})
export class FavoritosPrestador implements OnInit {

  constructor(private http: HttpClient, private router: Router){}

  termoBusca = '';

  favoritos: ClienteFavorito[] = [];
  favoritosFiltrados: ClienteFavorito[] = [];

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    this.http.get<ClienteFavorito[]>(`http://localhost:8080/favorito?usuarioId=${usuario.id}`)
      .subscribe({
        next: (dados) => {
    const dadosFiltrados = (dados || []).filter(f => f != null && f.nome);
    this.favoritos = dadosFiltrados;
    this.favoritosFiltrados = dadosFiltrados;
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
  this.router.navigate(['/avaliacaoPrestador'], {
    state: {
      clienteId: fav.id,
      clienteNome: fav.nome,
      clienteFoto: fav.foto
    }
  });
}
}
