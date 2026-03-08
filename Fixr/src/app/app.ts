import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HeaderRec } from './components/header-rec/header-rec';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { HeaderFixrVazio } from './components/header-fixr-vazio/header-fixr-vazio';
import { TelaNotificacao } from './pages/outras/tela-notificacao/tela-notificacao';
import { SubHeaderSolid } from './components/sub-header-solid/sub-header-solid';
import { HeaderFixrCliente } from './components/header-fixr-cliente/header-fixr-cliente';
import { SubHeaderCliente } from './components/sub-header-cliente/sub-header-cliente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SubHeaderCliente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Fixr');
}
