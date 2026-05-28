import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaliacoesDTO } from '../models/avaliacoesDTO.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {

  private apiUrl = 'http://localhost:8080/avaliacoes';

  constructor(private http: HttpClient) { }

  listar(): Observable<AvaliacoesDTO[]> {
    return this.http.get<AvaliacoesDTO[]>(`${this.apiUrl}/listar`);
  }

  buscarPorId(id: number): Observable<AvaliacoesDTO> {
    return this.http.get<AvaliacoesDTO>(`${this.apiUrl}/${id}`);
  }

  listarPorPrestador(idPrestador: number): Observable<AvaliacoesDTO[]> {
    return this.http.get<AvaliacoesDTO[]>(`${this.apiUrl}/prestador/${idPrestador}`);
  }

}
