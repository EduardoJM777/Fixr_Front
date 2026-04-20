import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeadrFixrPrestador } from "../../components/headr-fixr-prestador/headr-fixr-prestador";
import { SubHeaderPrestador } from "../../components/sub-header-prestador/sub-header-prestador";




@Component({
  selector: 'app-chat-vazio-prestador',
  imports: [HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './chat-vazio-prestador.html',
  styleUrl: './chat-vazio-prestador.css'
})
export class ChatVazioPrestadorComponent {


}
