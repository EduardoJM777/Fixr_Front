import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-profissao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-profissao.component.html',
  styleUrl: './criar-profissao.component.css'
})
export class CriarProfissaoComponent {

  constructor(private router: Router, private http: HttpClient){}

  nomeProf: string = "";
  descricao: string = "";

  profissaoSemelhanteId: number | null = null;
  profissoes: any[] = [];

  ngOnInit(){
    this.http.get<any[]>("http://localhost:8080/profissao")
      .subscribe(res => {
        this.profissoes = res;
      });
  }

  
  cadastrar(){

    if(!this.nomeProf || !this.descricao){
      alert("Preencha todos os campos");
      return;
    }

    const dados = {
      nome: this.nomeProf,
      desc: this.descricao,
      profissaoPaiId: this.profissaoSemelhanteId
    };

    this.http.post("http://localhost:8080/profissao", dados)
      .subscribe({
        next: () => {
          alert("Profissão cadastrada!");

          this.router.navigate(['/criarContaPrestador']);
        },
        error: (err) => {
          console.log(err);
          alert("Erro ao cadastrar profissão");
        }
      });
  }
}