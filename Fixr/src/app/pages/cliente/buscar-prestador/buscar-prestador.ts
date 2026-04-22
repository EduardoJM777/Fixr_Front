import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";
import { PrestadorDTO } from '../../../models/prestadorDTO.model';
import { Profissao } from '../../../models/profissao.model';
import { AnuncioService } from '../../../services/anuncio-service';
import { PrestadorResponse } from '../../../models/prestadorDTO.model';




@Component({
  selector: 'app-buscar-prestador',
  standalone: true,
  imports: [CommonModule, FormsModule, SubHeaderCliente, HeaderFixrCliente],
  templateUrl: './buscar-prestador.html',
  styleUrls: ['./buscar-prestador.css']
})
export class BuscarPrestadorComponent implements OnInit {

  private baseUrl = "http://localhost:8080/prestador";
  

  prestadores: PrestadorResponse[] = [];
  prestadoresFiltrados: PrestadorResponse[] = [];
  profissoes: Profissao[] = [];

  termoBusca: string = '';
  profissaoSelecionada: number | null = null;

  constructor(private http: HttpClient, private router: Router, 
    private anuncioService: AnuncioService) {}

  ngOnInit(): void {
    this.http.get<PrestadorResponse[]>(this.baseUrl)
      .subscribe({
        next: (dados) => {
          this.prestadores = dados;
          this.prestadoresFiltrados = dados;

          this.profissoes = [...new Map(dados.map(p => [p.profissao.id, p.profissao])).values()];
        },
        error: () => alert('Erro ao carregar prestadores.')
      });
  }

  filtrar(): void {
    this.prestadoresFiltrados = this.prestadores.filter(p => {
      const nomeOk = p.nome.toLowerCase().includes(this.termoBusca.toLowerCase());
      const profissaoOk = !this.profissaoSelecionada || p.profissao.id === this.profissaoSelecionada;
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
}