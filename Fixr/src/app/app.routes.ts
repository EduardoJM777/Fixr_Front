import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { CriarContaPrestador } from './pages/criarConta/criar-conta-prestador/criar-conta-prestador';
import { CriarProfissaoComponent } from './pages/criarConta/criar-conta-prestador/criar-profissao/criar-profissao.component';
import { ChatVazioComponent } from './pages/cliente/chat-vazio/chat-vazio.component';
import { AnunciarProblemaComponent } from './pages/cliente/criar-anuncio/criar-anuncio';
import { BuscarPrestadorComponent } from './pages/cliente/buscar-prestador/buscar-prestador';
import { EstatisticasClienteComponent } from './pages/cliente/estatistica/estatistica';
import { FavoritosComponent } from './pages/cliente/favoritos/favoritos';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {path: 'cadastro', component: CadastroComponent},
    {path: 'chatVazio', component: ChatVazioComponent, canActivate: [AuthGuard]},
    {path: 'recuperarSenha', component: RecuSenhaComponent},
    {path: 'criarContaCliente', component: CriarContaClienteComponent},
    {path: 'criarContaPrestador', component: CriarContaPrestador},
    {path: 'criarProfissao', component: CriarProfissaoComponent},
    {path: 'criarAnuncio', component: AnunciarProblemaComponent},
    {path: 'buscarPrestador', component: BuscarPrestadorComponent},
    {path: 'estatistica', component: EstatisticasClienteComponent},
    {path: 'favoritos', component: FavoritosComponent},
    {path: '', redirectTo: 'cadastro', pathMatch: 'full'}
    
];
