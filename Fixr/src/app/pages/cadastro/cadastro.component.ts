import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private authService: AuthService, 
              private router: Router, 
              private chatService: ChatService,
              ){}

  email = '';
  senha = '';
  erro = '';
  carregando = false;

  
  login(): void{
    this.erro = '';
    this.carregando = true;

    this.authService.login({ email: this.email, senha: this.senha})
    .subscribe({
      next: (usuario) => {
        this.authService.salvarUsuario(usuario);
        this.chatService.conectar();

        if (usuario.tipo === 'CLIENTE') {
          this.router.navigate(['/chatVazio']);
        } else {
          this.router.navigate(['/chatVazioPrestador'])
        }
      },
      error: (err) => {
        this.carregando = false;
        if (err.status === 403) {
          this.erro = 'Sua conta está inativa. Entre em contato com o suporte.';
        } else {
          this.erro = 'Email ou senha inválidos.';
          
        }
      }
    });
  }
  
  irCadCliente(){
    this.router.navigate(['/criarContaCliente']);
  }

  irCadPrestador(){
    this.router.navigate(['/criarContaPrestador']);
  }

  irRecSenha(){
    this.router.navigate(['/recuperarSenha']);
  }

}
