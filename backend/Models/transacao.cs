using ControleGastos.Enums;
using System.Text.Json.Serialization;

namespace ControleGastos.Models;

///Representa uma transação
/// Pode ser uma receita

public class Transacao
{
    ///Identificador unico da transação
    
    public int Id { get; set; }


    public string Descricao { get; set; } = string.Empty;

    ///Valor da transação
    
    public decimal Valor { get; set; }

    ///Tipo da transação
    
    public TipoTransacao Tipo { get; set; }


    ///Id da pessoa que realizou a transação
    
    public int PessoaId { get; set; }


    /// Pessoa vinculada a transação
    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }
    
}