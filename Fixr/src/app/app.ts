import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat-service';
import { AuthService } from './services/auth-service';
import { CallNotificationComponent } from './models/call-notification/call-notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CallNotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  protected readonly title = signal('Fixr');

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogado()) {
      this.chatService.conectar();
    }
  }

  ngOnDestroy(): void {
    this.chatService.desconectar();
  }
}