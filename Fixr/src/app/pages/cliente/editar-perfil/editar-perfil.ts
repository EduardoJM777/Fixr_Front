import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubHeaderCliente } from '../../../components/sub-header-cliente/sub-header-cliente';
import { HeaderFixrCliente } from '../../../components/header-fixr-cliente/header-fixr-cliente';
import { ClienteService } from '../../../services/cliente-service';
import { ClienteDTO } from '../../../models/clienteDTO.model';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [SubHeaderCliente, HeaderFixrCliente, CommonModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css',
})
export class EditarPerfil implements OnInit {

  cliente: ClienteDTO | null = null;
  loading = true;
  erro = '';

  fotoPreview: string | null = null;
  fotoArquivo: File | null = null;

  toastMsg = '';
  toastVisible = false;
  private toastTimer: any;

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.carregarPerfil();
  }

  carregarPerfil(): void {
    this.loading = true;
    this.erro = '';

    this.clienteService.getPerfil().subscribe({
      next: (data) => {
        this.cliente = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = `Não foi possível carregar o perfil. (${err.status || err.message})`;
        this.loading = false;
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

  salvar(): void {
    if (this.fotoArquivo) {
      // Quando o backend suportar upload de foto, chamar o método aqui
      this.showToast('Perfil salvo com sucesso!');
    } else {
      this.showToast('Nenhuma alteração para salvar.');
    }
  }

  /** URL da foto: preview local → foto do backend → vazio (CSS mostra inicial) */
  get fotoSrc(): string {
    if (this.fotoPreview) return this.fotoPreview;
    if (this.cliente?.foto) return this.cliente.foto;
    return '';
  }

  /** "Suzana Moreira" → "Suzana" */
  get primeiroNome(): string {
    return this.cliente?.nome?.split(' ')[0] ?? '—';
  }

  /** "Suzana Moreira" → "Moreira" */
  get sobrenome(): string {
    const partes = this.cliente?.nome?.split(' ') ?? [];
    return partes.length > 1 ? partes.slice(1).join(' ') : '—';
  }

  showToast(msg: string): void {
    this.toastMsg = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2800);
  }
}