import { Profissao } from "./enums/profissao.enum";

export interface UsuarioDTO {
    nome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    profissao: Profissao;
}