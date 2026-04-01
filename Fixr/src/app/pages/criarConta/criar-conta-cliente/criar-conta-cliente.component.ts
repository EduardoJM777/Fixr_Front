import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteDTO } from '../../../models/clienteDTO.model';
import { ClienteService } from '../../../services/cliente-service';

@Component({
  selector: 'app-criar-conta-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-conta-cliente.component.html',
  styleUrl: './criar-conta-cliente.component.css'
})
export class CriarContaClienteComponent {

  novoCliente: ClienteDTO = {nome: '', email: ''};

  constructor(private clienteService: ClienteService){}

  cadastrarCliente(){
    this.clienteService.salvar({...this.novoCliente})
      .subscribe({
        next: () => {
          alert('Cliente Cadastrado!');
          this.novoCliente = {nome: '', email: ''};
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar');
        }
      });
  }


}
