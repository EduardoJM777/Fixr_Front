// anunciar-problema.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anunciar-problema',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './criar-anuncio.html',
  styleUrls: ['./criar-anuncio.css']
})

export class AnunciarProblemaComponent {

  descricao: string = '';
  profissoes: any[] = [];
  profissaoId: string = '';
  imagemUrl: string | null = null;

  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/profissao')
      .subscribe({
        next: (dados) => this.profissoes = dados,
        error: () => alert('Erro ao carregar profissões.')
      });
  }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => this.imagemUrl = reader.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  publicar(): void {
    if (!this.descricao || !this.profissaoId) {
      alert('Preencha todos os campos antes de publicar.');
      return;
    }

    const body = {
      descricao: this.descricao,
      profissaoId: this.profissaoId,
      imagem: this.imagemUrl
    };

    this.http.post('http://localhost:8080/anuncio', body)
      .subscribe({
        next: () => alert('Problema publicado com sucesso!'),
        error: (err) => alert('Erro ao publicar: ' + err.message)
      });

  }
  
}