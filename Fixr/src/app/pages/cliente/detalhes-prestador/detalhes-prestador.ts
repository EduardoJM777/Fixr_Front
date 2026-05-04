import { Component, OnInit } from '@angular/core';
import { EstatisticasPrestadorDTO, PrestadorResponse } from '../../../models/prestadorDTO.model';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat-service';
import { AuthService } from '../../../services/auth-service';
import { HttpClient } from '@angular/common/http';
import { ChatsDTO } from '../../../models/chats.models';
import { CommonModule } from '@angular/common';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';

@Component({
  selector: 'app-detalhes-prestador',
  standalone: true,
  imports: [CommonModule, HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './detalhes-prestador.html',
  styleUrl: './detalhes-prestador.css',
})
export class DetalhesPrestador implements OnInit {

  prestador!: PrestadorResponse;
  stats!: EstatisticasPrestadorDTO;
  carregando = true;
  chamando = false;
  chamadaRecusada = false;

  private baseUrl = 'http://localhost:8080/prestador';

  constructor(
    private router: Router,
    private http: HttpClient,
    private chatService: ChatService,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { prestador: PrestadorResponse };
    if (state?.prestador) {
      this.prestador = state.prestador;
    }
  }

  ngOnInit(): void {
     if (this.prestador) {
      this.carregarEstatisticas();
    } else {
      this.router.navigate(['/buscarPrestador']);
    }
  }

  carregarEstatisticas(): void {
    this.http.get<EstatisticasPrestadorDTO>(`${this.baseUrl}/${this.prestador.id}/stats`)
      .subscribe({
        next: (dados) => {
          this.stats = dados;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
        }
      });
  }

  chamar(): void {
    const usuario = this.authService.getUsuario();
    if (!usuario) return;

    this.chamando = true;

    const dto: ChatsDTO = {
      idCliente: usuario.id,
      idPrestador: this.prestador.id,
      chamadorId: usuario.id,
      chamadorNome: usuario.nome,
      papelChamador: 'CLIENTE',
      destinatarioId: this.prestador.id,
      destinatarioNome: this.prestador.nome,
    };

    this.chatService.iniciarChamada(dto);

    const sub = this.chatService.respostas$.subscribe(res => {
      this.chamando = false;
      if (res.aceito) {
        this.router.navigate(['/chatVazio'], {
          state: { chatId: res.chatId }
        });
      } else {
        this.chamadaRecusada = true;
        setTimeout(() => this.chamadaRecusada = false, 4000);
      }
      sub.unsubscribe();
    });
  }

}
