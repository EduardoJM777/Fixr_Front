import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RecuSenhaComponent } from './pages/recu-senha/recu-senha.component';
import { CriarContaClienteComponent } from './pages/criarConta/criar-conta-cliente/criar-conta-cliente.component';
import { EditarPerfil } from './pages/cliente/editar-perfil/editar-perfil';
import { CriarContaPrestador } from './pages/criarConta/criar-conta-prestador/criar-conta-prestador';
import { CriarProfissaoComponent } from './pages/criarConta/criar-conta-prestador/criar-profissao/criar-profissao.component';
import { ChatVazioComponent } from './pages/cliente/chat-vazio/chat-vazio.component';
import { AnunciarProblemaComponent } from './pages/cliente/criar-anuncio/criar-anuncio';
import { BuscarPrestadorComponent } from './pages/cliente/buscar-prestador/buscar-prestador';
import { EstatisticasClienteComponent } from './pages/cliente/estatistica/estatistica';
import { FavoritosComponent } from './pages/cliente/favoritos/favoritos';
import { BuscarAnuncioComponent } from './pages/prestador/buscar-anuncio/buscar-anuncio';
import { ChatVazioPrestadorComponent } from './pages/prestador/chat-vazio-prestador/chat-vazio-prestador';
import { FavoritosPrestador } from './pages/prestador/favoritos-prestador/favoritos-prestador';
import { EstatisticasPrestador } from './pages/prestador/estatisticas-prestador/estatisticas-prestador';
import { AuthGuard } from './guards/auth.guard';
import { DetalhesPrestador } from './pages/cliente/detalhes-prestador/detalhes-prestador';
import { EditarPerfilPrestador } from './pages/prestador/editar-perfil-prestador/editar-perfil-prestador';
import { Avaliacao } from './pages/cliente/avaliacao/avaliacao';
import { AvaliacoesRecebidas } from './pages/prestador/avaliacoes-recebidas/avaliacoes-recebidas';
import { AvaliacaoPrestador } from './pages/prestador/avaliacao/avaliacao';
import { AvaliacoesRecebidasCliente } from './pages/cliente/avaliacoes-recebidas-cliente/avaliacoes-recebidas-cliente';
import { AnunciosPublicados } from './pages/cliente/anuncios-publicados/anuncios-publicados';
import { EstatisticasAnuncio } from './pages/cliente/estatisticas-anuncio/estatisticas-anuncio';

export const routes: Routes = [

    {path: 'cadastro', component: CadastroComponent},
    {path: 'chatVazio', component: ChatVazioComponent, canActivate: [AuthGuard]},
    {path: 'recuperarSenha', component: RecuSenhaComponent},
    {path: 'criarContaCliente', component: CriarContaClienteComponent},
    {path: 'criarContaPrestador', component: CriarContaPrestador},
    {path: 'criarProfissao', component: CriarProfissaoComponent},
    {path: 'criarAnuncio', component: AnunciarProblemaComponent},
    {path: 'buscarPrestador', component: BuscarPrestadorComponent},
    {path: 'detalhesPrestador', component: DetalhesPrestador, canActivate: [AuthGuard]},
    {path: 'estatistica', component: EstatisticasClienteComponent},
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'buscarAnuncio', component: BuscarAnuncioComponent},
    {path: 'chatVazioPrestador', component: ChatVazioPrestadorComponent, canActivate: [AuthGuard]},
    {path: 'favoritosPrestador', component: FavoritosPrestador},
    {path: 'estatisticaPrestador', component: EstatisticasPrestador},
    {path: 'editarPerfil', component: EditarPerfil},
    {path: 'editarPerfilPrestador', component: EditarPerfilPrestador},
    {path: 'avaliacao', component: Avaliacao},
    {path: 'avaliacoesRecebidasPrestador', component: AvaliacoesRecebidas},
    {path: 'avaliacaoPrestador', component: AvaliacaoPrestador},
    {path: 'avaliacoesRecebidasCliente', component: AvaliacoesRecebidasCliente},
    {path: 'anunciosPublicados', component: AnunciosPublicados},
    {path: 'estatisticasAnuncio/:id', component: EstatisticasAnuncio},
    {path: '', redirectTo: 'cadastro', pathMatch: 'full'}
    
];
