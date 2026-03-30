import { Profissao } from "./enums/profissao.enum";

export interface PrestadorDTO {
    nome: string;
    email: string;
    profissao: Profissao;
}