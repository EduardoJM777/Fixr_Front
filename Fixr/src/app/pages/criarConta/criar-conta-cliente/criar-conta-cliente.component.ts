import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-conta-cliente.component.html',
  styleUrl: './criar-conta-cliente.component.css'
})
export class CriarContaClienteComponent {

  constructor(private http: HttpClient, private router: Router){}

  nome = "";
  dataNascimento = "";
  email = "";
  senha = "";
  confSenha = "";
  telefone = "";

  cadastrar(){

    // 🔒 validação básica
    if(this.senha !== this.confSenha){
      alert("Senhas não conferem");
      return;
    }

    const dados = {
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone
    };

    this.http.post("http://localhost:8080/cliente", dados)
      .subscribe({
        next: () => {
          alert("Cadastro realizado!");
          this.router.navigate(['/']); // volta pro login
        },
        error: (err) => {
          console.log(err);
          alert("Erro ao cadastrar");
        }
      });
  }
}