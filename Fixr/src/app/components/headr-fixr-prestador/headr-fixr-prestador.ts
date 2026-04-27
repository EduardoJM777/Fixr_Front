import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headr-fixr-prestador',
  standalone: true,
  imports: [],
  templateUrl: './headr-fixr-prestador.html',
  styleUrl: './headr-fixr-prestador.css',
})
export class HeadrFixrPrestador {
  constructor(private router: Router){}

  irCadastro(){
    this.router.navigate(['/'])
  }

  irChatVazio(){
    this.router.navigate(['/chatVazioPrestador'])
  }

}
