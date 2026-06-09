import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat-service';
import { AuthService } from './services/auth-service';
import { CallNotificationComponent } from './models/call-notification/call-notification';
import { AcordoNotificacao } from "./pages/acordo/acordo-notificacao/acordo-notificacao";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CallNotificationComponent, AcordoNotificacao],
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

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario?.id) return;

    navigator.sendBeacon(
      `http://localhost:8080/auth/logout/${usuario.id}?tipo=${usuario.tipo}`
    );
  }

}