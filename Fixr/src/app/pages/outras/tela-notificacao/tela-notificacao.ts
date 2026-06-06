import { Component } from '@angular/core';
import { HeaderFixrVazio } from '../../../components/header-fixr-vazio/header-fixr-vazio';
import { SubHeaderSolid } from '../../../components/sub-header-solid/sub-header-solid';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-notificacao',
  imports: [RouterModule, HeaderFixrVazio, SubHeaderSolid],
  templateUrl: './tela-notificacao.html',
  styleUrl: './tela-notificacao.css',
})
export class TelaNotificacao {

    div1 = false;
    div2 = false;
    div3 = false;
    div4 = false;

}
