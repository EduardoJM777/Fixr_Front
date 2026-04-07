import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { PrestadorDTO } from '../../../models/prestadorDTO.model';
import { Profissao } from '../../../models/enums/profissao.enum';
import { PrestadorService } from '../../../services/prestador-service';

@Component({
  selector: 'app-criar-conta-prestador',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-conta-prestador.html',
  styleUrl: './criar-conta-prestador.css',
})

export class CriarContaPrestador {

  novoPrestador: PrestadorDTO = {nome: '', email: '', profissao: null};

  constructor(private router: Router, private prestadorService: PrestadorService){}

  profissoes = Object.values(Profissao);

  cadastrarPrestador(){
    this.prestadorService.salvar({...this.novoPrestador})
      .subscribe({
        next: () => {
          alert('Prestador Cadastrado');
          this.novoPrestador = {nome: '', email: '', profissao: null};
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastar');
        }
      })
  }

  irCadProfissao(){
    this.router.navigate(['/criarProfissao'])
  }

}
