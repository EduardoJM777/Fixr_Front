import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private http: HttpClient, private router: Router){}

  email: string = "";
  senha: string = "";

  // ✅ LOGIN
  login(){

    const dados = {
      email: this.email,
      senha: this.senha
    };

    this.http.post<boolean>("http://localhost:8080/prestador/login", dados)
      .subscribe({
        next: (res) => {
          if(res){
            alert("Login realizado!");
            this.router.navigate(['/home']);
          } else {
            alert("Email ou senha inválidos");
          }
        },
        error: (err) => {
          console.log(err);
          alert("Erro ao conectar com o servidor");
        }
      });
  }

  // ✅ NAVEGAÇÃO
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