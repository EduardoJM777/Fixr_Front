import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  email: string = "";
  senha: string = "";

  constructor(private http: HttpClient, private router: Router){}

  login(){
    const dados = {email: this.email, senha: this.senha}
     this.http.post("http://localhost:3000/login", dados)
    .subscribe({
      next: (res) => {
        console.log("Sucesso", res);
      },
      error: (err) => {
        console.log("Erro", err);
      }
    });
  }

  irCadCliente(){
    this.router.navigate(['/criarContaCliente']);
  }

  irCadPrestador(){
    this.router.navigate(['/criarContaPrestador']);
  }

  irRecSenha(){
    this.router.navigate(['/recuperarSenha'])
  }

}
