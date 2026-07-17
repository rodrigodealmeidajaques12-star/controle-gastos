import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../services/api";
import type { Pessoa } from "../types/Pessoa";

interface Props {
  atualizar: number;
  onPessoaExcluida: () => void;
}

export function PessoaList({
  atualizar,
  onPessoaExcluida,
}: Props) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPessoas() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await apiGet<Pessoa[]>("/Pessoas");

        setPessoas(dados);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro ao carregar as pessoas.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarPessoas();
  }, [atualizar]);

  async function excluirPessoa(id: number) {
    try {
      setErro("");

      await apiDelete(`/Pessoas/${id}`);

      onPessoaExcluida();
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro ao excluir a pessoa.");
      }
    }
  }

  if (carregando) {
    return (
      <section className="secao">
        <h2>Pessoas cadastradas</h2>
        <p>Carregando...</p>
      </section>
    );
  }

  return (
    <section className="secao">
      <h2>Pessoas cadastradas</h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {pessoas.length === 0 ? (
        <p className="mensagem-vazia">
          Nenhuma pessoa cadastrada.
        </p>
      ) : (
        <div className="tabela-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.idade} anos</td>

                  <td>
                    <button
                      type="button"
                      className="botao-excluir"
                      onClick={() => excluirPessoa(pessoa.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}