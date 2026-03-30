import { StatusAcordo } from "./enums/statusAcordo.enum";

export interface AcordosDTO {
    data_servico: string;
    valor: number;
    valor2: number;
    statusAcordo: StatusAcordo;
    idChats: number;
}