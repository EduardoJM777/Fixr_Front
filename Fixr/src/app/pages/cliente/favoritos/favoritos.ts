import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";

interface PrestadorFavorito {
  id: number;
  nome: string;
  profissao: string;
  ativo: boolean;
  foto?: string;
  tempoFavorito?: string; 
}

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, SubHeaderCliente, HeaderFixrCliente],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.css']
})
export class FavoritosComponent implements OnInit {

  prestadores: PrestadorFavorito[] = [];
  prestadoresFiltrados: PrestadorFavorito[] = [];
  profissoes: string[] = [];

  termoBusca: string = '';
  profissaoSelecionada: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    // Ajuste o endpoint conforme sua API
    this.http.get<PrestadorFavorito[]>(`http://localhost:8080/favorito/cliente/${usuario.id}`)
      .subscribe({
        next: (dados) => {
          this.prestadores = dados;
          this.prestadoresFiltrados = dados;
          this.profissoes = [...new Set(dados.map(p => p.profissao))];
        },
        error: () => alert('Erro ao carregar favoritos.')
      });
  }

  filtrar(): void {
    this.prestadoresFiltrados = this.prestadores.filter(p => {
      const nomeOk = p.nome.toLowerCase().includes(this.termoBusca.toLowerCase());
      const profissaoOk = !this.profissaoSelecionada || p.profissao === this.profissaoSelecionada;
      return nomeOk && profissaoOk;
    });
  }

  avaliar(prestador: PrestadorFavorito): void {
    this.router.navigate(['/avaliar', prestador.id]);
  }
}