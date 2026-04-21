import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfissaoService {

  private baseUrl = "http://localhost:8080/profissao";

  constructor(private http: HttpClient){}

  cadastrar(nome: string, descricao: string): Observable<any> {
    return this.http.post(this.baseUrl, { nome, descricao });
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }


}