// anunciar-problema.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderFixrCliente } from "../../../components/header-fixr-cliente/header-fixr-cliente";
import { SubHeaderCliente } from "../../../components/sub-header-cliente/sub-header-cliente";
import { HttpClient } from '@angular/common/http';
import { AnuncioService } from '../../../services/anuncio-service';

@Component({
  selector: 'app-anunciar-problema',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './criar-anuncio.html',
  styleUrls: ['./criar-anuncio.css']
})

export class AnunciarProblemaComponent {

  descricao: string = '';
  profissaoId: number | null = null;
  profissoes: any[] = [];
  
  imagemSelecionada: File | null = null;
  previewUrl: string | null = null;

  constructor(private anuncioService: AnuncioService) {}

  ngOnInit(): void {
    this.anuncioService.getProfissoes().subscribe({
        next: (data) => this.profissoes = data,
        error: (err) => console.error('Erro ao carregar profissões', err)
      });
  }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagemSelecionada = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.imagemSelecionada);
    }
  }

  removerImagem(): void {
    this.imagemSelecionada = null;
    this.previewUrl = null;
  }

  publicar(): void {
    if (!this.descricao || !this.profissaoId || !this.imagemSelecionada) return;
    
    const dados = {
      descricao: this.descricao,
      profissaoId: this.profissaoId,
      clienteId: 1
    };

    this.anuncioService.cadastrar(dados, this.imagemSelecionada).subscribe({
        next: (response) => { alert('Anúncio publicado!');
        this.descricao = '';
        this.profissaoId = null;
        this.imagemSelecionada = null;
        this.previewUrl = null;
      },
        error: (err) => alert('Erro ao publicar')
      });
  }
  
}