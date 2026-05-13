import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from '../models/clienteDTO.model';


@Injectable({
  providedIn: 'root',
})

export class ClienteService {

  private baseUrl = "http://localhost:8080/cliente";

  constructor(private http: HttpClient) {}

  salvar(clienteDTO: ClienteDTO): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(this.baseUrl, clienteDTO)
  }

  getPerfil(): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(this.baseUrl);
  }

}
