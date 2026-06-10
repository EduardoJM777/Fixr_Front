export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    id: number;
    nome: string;
    email: string;
    tipo: string;
}