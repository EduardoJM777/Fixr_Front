import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';

@Component({
  selector: 'app-fechar-acordo',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderFixrCliente, SubHeaderCliente, HeadrFixrPrestador, SubHeaderPrestador ],
  templateUrl: './fechar-acordo.html',
  styleUrls: ['./fechar-acordo.css']
})
export class FecharAcordo implements OnInit, OnDestroy {

  chatId!: number;
  outroNome!: string;
  outroFoto?: string;
  meuNome!: string;
  minhaFoto?: string;
  papel!: 'CLIENTE' | 'PRESTADOR';

  acordoId: number | null = null;
  meuValor: number | null = null;
  valorOutro: number | null = null;
  enviado = false;
  aceito = false;
  cancelado = false;
  modal: 'confirmar_envio' | 'confirmar_aceite' | null = null;
  valorAceite: number | null = null;

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const state = history.state as {
      chatId: number;
      outroNome: string;
      outroFoto?: string;
      papel: 'CLIENTE' | 'PRESTADOR';
    };

    if (!state?.chatId) {
      this.voltar();
      return;
    }

    this.chatId = state.chatId;
    this.outroNome = state.outroNome;
    this.outroFoto = state.outroFoto;
    this.papel = state.papel;

    const usuario = this.authService.getUsuario();
    this.meuNome = usuario?.nome || '';

    // ouve eventos de acordo em tempo real
    this.subs.push(
      this.chatService.acordos$.subscribe(evento => {
        this.processarEvento(evento);
      })
    );

    // verifica se já existe acordo ativo para este chat
    this.chatService.buscarAcordoAtivo(this.chatId).subscribe({
      next: (acordo: any) => {
        if (acordo?.id) {
          this.acordoId = acordo.id;
          this.valorOutro = acordo.valor;
        }
      },
      error: () => {}
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  processarEvento(evento: any): void {
    switch (evento.tipo) {
      case 'PROPOSTA_ENVIADA':
        this.acordoId = evento.acordoId;
        this.enviado = true;
        break;
      case 'NOVA_PROPOSTA':
        this.acordoId = evento.acordoId;
        this.valorOutro = evento.valor;
        break;
      case 'CONTRAPROPOSTA':
        this.valorOutro = evento.valor;
        break;
      case 'ACORDO_ACEITO':
        this.aceito = true;
        setTimeout(() => this.voltar(), 2500);
        break;
      case 'ACORDO_CANCELADO':
        this.cancelado = true;
        setTimeout(() => this.voltar(), 2000);
        break;
    }
  }

  abrirModalEnvio(): void {
    if (!this.meuValor || this.meuValor <= 0) return;
    this.modal = 'confirmar_envio';
  }

  abrirModalAceite(): void {
    this.valorAceite = this.valorOutro;
    this.modal = 'confirmar_aceite';
  }

  confirmarEnvio(): void {
    this.modal = null;
    if (this.acordoId) {
      this.chatService.enviarContraproposta(this.acordoId, this.meuValor!);
    } else {
      this.chatService.iniciarAcordo(this.chatId, this.meuValor!, this.papel);
    }
    this.enviado = true;
  }

  confirmarAceite(): void {
    this.modal = null;
    if (this.acordoId) {
      this.chatService.aceitarAcordo(this.acordoId);
    }
  }

  cancelar(): void {
    if (this.acordoId) {
      this.chatService.cancelarAcordo(this.acordoId);
    } else {
      this.voltar();
    }
  }

  fecharModal(): void {
    this.modal = null;
  }

  voltar(): void {
    const rota = this.papel === 'CLIENTE' ? '/chatVazio' : '/chatVazioPrestador';
    this.router.navigate([rota]);
  }

  getFotoUrl(foto?: string): string {
    if (!foto) return '';
    if (foto.startsWith('http')) return foto;
    return `http://localhost:8080${foto}`;
  }
}