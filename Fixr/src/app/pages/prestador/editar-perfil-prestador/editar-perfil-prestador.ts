import { Component, OnInit } from '@angular/core';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestadorDTO, PrestadorResponse } from '../../../models/prestadorDTO.model';
import { Router } from '@angular/router';
import { PrestadorService } from '../../../services/prestador-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-editar-perfil-prestador',
  standalone: true,
  imports: [SubHeaderPrestador, HeadrFixrPrestador, CommonModule, FormsModule],
  templateUrl: './editar-perfil-prestador.html',
  styleUrl: './editar-perfil-prestador.css',
})
export class EditarPerfilPrestador implements OnInit {

  prestador: PrestadorResponse | null = null;
  prestadorDTO: PrestadorDTO | null = null;
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

  constructor(
    private router: Router,
    private prestadorService: PrestadorService,
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

    this.prestadorService.getPerfil(usuario.id).subscribe({
      next: (data) => {
        this.prestador = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = `Não foi possível carregar o perfil. (${err.status || err.message})`;
        this.loading = false;
      }
    });

    this.prestadorService.getPerfilDTO(usuario.id).subscribe({
      next: (data) => {
        this.prestadorDTO = data;
        this.preencherCampos(data);
      }
    });

  }

  private preencherCampos(data: PrestadorDTO): void {
    const partes = data.nome?.split(' ') ?? [];
    this.editNome = partes[0] ?? '';
    this.editSobrenome = partes.length > 1 ? partes.slice(1).join(' ') : '';
    this.editTelefone = data.telefone ?? '';
    this.editEmail = data.email ?? '';
  }

  salvar(): void {
    if (!this.prestador || !this.prestadorDTO) return;

    const usuario = this.authService.getUsuario()!;
    const nomeCompleto = [this.editNome, this.editSobrenome].filter(Boolean).join(' ');

    const payload: PrestadorDTO = {
      nome: nomeCompleto,
      email: this.editEmail,
      telefone: this.editTelefone,
      dataNascimento: this.prestadorDTO.dataNascimento, // mantém o existente se o backend suportar
      profissaoId: this.prestador.profissao?.id
    };

    this.salvando = true;

    this.prestadorService.atualizar(usuario.id, payload).subscribe({
      next: (atualizado) => {
        this.prestador = atualizado;

        if (this.prestadorDTO) {
          this.prestadorDTO = {
            ...this.prestadorDTO,
            nome: atualizado.nome,
            email: this.editEmail,
            telefone: this.editTelefone,
          };
        }

        this.salvando = false;

        const usuarioAtual = this.authService.getUsuario()!;
        sessionStorage.setItem('usuario', JSON.stringify({ ...usuarioAtual, nome: atualizado.nome }));

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
    if (this.prestador?.foto) return this.prestador.foto;
    return '';
  }

  showToast(msg: string): void {
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2800);
  }

}
