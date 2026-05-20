import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrestadorDTO, PrestadorResponse } from '../models/prestadorDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PrestadorService {

  private baseUrl = "http://localhost:8080/prestador";

  constructor(private http: HttpClient) { }

  salvar(prestadorDTO: PrestadorDTO): Observable<PrestadorDTO> {
    return this.http.post<PrestadorDTO>(this.baseUrl, prestadorDTO);
  }

  getPerfil(id: number): Observable<PrestadorResponse> {
    return this.http.get<PrestadorResponse>(`${this.baseUrl}/${id}`);
  }

  getPerfilDTO(id: number): Observable<PrestadorDTO> {
    return this.http.get<PrestadorDTO>(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, prestadorDTO: PrestadorDTO): Observable<PrestadorResponse> {
    return this.http.put<PrestadorResponse>(`${this.baseUrl}/${id}`, prestadorDTO);
  }

}
