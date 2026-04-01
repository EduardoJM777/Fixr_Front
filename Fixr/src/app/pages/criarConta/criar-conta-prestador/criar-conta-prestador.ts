import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { PrestadorDTO } from '../../../models/prestadorDTO.model';
import { Profissao } from '../../../models/enums/profissao.enum';

@Component({
  selector: 'app-criar-conta-prestador',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-conta-prestador.html',
  styleUrl: './criar-conta-prestador.css',
})

export class CriarContaPrestador {

  novoPrestador: PrestadorDTO = {nome: '', email: '', profissao: null};

  constructor(private router: Router){}

  profissoes = Object.values(Profissao);
  

  irCadProfissao(){
    this.router.navigate(['/criarProfissao'])
  }

}
