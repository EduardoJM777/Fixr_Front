import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HeadrFixrPrestador } from '../../../components/headr-fixr-prestador/headr-fixr-prestador';
import { SubHeaderPrestador } from '../../../components/sub-header-prestador/sub-header-prestador';

interface ClienteInfo {
  id: number;
  nome: string;
  foto?: string;
}

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeadrFixrPrestador, SubHeaderPrestador],
  templateUrl: './avaliacao.html',
  styleUrls: ['./avaliacao.css']
})
export class AvaliacaoPrestador implements OnInit {

  cliente: ClienteInfo | null = null;
  notaSelecionada: number = 0;
  notaHover: number = 0;
  comentario: string = '';
  sugestaoMelhoria: string = '';
  enviando: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const state = history.state as {
      clienteId?: number;
      clienteNome?: string;
      clienteFoto?: string;
    };

    if (state?.clienteId) {
      this.cliente = {
        id: state.clienteId,
        nome: state.clienteNome || '',
        foto: state.clienteFoto
      };
    } else {
      const clienteId = this.route.snapshot.paramMap.get('id');
      if (clienteId) {
        this.http.get<any>(`http://localhost:8080/cliente/${clienteId}`)
          .subscribe({
            next: (c) => {
              this.cliente = { id: c.id, nome: c.nome, foto: c.foto };
            },
            error: () => this.router.navigate(['/chatPrestador'])
          });
      }
    }
  }

  estrelas(): number[] {
    return [1, 2, 3, 4, 5];
  }

  setNota(nota: number): void {
    this.notaSelecionada = nota;
  }

  setHover(nota: number): void {
    this.notaHover = nota;
  }

  clearHover(): void {
    this.notaHover = 0;
  }

  estrellaAtiva(index: number): boolean {
    return index <= (this.notaHover || this.notaSelecionada);
  }

  pular(): void {
    this.router.navigate(['/chatVazioPrestador']);
  }

  enviar(): void {
    if (this.enviando) return;

    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario?.id || !this.cliente?.id) return;

    this.enviando = true;

    const body = {
      nota: this.notaSelecionada || null,
      comentario: this.comentario || null,
      sugest_melhoria: this.sugestaoMelhoria || null,
      idCliente: this.cliente.id,       // ← cliente sendo avaliado
      idPrestador: usuario.id           // ← prestador logado que avalia
    };

  this.http.post('http://localhost:8080/avaliacoes', body).subscribe({
  next: (res) => {
    // console.log('SUCCESS:', res);
    this.enviando = false;
    alert('Avaliação enviada com sucesso! Obrigado pelo seu feedback.');
    this.router.navigate(['/chatVazioPrestador']);
  },
  error: (err) => {
    // console.log('ERROR status:', err.status);
    // console.log('ERROR body:', err.error);

    if (err.error?.id || err.status === 200 || err.status === 201) {
      this.enviando = false;
      this.router.navigate(['/chatVazioPrestador']);
      return;
    }
    this.enviando = false;
    alert('Erro ao enviar avaliação.');
  }
});
  }

  getFotoUrl(): string {
    if (!this.cliente?.foto) return '';
    if (this.cliente.foto.startsWith('http')) return this.cliente.foto;
    return `http://localhost:8080${this.cliente.foto}`;
  }
}