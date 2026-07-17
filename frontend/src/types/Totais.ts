export interface TotalPessoa {
    id: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface TotalDeral {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface TotaisResponse{
    pessoas: TotalPessoa[];
    totalGeral: TotalDeral;
}

