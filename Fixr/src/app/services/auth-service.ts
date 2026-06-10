import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private baseUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient, private router: Router) { }

  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, dto);
  }

  salvarUsuario(usuario: LoginResponse): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): LoginResponse | null {
    const dados = sessionStorage.getItem('usuario');
    return dados ? JSON.parse(dados) : null;
  }

  logout(): void {
    const usuario = this.getUsuario();
    if (usuario) {
      this.http.post(
        `http://localhost:8080/auth/logout/${usuario.id}?tipo=${usuario.tipo}`,
        {}
      ).subscribe();
    }
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  isLogado(): boolean {
    return !!this.getUsuario();
  }

}
