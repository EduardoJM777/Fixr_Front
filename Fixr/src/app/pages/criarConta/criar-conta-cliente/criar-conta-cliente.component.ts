import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-criar-conta-cliente',
  imports: [FormsModule, HttpClient],
  templateUrl: './criar-conta-cliente.component.html',
  styleUrl: './criar-conta-cliente.component.css'
})
export class CriarContaClienteComponent {

 email: string="";
 senha: string="";
 confSenha: string="";
 telefone: string="";
 

}
