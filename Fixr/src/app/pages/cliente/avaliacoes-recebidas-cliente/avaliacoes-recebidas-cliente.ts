import { Component } from '@angular/core';
import { AvaliacoesDTO } from '../../../models/avaliacoesDTO.model';
import { AvaliacaoService } from '../../../services/avaliacao-service';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-avaliacoes-recebidas-cliente',
  imports: [CommonModule, FormsModule, RouterModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './avaliacoes-recebidas-cliente.html',
  styleUrl: './avaliacoes-recebidas-cliente.css',
})
export class AvaliacoesRecebidasCliente {

  avaliacoes: AvaliacoesDTO[] = [];
  carregando = true;
  erro: string | null = null;
 
  constructor(
    private avaliacoesService: AvaliacaoService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.carregarAvaliacoes();
  }
 
  carregarAvaliacoes(): void {
    const usuario = this.authService.getUsuario();
 
    if (!usuario?.id) {
      this.erro = 'Usuário não autenticado.';
      this.carregando = false;
      return;
    }
 
    this.avaliacoesService.listarPorCliente(usuario.id).subscribe({
      next: (dados) => {
        this.avaliacoes = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar avaliações:', err);
        this.erro = 'Não foi possível carregar as avaliações.';
        this.carregando = false;
      }
    });
  }
 
  gerarEstrelas(nota: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < nota);
  }
 
  get mediaAvaliacoes(): string {
    if (!this.avaliacoes.length) return '0.0';
    const soma = this.avaliacoes.reduce((acc, a) => acc + a.nota, 0);
    return (soma / this.avaliacoes.length).toFixed(1);
  }

}