import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { CriarContaPrestador } from './pages/criarConta/criar-conta-prestador/criar-conta-prestador';
import { CriarProfissaoComponent } from './pages/criarConta/criar-conta-prestador/criar-profissao/criar-profissao.component';
import { ChatVazioComponent } from './pages/cliente/chat-vazio/chat-vazio.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {path: 'cadastro', component: CadastroComponent},
    {path: 'chatVazio', component: ChatVazioComponent, canActivate: [AuthGuard]},
    {path: 'recuperarSenha', component: RecuSenhaComponent},
    {path: 'criarContaCliente', component: CriarContaClienteComponent},
    {path: 'criarContaPrestador', component: CriarContaPrestador},
    {path: 'criarProfissao', component: CriarProfissaoComponent},
    {path: '', redirectTo: 'cadastro', pathMatch: 'full'}
    
];
