import { Profissao } from "./profissao.model";

export interface PrestadorDTO {
    nome: string;
    dataNascimento: string;
    email: string;
    profissaoId: number;
    telefone: string;
}

export interface PrestadorResponse {
  id: number;
  nome: string;
  profissao: Profissao;
  nota: number;
  foto?: string;
}

export interface EstatisticasPrestadorDTO {
  avaliacoesRecebidas: number;
  trabalhosRealizados: number;
  tempoNoApp: string;
  rankingPosicao: number;
  precoMedio: number;
  experienciaTrabalho: string | null;
}