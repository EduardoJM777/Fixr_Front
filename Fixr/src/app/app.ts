import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HeaderRec } from './components/header-rec/header-rec';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { ChatVazioComponent } from "./pages/chat-vazio/chat-vazio.component";
import { CriarContaPrestador } from './pages/criarConta/criar-conta-prestador/criar-conta-prestador';
import { CriarProfissaoComponent } from "./pages/criarConta/criar-conta-prestador/criar-profissao/criar-profissao.component";
import { RecuSenhaOk } from "./pages/recu-senha/recu-senha-ok/recu-senha-ok";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CadastroComponent, ChatVazioComponent, ChatVazioComponent, CriarContaClienteComponent, CriarContaPrestador, RecuSenhaComponent, CriarProfissaoComponent, RecuSenhaOk, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Fixr');
}
