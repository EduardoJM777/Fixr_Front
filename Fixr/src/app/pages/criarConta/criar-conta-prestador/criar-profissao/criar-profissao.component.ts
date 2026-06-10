import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfissaoService } from '../../../../services/profissao-service';

@Component({
  selector: 'app-criar-profissao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-profissao.component.html',
  styleUrl: './criar-profissao.component.css'
})
export class CriarProfissaoComponent {

  constructor(private router: Router, private profissaoService: ProfissaoService){}

  nomeProf: string = "";
  descricao: string = "";
  profissoes: any[] = [];

  ngOnInit(): void{
    this.profissaoService.findAll()
      .subscribe(res => this.profissoes = res);
  }

  cadastrar(): void{

    if(!this.nomeProf || !this.descricao){
      alert("Preencha todos os campos");
      return;
    }

    this.profissaoService.cadastrar(this.nomeProf, this.descricao)
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