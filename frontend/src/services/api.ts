const API_URL = "http://localhost:5013/api";

/**
 * Realiza uma requisição GET para a API.
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    const erro = await response.json().catch(() => null);

    throw new Error(
      erro?.mensagem ??
        erro?.title ??
        `Erro ${response.status} ao buscar os dados.`
    );
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
    const erro = await response.json().catch(() => null);

    const errosValidacao = erro?.errors
      ? Object.values(erro.errors)
          .flat()
          .map(String)
          .join(" ")
      : null;

    throw new Error(
      erro?.mensagem ??
        errosValidacao ??
        erro?.title ??
        `Erro ${response.status} ao realizar o cadastro.`
    );
  }

  return response.json();
}

/**
 * Realiza uma requisição DELETE para a API.
 */
export async function apiDelete(endpoint: string): Promise<void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => null);

    throw new Error(
      erro?.mensagem ??
        erro?.title ??
        `Erro ${response.status} ao excluir o registro.`
    );
  }
}