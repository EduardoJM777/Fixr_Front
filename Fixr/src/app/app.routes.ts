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
import { FecharAcordo } from './pages/acordo/fechar-acordo/fechar-acordo';
import { AvaliacaoPrestador } from './pages/prestador/avaliacao/avaliacao';
import { AvaliacoesRecebidasCliente } from './pages/cliente/avaliacoes-recebidas-cliente/avaliacoes-recebidas-cliente';
import { AnunciosPublicados } from './pages/cliente/anuncios-publicados/anuncios-publicados';
import { EstatisticasAnuncio } from './pages/cliente/estatisticas-anuncio/estatisticas-anuncio';
import { EdicaoAnuncio } from './pages/cliente/edicao-anuncio/edicao-anuncio';
import { ConfirmarEmailComponent } from './components/confirmar-email/confirmar-email';
import { ClienteGuard } from './guards/cliente.guard';
import { PrestadorGuard } from './guards/prestador.guard';

export const routes: Routes = [
    {path: 'cadastro', component: CadastroComponent},
    {path: 'recuperarSenha', component: RecuSenhaComponent},
    {path: 'criarContaCliente', component: CriarContaClienteComponent},
    {path: 'criarContaPrestador', component: CriarContaPrestador},
    {path: 'criarProfissao', component: CriarProfissaoComponent},
    {path: 'confirmar-email', component: ConfirmarEmailComponent},

    {path: 'chatVazio', component: ChatVazioComponent, canActivate: [ClienteGuard]},
    {path: 'criarAnuncio', component: AnunciarProblemaComponent, canActivate: [ClienteGuard]},
    {path: 'buscarPrestador', component: BuscarPrestadorComponent, canActivate: [ClienteGuard]},
    {path: 'detalhesPrestador', component: DetalhesPrestador, canActivate: [ClienteGuard]},
    {path: 'estatistica', component: EstatisticasClienteComponent, canActivate: [ClienteGuard]},
    {path: 'favoritos', component: FavoritosComponent, canActivate: [ClienteGuard]},
    {path: 'editarPerfil', component: EditarPerfil, canActivate: [ClienteGuard]},
    {path: 'avaliacao', component: Avaliacao, canActivate: [ClienteGuard]},
    {path: 'avaliacoesRecebidasCliente', component: AvaliacoesRecebidasCliente, canActivate: [ClienteGuard]},
    {path: 'anunciosPublicados', component: AnunciosPublicados, canActivate: [ClienteGuard]},
    {path: 'estatisticasAnuncio/:id', component: EstatisticasAnuncio, canActivate: [ClienteGuard]},
    {path: 'edicaoAnuncio/:id', component: EdicaoAnuncio, canActivate: [ClienteGuard]},

    {path: 'chatVazioPrestador', component: ChatVazioPrestadorComponent, canActivate: [PrestadorGuard]},
    {path: 'buscarAnuncio', component: BuscarAnuncioComponent, canActivate: [PrestadorGuard]},
    {path: 'favoritosPrestador', component: FavoritosPrestador, canActivate: [PrestadorGuard]},
    {path: 'estatisticaPrestador', component: EstatisticasPrestador, canActivate: [PrestadorGuard]},
    {path: 'editarPerfilPrestador', component: EditarPerfilPrestador, canActivate: [PrestadorGuard]},
    {path: 'avaliacaoPrestador', component: AvaliacaoPrestador, canActivate: [PrestadorGuard]},
    {path: 'avaliacoesRecebidasPrestador', component: AvaliacoesRecebidas, canActivate: [PrestadorGuard]},
    {path: 'fecharAcordo', component: FecharAcordo, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'cadastro', pathMatch: 'full'}
];
