import { useState, type FormEvent } from "react";
import { apiPost } from "../services/api";
import type { Pessoa } from "../types/Pessoa";

interface PessoaFormProps {
  onPessoaCriada: () => void;
}

export function PessoaForm({ onPessoaCriada }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function mostrarMensagemSucesso(texto: string) {
    setMensagem(texto);

    setTimeout(() => {
      setMensagem("");
    }, 5000);
  }

  function mostrarMensagemErro(texto: string) {
    setErro(texto);

    setTimeout(() => {
      setErro("");
    }, 5000);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    try {
      await apiPost<Pessoa>("/Pessoas", {
        nome,
        idade: Number(idade),
      });

      setNome("");
      setIdade("");

      mostrarMensagemSucesso("Pessoa cadastrada com sucesso.");

      onPessoaCriada();
    } catch (error) {
      const mensagemErro =
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar pessoa.";

      mostrarMensagemErro(mensagemErro);
    }
  }

  return (
    <section>
      <h2>Cadastrar pessoa</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="idade">Idade</label>

          <input
            id="idade"
            type="number"
            min="0"
            max="130"
            value={idade}
            onChange={(event) => setIdade(event.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar pessoa</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      {erro && <p>{erro}</p>}
    </section>
  );
}