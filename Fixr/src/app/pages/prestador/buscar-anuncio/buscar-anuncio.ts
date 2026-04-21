import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubHeaderPrestador } from "../../../components/sub-header-prestador/sub-header-prestador";
import { HeadrFixrPrestador } from "../../../components/headr-fixr-prestador/headr-fixr-prestador";

interface Anuncio {
  id: number;
  descricao: string;
  nomeCliente: string;
  profissao: string;
  imagem?: string;
  distancia?: string;
}

@Component({
  selector: 'app-buscar-anuncio',
  standalone: true,
  imports: [CommonModule, FormsModule, SubHeaderPrestador, HeadrFixrPrestador],
  templateUrl: './buscar-anuncio.html',
  styleUrls: ['./buscar-anuncio.css']
})
export class BuscarAnuncioComponent implements OnInit {

  anuncios: Anuncio[] = [];
  anunciosFiltrados: Anuncio[] = [];
  profissoes: string[] = [];
  profissaoSelecionada: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Anuncio[]>('http://localhost:8080/anuncio')
      .subscribe({
        next: (dados) => {
          this.anuncios = dados;
          this.anunciosFiltrados = dados;
          this.profissoes = [...new Set(dados.map(a => a.profissao))];
        },
        error: () => alert('Erro ao carregar anúncios.')
      });
  }

  filtrar(): void {
    this.anunciosFiltrados = this.anuncios.filter(a =>
      !this.profissaoSelecionada || a.profissao === this.profissaoSelecionada
    );
  }

  chamar(anuncio: Anuncio): void {
    this.router.navigate(['/avaliacao', anuncio.id]);
  }
}