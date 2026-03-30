import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HeaderRec } from './components/header-rec/header-rec';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { ChatVazioComponent } from "./pages/chat-vazio/chat-vazio.component";
import { CriarContaPrestador } from './pages/criarConta/criar-conta-prestador/criar-conta-prestador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Fixr');
}
