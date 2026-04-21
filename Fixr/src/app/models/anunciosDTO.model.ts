import { Profissao } from "./enums/profissao.enum";

export interface AnunciosDTO {
    descricao: string;
    profissaoId: number;
    idCliente: number;
}