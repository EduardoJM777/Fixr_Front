import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";



interface Prestador {
  id: number;
  nome: string;
  profissao: string;
  nota: number;
  foto?: string;
}

@Component({
  selector: 'app-buscar-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule, SubHeaderCliente, HeaderFixrCliente],
  templateUrl: './buscar-prestador.html',
  styleUrls: ['./buscar-prestador.css']
})
export class BuscarPrestadorComponent implements OnInit {

  private baseUrl = "http://localhost:8080/prestador";
  

  prestadores: Prestador[] = [];
  prestadoresFiltrados: Prestador[] = [];
  profissoes: string[] = [];

  termoBusca: string = '';
  profissaoSelecionada: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Prestador[]>(this.baseUrl)
      .subscribe({
        next: (dados) => {
          this.prestadores = dados;
          this.prestadoresFiltrados = dados;

          this.profissoes = [...new Set(dados.map(p => p.profissao))];
        },
        error: () => alert('Erro ao carregar prestadores.')
      });
  }

  filtrar(): void {
    this.prestadoresFiltrados = this.prestadores.filter(p => {
      const nomeOk = p.nome.toLowerCase().includes(this.termoBusca.toLowerCase());
      const profissaoOk = !this.profissaoSelecionada || p.profissao === this.profissaoSelecionada;
      return nomeOk && profissaoOk;
    });
  }

  // Retorna array de classes CSS para as 5 estrelas
  getEstrelas(nota: number): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(nota)) return 'estrela-cheia';
      if (i < nota) return 'estrela-metade';
      return 'estrela-vazia';
    });
  }

  verDetalhes(prestador: Prestador): void {
    this.router.navigate(['/prestador', prestador.id]);
  }
}