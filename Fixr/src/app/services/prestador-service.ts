import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrestadorDTO } from '../models/prestadorDTO.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PrestadorService {

  private baseUrl = "http://localhost:8080/prestador";

  constructor(private http: HttpClient) {}

  salvar(prestadorDTO: PrestadorDTO): Observable<PrestadorDTO> {
    return this.http.post<PrestadorDTO>(this.baseUrl, prestadorDTO)
  }


}
