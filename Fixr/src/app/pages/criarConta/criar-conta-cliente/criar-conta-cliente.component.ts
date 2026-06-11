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

  cadastrar() {
  if (!this.validar()) return;

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
        alert("Cadastro realizado! Verifique seu email para confirmar sua conta.");
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert("Este email já está cadastrado.");
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
      }
    });
}

validar(): boolean {
  if (!this.nome.trim()) {
    alert("Nome é obrigatório.");
    return false;
  }

  if (this.senha.length < 8) {
    alert("A senha deve ter no mínimo 8 caracteres.");
    return false;
  }

  if (this.senha !== this.confSenha) {
    alert("Senhas não conferem.");
    return false;
  }

  if (!this.dataNascimento) {
    alert("Data de nascimento é obrigatória.");
    return false;
  }

  const hoje = new Date();
  const nasc = new Date(this.dataNascimento);
  const idade = hoje.getFullYear() - nasc.getFullYear();
  const aniversarioPassou =
    hoje.getMonth() > nasc.getMonth() ||
    (hoje.getMonth() === nasc.getMonth() && hoje.getDate() >= nasc.getDate());
  const idadeReal = aniversarioPassou ? idade : idade - 1;

  if (idadeReal < 18) {
    alert("Você deve ter no mínimo 18 anos.");
    return false;
  }

  if (idadeReal > 100) {
    alert("Data de nascimento inválida.");
    return false;
  }

  return true;
}
}