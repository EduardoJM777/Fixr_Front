import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequestDTO } from '../models/anuncioRequestDTO.model';
import { Observable } from 'rxjs';
import { AnuncioResponseDTO } from '../models/anuncioResponseDTO.model';
import { Profissao } from '../models/profissao.model';

@Injectable({
  providedIn: 'root',
})

export class AnuncioService {

  private baseUrl = "http://localhost:8080/anuncio";
  private profissaoUrl = "http://localhost:8080/profissao";

  constructor(private http: HttpClient) {}

  cadastrar(dados: AnuncioRequestDTO, imagem: File): Observable<AnuncioResponseDTO>{
    const formData = new FormData();

    formData.append('dados', new Blob([JSON.stringify(dados)], {
      type: 'application/json'
    }));

    formData.append('imagem', imagem);

    return this.http.post<AnuncioResponseDTO>(this.baseUrl, formData);
  }

  getProfissoes(): Observable<Profissao[]> {
    return this.http.get<Profissao[]>(this.profissaoUrl);
  }

}