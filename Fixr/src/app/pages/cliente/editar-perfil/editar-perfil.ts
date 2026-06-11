import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { ClienteService } from '../../../services/cliente-service';
import { ClienteDTO } from '../../../models/clienteDTO.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [SubHeaderCliente, HeaderFixrCliente, CommonModule, FormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css',
})
export class EditarPerfil implements OnInit {

  cliente: ClienteDTO | null = null;
  loading = true;
  salvando = false;
  erro = '';

  editNome: string = '';
  editSobrenome: string = '';
  editTelefone: string = '';
  editEmail: string = '';

  fotoPreview: string | null = null;
  fotoArquivo: File | null = null;

  toastMsg = '';
  toastVisible = false;
  private toastTimer: any;

  mostrarConfirmacaoExclusao = false;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLogado()) {
      this.router.navigate(['/cadastro']);
      return;
    }
    this.carregarPerfil();
  }

  carregarPerfil(): void {
    this.loading = true;
    this.erro = '';

    const usuario = this.authService.getUsuario()!;

    this.clienteService.getPerfil(usuario.id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.preencherCampos(data);
        this.loading = false;
      },
      error: (err) => {
        this.erro = `Não foi possível carregar o perfil. (${err.status || err.message})`;
        this.loading = false;
      }
    });
  }

  private preencherCampos(data: ClienteDTO): void {
    const partes = data.nome?.split(' ') ?? [];
    this.editNome = partes[0] ?? '';
    this.editSobrenome = partes.length > 1 ? partes.slice(1).join(' ') : '';
    this.editTelefone = data.telefone ?? '';
    this.editEmail = data.email ?? '';
  }

  salvar(): void {
    if (!this.cliente) return;

    const usuario = this.authService.getUsuario()!;
    const nomeCompleto = [this.editNome, this.editSobrenome].filter(Boolean).join(' ');

    const payload: ClienteDTO = {
      id: usuario.id,
      nome: nomeCompleto,
      email: this.editEmail,
      telefone: this.editTelefone,
      dataNascimento: this.cliente.dataNascimento
    };

    this.salvando = true;

    this.clienteService.atualizar(usuario.id, payload).subscribe({
      next: (atualizado) => {
        this.cliente = atualizado;
        this.preencherCampos(atualizado);

        if (this.fotoArquivo) {
                this.clienteService.atualizarFoto(usuario.id, this.fotoArquivo).subscribe({
                    next: () => {
                        this.fotoArquivo = null;
                         this.clienteService.getPerfil(usuario.id).subscribe({
                next: (clienteAtualizado) => {
                    this.cliente = clienteAtualizado;
                    const usuarioAtual = this.authService.getUsuario()!;
                    sessionStorage.setItem('usuario', JSON.stringify({
                        ...usuarioAtual,
                        foto: clienteAtualizado.foto
                    }));
                }
            });
        },
        error: (err) => console.error('Erro ao salvar foto:', err)
    });
            }

        this.salvando = false;

        const usuarioAtual = this.authService.getUsuario()!;
        const usuarioAtualizado = { ...usuarioAtual, nome: atualizado.nome };
        sessionStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

        this.showToast('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        this.salvando = false;
        this.showToast(`Erro ao salvar. (${err.status || err.message})`);
      }
    });
  }

  onFotoSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.fotoArquivo = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.fotoPreview = e.target?.result as string;
    };
    reader.readAsDataURL(this.fotoArquivo);
  }

  get fotoSrc(): string {
    if (this.fotoPreview) return this.fotoPreview;
    if (this.cliente?.foto) return 'http://localhost:8080' + this.cliente.foto;
    return '';
  }

  get inicial(): string {
    return this.editNome?.charAt(0)?.toUpperCase() ?? '?';
  }

  showToast(msg: string): void {
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2800);
  }

  confirmarExclusao(): void {
  this.mostrarConfirmacaoExclusao = true;
}

cancelarExclusao(): void {
  this.mostrarConfirmacaoExclusao = false;
}

excluirConta(): void {
  const usuario = this.authService.getUsuario()!;
  this.clienteService.deletar(usuario.id).subscribe({
    next: () => {
      sessionStorage.removeItem('usuario');
      this.router.navigate(['/cadastro']);
    },
    error: () => this.showToast('Erro ao excluir conta.')
  });
}
}