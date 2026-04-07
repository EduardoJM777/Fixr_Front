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
  email = "";
  senha = "";
  confSenha = "";
  telefone = "";

  profissaoId: any = "";
  profissoes: any[] = [];

  // 🔥 CARREGA PROFISSÕES
  ngOnInit(){
    this.http.get<any[]>("http://localhost:8080/profissao")
      .subscribe(res => {
        this.profissoes = res;
      });
  }

  // 🔥 REGRA DO "OUTROS"
  onProfissaoChange(){
    if(this.profissaoId === 'outro'){
      this.router.navigate(['/criarProfissao']);
    }
  }

  // 🔥 CADASTRO
  cadastrar(){

    if(this.senha !== this.confSenha){
      alert("Senhas não conferem");
      return;
    }

    if(this.profissaoId === 'outro'){
      alert("Selecione uma profissão válida");
      return;
    }

    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      profissaoId: this.profissaoId
    };

    this.http.post("http://localhost:8080/prestador", dados)
      .subscribe({
        next: () => {
          alert("Prestador cadastrado!");
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          alert("Erro ao cadastrar");
        }
      });
      
  }

}