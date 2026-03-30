import { Profissao } from "./enums/profissao.enum";

export interface Usuario {
    nome: string;
    email: string;
    profissao: Profissao;
}