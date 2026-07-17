import { useState } from "react";
import { PessoaForm } from "./components/PessoaForm";
import { PessoaList } from "./components/PessoaList";
import { TransacaoForm } from "./components/TransacaoForm";
import { TransacaoList } from "./components/TransacaoList";
import { Totais } from "./components/Totais";

function App() {
  const [atualizarPessoas, setAtualizarPessoas] = useState(0);
  const [atualizarTransacoes, setAtualizarTransacoes] = useState(0);

  function recarregarPessoas() {
    setAtualizarPessoas((valorAtual) => valorAtual + 1);
    setAtualizarTransacoes((valorAtual) => valorAtual + 1);
  }

  function recarregarTransacoes() {
    setAtualizarTransacoes((valorAtual) => valorAtual + 1);
  }

  return (
    <main>
      <h1>Controle de Gastos Residenciais</h1>

      <PessoaForm onPessoaCriada={recarregarPessoas} />

      <PessoaList atualizar={atualizarPessoas} onPessoaExcluida={recarregarPessoas} />

      <TransacaoForm onTransacaoCriada={recarregarTransacoes} atualizarPessoas={atualizarPessoas} />

      <TransacaoList atualizar={atualizarTransacoes} />

      <Totais atualizar={atualizarTransacoes} />
    </main>
  );
}

export default App;