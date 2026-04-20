import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './sub-header-cliente.html',
  styleUrl: './sub-header-cliente.css',
})
export class SubHeaderCliente {

  constructor(private http: HttpClient, private router: Router){}

   irAnuncio(){
    this.router.navigate(['/criarAnuncio'])
  }
  irBuscarPrestador(){
    this.router.navigate(['/buscarPrestador'])
  }
  irEstatistica(){
    this.router.navigate(['estatistica'])
  }
  irFavoritos(){
    this.router.navigate(['favoritos'])
  }

}
