namespace ControleGastos.Models;

/// Representa uma pessoa cadastrada no sistema.

public class Pessoa
{
     /// Identificador unico da pessoa.
     /// E gerado automaticamente pelo banco de dados.
     public int Id { get; set;}

    /// nome da pessoa.
    
    public string Nome { get; set; } = string.Empty;

    ///Idade da pessoa.
    

    public int Idade { get; set; }

    ///Lista transações
    /// Uma pessoa pode ter varias receitar e despesas.
    

    public List<Transacao> Transacoes { get; set; } = new();
    
}
