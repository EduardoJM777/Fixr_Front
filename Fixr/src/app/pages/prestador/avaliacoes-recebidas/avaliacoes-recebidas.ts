import { Component } from '@angular/core';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';

@Component({
  selector: 'app-avaliacoes-recebidas',
  standalone: true,
  imports: [HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './avaliacoes-recebidas.html',
  styleUrl: './avaliacoes-recebidas.css',
})
export class AvaliacoesRecebidas {

}
