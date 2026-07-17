export const TipoTransacao = {
  Receita: 1,
  Despesa: 2,
} as const;

export type TipoTransacao =
  (typeof TipoTransacao)[keyof typeof TipoTransacao];

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}