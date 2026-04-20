import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private authService: AuthService, private router: Router){}

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

        if (usuario.tipo === 'CLIENTE') {
          this.router.navigate(['/chatVazio']);
        } else {
          this.router.navigate(['/']) //inserir aqui rota do prestador depois
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

  // irChatVazio(){
  //   this.router.navigate(['/chatVazio']);
  // }
  
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
