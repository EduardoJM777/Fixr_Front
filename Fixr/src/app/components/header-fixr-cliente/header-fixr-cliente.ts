import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-fixr-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-fixr-cliente.html',
  styleUrl: './header-fixr-cliente.css',
})
export class HeaderFixrCliente {
  constructor(private router: Router){}

  irChat(){
    this.router.navigate(['/chatVazio'])
  }
  irCadastro(){
    this.router.navigate(['/'])
  }

}
