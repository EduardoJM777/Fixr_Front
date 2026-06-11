import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmar-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="text-align:center; margin-top: 100px; font-family: sans-serif;">
      <div *ngIf="status === 'carregando'">Confirmando seu email...</div>
      <div *ngIf="status === 'sucesso'" style="color: green;">
        <h2>✓ Email confirmado!</h2>
        <p>Sua conta foi ativada. Redirecionando para o login...</p>
      </div>
      <div *ngIf="status === 'erro'" style="color: red;">
        <h2>✗ Link inválido</h2>
        <p>O link pode ter expirado. Tente se cadastrar novamente.</p>
      </div>
    </div>
  `
})
export class ConfirmarEmailComponent implements OnInit {

  status: 'carregando' | 'sucesso' | 'erro' = 'carregando';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status = 'erro';
      return;
    }

    this.http.get(`http://localhost:8080/usuario/confirmar-email?token=${token}`, 
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.status = 'sucesso';
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: () => {
        this.status = 'erro';
      }
    });
  }
}