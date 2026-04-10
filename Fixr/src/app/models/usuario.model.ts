import { Profissao } from "./enums/profissao.enum";

export interface Usuario {
    nome: string;
    dataNascimento: string;
    email: string;
    profissao: Profissao;
}