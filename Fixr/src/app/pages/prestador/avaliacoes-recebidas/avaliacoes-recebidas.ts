import { Component, OnInit } from '@angular/core';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';
import { AvaliacoesDTO } from '../../../models/avaliacoesDTO.model';
import { AvaliacaoService } from '../../../services/avaliacao-service';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaliacoes-recebidas',
  standalone: true,
  imports: [CommonModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './avaliacoes-recebidas.html',
  styleUrl: './avaliacoes-recebidas.css',
})

export class AvaliacoesRecebidas implements OnInit {

  avaliacoes: AvaliacoesDTO[] = [];
  carregando = true;
  erro: string | null = null;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private authService: AuthService
  ) { }

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

    this.avaliacaoService.listarPorPrestador(usuario.id).subscribe({
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
