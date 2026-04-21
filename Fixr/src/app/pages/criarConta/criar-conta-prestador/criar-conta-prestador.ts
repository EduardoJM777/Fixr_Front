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
        console.log(res);
      });
  }

  
  onProfissaoChange(){
    if(Number(this.profissaoId) === this.OUTRO){
      this.router.navigate(['/criarProfissao']);
    }
  }

  
  cadastrar(){

    if(this.senha !== this.confSenha){
      alert("Senhas não conferem");
      return;
    }

    const idProfissao = Number(this.profissaoId)

    if (!this.profissaoId || idProfissao === this.OUTRO || isNaN(idProfissao)) {
      alert('Selecione uma profissão válida');
      return;
    }

    const dados = {
      nome: this.nome,
      dataNascimento: this.dataNascimento || null,
      email: this.email,
      senha: this.senha,
      profissaoId: idProfissao,
      telefone: this.telefone || null
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
