import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import type { TotaisResponse } from "../types/Totais";

interface Props {
  atualizar: number;
}

export function Totais({ atualizar }: Props) {
  const [dados, setDados] = useState<TotaisResponse | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTotais() {
      try {
        setErro("");

        const resposta = await apiGet<TotaisResponse>("/Totais");
        setDados(resposta);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro ao carregar os totais.");
        }
      }
    }

    carregarTotais();
  }, [atualizar]);

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (erro) {
    return (
      <section className="secao">
        <h2>Totais</h2>
        <p className="mensagem-erro">{erro}</p>
      </section>
    );
  }

  if (!dados) {
    return (
      <section className="secao">
        <h2>Totais</h2>
        <p>Carregando...</p>
      </section>
    );
  }

  return (
    <section className="secao">
      <h2>Totais por pessoa</h2>

      {dados.pessoas.length === 0 ? (
        <p className="mensagem-vazia">Nenhum total disponível.</p>
      ) : (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>

            <tbody>
              {dados.pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.nome}</td>

                  <td className="valor-receita">
                    {formatarValor(pessoa.totalReceitas)}
                  </td>

                  <td className="valor-despesa">
                    {formatarValor(pessoa.totalDespesas)}
                  </td>

                  <td
                    className={
                      pessoa.saldo >= 0
                        ? "valor-receita"
                        : "valor-despesa"
                    }
                  >
                    {formatarValor(pessoa.saldo)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="linha-total-geral">
                <td>
                  <strong>Total geral</strong>
                </td>

                <td className="valor-receita">
                  <strong>
                    {formatarValor(dados.totalGeral.totalReceitas)}
                  </strong>
                </td>

                <td className="valor-despesa">
                  <strong>
                    {formatarValor(dados.totalGeral.totalDespesas)}
                  </strong>
                </td>

                <td
                  className={
                    dados.totalGeral.saldo >= 0
                      ? "valor-receita"
                      : "valor-despesa"
                  }
                >
                  <strong>{formatarValor(dados.totalGeral.saldo)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
}