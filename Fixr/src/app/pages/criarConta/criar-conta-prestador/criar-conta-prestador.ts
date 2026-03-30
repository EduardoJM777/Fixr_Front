import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta-prestador',
  imports: [HeaderRec],
  templateUrl: './criar-conta-prestador.html',
  styleUrl: './criar-conta-prestador.css',
})
export class CriarContaPrestador {

  constructor(private router: Router){}

  irCadProfissao(){
    this.router.navigate(['/criarProfissao'])
  }



}
