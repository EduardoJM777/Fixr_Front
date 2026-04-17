import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Profissao {

  private baseUrl = "http://localhost:8080/prestador";
  
    constructor(private http: HttpClient) {}

  

}
