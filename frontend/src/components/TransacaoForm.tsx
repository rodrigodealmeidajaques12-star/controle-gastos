import { useEffect, useState, type FormEvent } from "react";
import { apiGet, apiPost } from "../services/api";
import type { Pessoa } from "../types/Pessoa";
import { TipoTransacao } from "../types/Transacao";

interface Props {
  onTransacaoCriada: () => void;
  atualizarPessoas: number;  //atualiza sempre que uma nova pessoa e cadastrada.
}

export function TransacaoForm({ onTransacaoCriada, atualizarPessoas }: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<number>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState("");

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const dados = await apiGet<Pessoa[]>("/Pessoas");
        setPessoas(dados);
      } catch {
        setErro("Erro ao carregar pessoas.");
      }
    }

    carregarPessoas();
  }, [atualizarPessoas]);

  async function salvar(e: FormEvent) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    try {
      await apiPost("/Transacoes", {
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId: Number(pessoaId),
      });

      setDescricao("");
      setValor("");
      setPessoaId("");
      setTipo(TipoTransacao.Despesa);

      setSucesso("Transação cadastrada com sucesso.");
      setTimeout(() => setSucesso(""), 5000);

      onTransacaoCriada();
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro ao cadastrar.");
      }
    }
  }

  return (
    <section>

      <h2>Cadastrar Transação</h2>

      <form onSubmit={salvar}>

        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value))}
        >
          <option value={TipoTransacao.Despesa}>
            Despesa
          </option>

          <option value={TipoTransacao.Receita}>
            Receita
          </option>

        </select>

        <select
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
          required
        >

          <option value="">
            Selecione uma pessoa
          </option>

          {pessoas.map((pessoa) => (
            <option
              key={pessoa.id}
              value={pessoa.id}
            >
              {pessoa.nome}
            </option>
          ))}

        </select>

        <button>
          Salvar Transação
        </button>

      </form>

      {erro && <p>{erro}</p>}

      {sucesso && <p>{sucesso}</p>}

    </section>
  );
}