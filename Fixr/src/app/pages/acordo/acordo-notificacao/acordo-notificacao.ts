import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';


@Component({
  selector: 'app-acordo-notificacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acordo-notificacao.html',
  styleUrl: './acordo-notificacao.css'
})
export class AcordoNotificacao implements OnInit, OnDestroy {

  notificacao: { acordoId: number; chatId: number; valor: number; iniciadorNome: string; papel: string } | null = null;
  private sub!: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.chatService.acordos$.subscribe(evento => {
      if (!evento) return;
      if (evento.tipo === 'NOVA_PROPOSTA') {
        this.notificacao = {
          acordoId: evento.acordoId,
          chatId: evento.chatId,
          valor: evento.valor,
          iniciadorNome: evento.iniciadorNome,
          papel: evento.papel
        };

        
        setTimeout(() => this.fechar(), 15000);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  irParaAcordo(): void {
    if (!this.notificacao) return;
    const usuario = this.authService.getUsuario();
    const papel = usuario?.tipo === 'CLIENTE' ? 'CLIENTE' : 'PRESTADOR';
    const rota = papel === 'CLIENTE' ? '/chatVazio' : '/chatVazioPrestador';

    this.router.navigate(['/fecharAcordo'], {
      state: {
        chatId: this.notificacao.chatId,
        outroNome: this.notificacao.iniciadorNome,
        papel: papel
      }
    });
    this.fechar();
  }

  fechar(): void {
    this.notificacao = null;
  }
}