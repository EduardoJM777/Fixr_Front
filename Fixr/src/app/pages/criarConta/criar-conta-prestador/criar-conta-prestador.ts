import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar-conta-prestador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-conta-prestador.html',
  styleUrl: './criar-conta-prestador.css',
})

export class CriarContaPrestador {

  constructor(private http: HttpClient, private router: Router){}

  nome = "";
  dataNascimento = "";
  email = "";
  senha = "";
  confSenha = "";
  telefone = "";
  readonly OUTRO = -1;
  profissaoId: string = "";
  profissoes: any[] = [];

  
  ngOnInit(){
    this.http.get<any[]>("http://localhost:8080/profissao")
      .subscribe(res => {
        this.profissoes = res;
      });
  }

  
  onProfissaoChange(){
    if(Number(this.profissaoId) === this.OUTRO){
      this.router.navigate(['/criarProfissao']);
    }
  }

  
  cadastrar() {
  if (!this.validar()) return;

  const dados = {
    nome: this.nome,
    dataNascimento: this.dataNascimento,
    email: this.email,
    senha: this.senha,
    telefone: this.telefone,
    profissaoId: Number(this.profissaoId)
  };

  this.http.post("http://localhost:8080/prestador", dados)
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
  if (!this.profissaoId || Number(this.profissaoId) === this.OUTRO) {
  alert("Selecione uma profissão válida.");
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
