import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-header-prestador',
  standalone: true,
  imports: [],
  templateUrl: './sub-header-prestador.html',
  styleUrl: './sub-header-prestador.css',
})
export class SubHeaderPrestador {

  constructor(private http: HttpClient, private router: Router){}

  irBuscarAnuncio(){
    this.router.navigate(['/buscarAnuncio'])
  }
  irEstatisticasPrestador(){
    this.router.navigate(['/estatisticaPrestador'])
  }
  irFavoritosPrestador(){
    this.router.navigate(['/favoritosPrestador'])
  }
  
}
