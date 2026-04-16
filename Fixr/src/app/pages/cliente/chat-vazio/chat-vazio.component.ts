import { Component } from '@angular/core';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';

@Component({
  selector: 'app-chat-vazio',
  imports: [HeaderFixrCliente, SubHeaderCliente],
  templateUrl: './chat-vazio.component.html',
  styleUrl: './chat-vazio.component.css'
})
export class ChatVazioComponent {

}
