import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HeaderRec } from './components/header-rec/header-rec';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecuSenhaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Fixr');
}
