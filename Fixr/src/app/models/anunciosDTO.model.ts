import { Profissao } from "./enums/profissao.enum";

export interface AnunciosDTO {
    titulo: string;
    descricao: string;
    profissao: Profissao;
    idCliente: number;
}