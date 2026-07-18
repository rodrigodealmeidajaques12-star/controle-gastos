const API_URL = "http://localhost:5013/api";

/**
 * Lê a mensagem de erro retornada pela API.
 * Funciona com respostas em JSON ou texto simples.
 */
async function obterMensagemErro(
  response: Response,
  mensagemPadrao: string
): Promise<string> {
  const conteudo = await response.text();

  if (!conteudo) {
    return mensagemPadrao;
  }

  try {
    const erro = JSON.parse(conteudo);

    const errosValidacao = erro?.errors
      ? Object.values(erro.errors)
          .flat()
          .map(String)
          .join(" ")
      : null;

    return (
      erro?.mensagem ??
      errosValidacao ??
      erro?.title ??
      mensagemPadrao
    );
  } catch {
    // Caso o backend retorne somente uma string.
    return conteudo.replace(/^"|"$/g, "");
  }
}

/**
 * Realiza uma requisição GET para a API.
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    const mensagem = await obterMensagemErro(
      response,
      `Erro ${response.status} ao buscar os dados.`
    );

    throw new Error(mensagem);
  }

  return response.json();
}

/**
 * Realiza uma requisição POST para a API.
 */
export async function apiPost<T>(
  endpoint: string,
  body: unknown
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const mensagem = await obterMensagemErro(
      response,
      `Erro ${response.status} ao realizar o cadastro.`
    );

    throw new Error(mensagem);
  }

  return response.json();
}

/**
 * Realiza uma requisição PUT para a API.
 */
export async function apiPut(
  endpoint: string,
  body: unknown
): Promise<void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const mensagem = await obterMensagemErro(
      response,
      `Erro ${response.status} ao atualizar o registro.`
    );

    throw new Error(mensagem);
  }
}

/**
 * Realiza uma requisição DELETE para a API.
 */
export async function apiDelete(endpoint: string): Promise<void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const mensagem = await obterMensagemErro(
      response,
      `Erro ${response.status} ao excluir o registro.`
    );

    throw new Error(mensagem);
  }
}