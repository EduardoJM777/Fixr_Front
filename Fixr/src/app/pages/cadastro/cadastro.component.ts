import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private http: HttpClient, private router: Router){}

  email: string = "";
  senha: string = "";

  login(){
    const dados = {email: this.email, senha: this.senha}
     this.http.post("http://localhost:8080/login", dados)
    .subscribe({
      next: (res) => {
        console.log("Sucesso", res);
      },
      error: (err) => {
        console.log("Erro", err);
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
    this.router.navigate(['/recuperarSenha'])
  }

}
