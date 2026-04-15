import { Profissao } from "./enums/profissao.enum";

export interface PrestadorDTO {
    nome: string;
    dataNascimento: string;
    email: string;
    profissao: Profissao | null;
    telefone: string;
}