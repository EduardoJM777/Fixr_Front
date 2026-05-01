export interface Chats {
    id: number;
    dataInicio: string;
    dataEncerramento?: string;
    status: 'PENDENTE' | 'ATIVO' | 'ENCERRADO';
    cliente: { id: number; nome: string; };
    prestador: { id: number; nome: string; };
}


export interface ChatsDTO {
    idPrestador: number;
    idCliente: number;
    
    chamadorId: number;
    chamadorNome: string;
    papelChamador: 'CLIENTE' | 'PRESTADOR';
    destinatarioId: number;
    destinatarioNome: string;
    anuncioId?: number;
    anuncioTitulo?: string;
}


export interface CallNotification {
    chatId: number;
    chamadorId: number;
    chamadorNome: string;
    papelChamador: 'CLIENTE' | 'PRESTADOR';
    anuncioTitulo?: string;
    mensagem: string;
}