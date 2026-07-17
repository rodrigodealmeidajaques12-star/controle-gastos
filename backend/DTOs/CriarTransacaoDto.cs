using ControleGastos.Enums;

namespace ControleGastos.DTOs;

/// Os dados necessarios para cadastrar uma nova transação

public class CriarTransacaoDto
{
    
    //Descrição da transação
    public string Descricao { get; set; } = string.Empty;

    //Valor da transação

    public decimal valor {get; set;}

    //Tipo da transação (Receita ou Despesa)

    public TipoTransacao Tipo { get; set; }

    //Id da pessoa realacionada a transação

    public int PessoaId { get; set; }
}