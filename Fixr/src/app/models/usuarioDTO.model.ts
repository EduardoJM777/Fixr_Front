import { Profissao } from "./profissao.model";

export interface UsuarioDTO {
    nome: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    profissao: Profissao;
}