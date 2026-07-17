import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import {
  TipoTransacao,
  type Transacao,
} from "../types/Transacao";

interface Props {
  atualizar: number;
}

interface TransacaoComPessoa extends Transacao {
  pessoaNome?: string;
}

export function TransacaoList({ atualizar }: Props) {
  const [transacoes, setTransacoes] = useState<TransacaoComPessoa[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTransacoes() {
      try {
        setErro("");

        const dados = await apiGet<TransacaoComPessoa[]>("/Transacoes");

        setTransacoes(dados);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro ao carregar transações.");
        }
      }
    }

    carregarTransacoes();
  }, [atualizar]);

  function mostrarTipo(tipo: number) {
    if (tipo === TipoTransacao.Receita) {
      return "Receita";
    }

    return "Despesa";
  }

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <section>
      <h2>Transações</h2>

      {erro && <p>{erro}</p>}

      {transacoes.length === 0 ? (
        <p>Nenhuma transação cadastrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Pessoa</th>
            </tr>
          </thead>

          <tbody>
            {transacoes.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.descricao}</td>

                <td>{mostrarTipo(transacao.tipo)}</td>

                <td>{formatarValor(transacao.valor)}</td>

                <td>
                  {transacao.pessoaNome ??
                    `Pessoa ${transacao.pessoaId}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}