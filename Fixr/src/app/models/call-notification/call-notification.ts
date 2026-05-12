import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { CallNotification } from '../chats.models';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-call-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-notification.html',
  styleUrl: './call-notification.css'
})

export class CallNotificationComponent implements OnInit, OnDestroy {

  chamadaPendente: CallNotification | null = null;
  private sub!: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.chatService.chamadas$.subscribe(chamada => {
      // console.log('chamada recebida no componente:', chamada);
      this.chamadaPendente = chamada;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  aceitar(): void {
    if (!this.chamadaPendente) return;
    const chatId = this.chamadaPendente.chatId;
    this.chatService.responderChamada(chatId, true);
    this.chatService.iniciarChatNaSidebar(chatId);
    this.chamadaPendente = null;
}

  recusar(): void {
    if (!this.chamadaPendente) return;
    this.chatService.responderChamada(this.chamadaPendente.chatId, false);
    this.chamadaPendente = null;
  }
}