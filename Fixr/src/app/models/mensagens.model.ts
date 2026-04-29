export interface Mensagens {
    id?: number;
    texto: string;
    enviadoEm?: string;
    tipo: 'CHAT' | 'JOIN' | 'LEAVE' | 'CALL_REQUEST' | 'CALL_ACCEPTED' | 'CALL_REJECTED';
    papelRemetente: 'CLIENTE' | 'PRESTADOR';
    remetente?: { id: number; nome: string; };
    chat?: { id: number; };
}

export interface MensagensDTO {
    texto: string;
    idChat: number;
    chatId: number;
    remetenteId: number;
    remetenteNome: string;
    papelRemetente: 'CLIENTE' | 'PRESTADOR';
    tipo: 'CHAT' | 'JOIN' | 'LEAVE' | 'CALL_REQUEST' | 'CALL_ACCEPTED' | 'CALL_REJECTED';
}