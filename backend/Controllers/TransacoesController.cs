using ControleGastos.Data;
using ControleGastos.Enums;
using ControleGastos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController(AppDbContext context) : ControllerBase
{
    /// <summary>
    /// Lista todas as transações.
    /// Também permite filtrar as transações por pessoa.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult> Listar([FromQuery] int? pessoaId)
    {
        var query = context.Transacoes
            .AsNoTracking()
            .AsQueryable();

        if (pessoaId.HasValue)
        {
            query = query.Where(
                transacao => transacao.PessoaId == pessoaId.Value
            );
        }

        var transacoes = await query
            .OrderByDescending(transacao => transacao.Id)
            .Select(transacao => new
            {
                transacao.Id,
                transacao.Descricao,
                transacao.Valor,
                transacao.Tipo,
                transacao.PessoaId,

                PessoaNome = transacao.Pessoa != null
                    ? transacao.Pessoa.Nome
                    : string.Empty
            })
            .ToListAsync();

        return Ok(transacoes);
    }

    /// <summary>
    /// Obtém uma transação pelo identificador.
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult> ObterPorId(int id)
    {
        var transacao = await context.Transacoes
            .AsNoTracking()
            .Where(transacao => transacao.Id == id)
            .Select(transacao => new
            {
                transacao.Id,
                transacao.Descricao,
                transacao.Valor,
                transacao.Tipo,
                transacao.PessoaId,

                PessoaNome = transacao.Pessoa != null
                    ? transacao.Pessoa.Nome
                    : string.Empty
            })
            .FirstOrDefaultAsync();

        if (transacao is null)
        {
            return NotFound(new
            {
                mensagem = "Transação não encontrada."
            });
        }

        return Ok(transacao);
    }

    /// <summary>
    /// Cadastra uma nova transação.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Transacao>> Criar(
        CriarTransacaoRequest request
    )
    {
        // O valor da transação precisa ser positivo.
        if (request.Valor <= 0)
        {
            return BadRequest(new
            {
                mensagem = "O valor deve ser maior que zero."
            });
        }

        var pessoa = await context.Pessoas
            .FirstOrDefaultAsync(
                pessoa => pessoa.Id == request.PessoaId
            );

        if (pessoa is null)
        {
            return BadRequest(new
            {
                mensagem = "A pessoa informada não existe."
            });
        }

        // Pessoas menores de 18 anos só podem registrar despesas.
        if (
            pessoa.Idade < 18 &&
            request.Tipo == TipoTransacao.Receita
        )
        {
            return BadRequest(new
            {
                mensagem =
                    "Pessoas menores de 18 anos só podem cadastrar despesas."
            });
        }

        var transacao = new Transacao
        {
            Descricao = request.Descricao.Trim(),
            Valor = request.Valor,
            Tipo = request.Tipo,
            PessoaId = request.PessoaId
        };

        context.Transacoes.Add(transacao);

        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(ObterPorId),
            new { id = transacao.Id },
            transacao
        );
    }

    /// <summary>
    /// Atualiza uma transação existente.
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(
        int id,
        CriarTransacaoRequest request
    )
    {
        var transacao = await context.Transacoes.FindAsync(id);

        if (transacao is null)
        {
            return NotFound(new
            {
                mensagem = "Transação não encontrada."
            });
        }

        if (request.Valor <= 0)
        {
            return BadRequest(new
            {
                mensagem = "O valor deve ser maior que zero."
            });
        }

        var pessoa = await context.Pessoas
            .FirstOrDefaultAsync(
                pessoa => pessoa.Id == request.PessoaId
            );

        if (pessoa is null)
        {
            return BadRequest(new
            {
                mensagem = "A pessoa informada não existe."
            });
        }

        if (
            pessoa.Idade < 18 &&
            request.Tipo == TipoTransacao.Receita
        )
        {
            return BadRequest(new
            {
                mensagem =
                    "Pessoas menores de 18 anos só podem cadastrar despesas."
            });
        }

        transacao.Descricao = request.Descricao.Trim();
        transacao.Valor = request.Valor;
        transacao.Tipo = request.Tipo;
        transacao.PessoaId = request.PessoaId;

        await context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Exclui uma transação.
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var transacao = await context.Transacoes.FindAsync(id);

        if (transacao is null)
        {
            return NotFound(new
            {
                mensagem = "Transação não encontrada."
            });
        }

        context.Transacoes.Remove(transacao);

        await context.SaveChangesAsync();

        return NoContent();
    }
}

/// <summary>
/// Dados necessários para cadastrar ou atualizar uma transação.
/// </summary>
public class CriarTransacaoRequest
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(
        200,
        MinimumLength = 1,
        ErrorMessage =
            "A descrição deve possuir entre 1 e 200 caracteres."
    )]
    public string Descricao { get; set; } = string.Empty;

    // Validação manual para evitar problemas entre vírgula e ponto.
    public decimal Valor { get; set; }

    [EnumDataType(
        typeof(TipoTransacao),
        ErrorMessage = "O tipo da transação é inválido."
    )]
    public TipoTransacao Tipo { get; set; }

    [Range(
        1,
        int.MaxValue,
        ErrorMessage = "O identificador da pessoa é inválido."
    )]
    public int PessoaId { get; set; }
}