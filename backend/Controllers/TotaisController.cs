using ControleGastos.Data;
using ControleGastos.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Controllers;

//Fica responsavel por calcular e apresentar os totais de cada pessoa e tambem o total gerado.


[ApiController]
[Route("api/[controller]")]
public class TotaisController(AppDbContext context) : ControllerBase
{
    //Vai lista todas as pessoas com seu totais de receitas e despesas e saçldo alem doi total geral
    [HttpGet]
    public async Task<IActionResult> Consultar()
    {
        var pessoas = await context.Pessoas
            .AsNoTracking()
            .Select(p => new
            {
                p.Id,
                p.Nome,

                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,

                    TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
            })
            .OrderBy(p => p.Nome)
            .ToListAsync();

        var totaisPorPessoa = pessoas
            .Select(p => new
            {
                p.Id,
                p.Nome,
                p.TotalReceitas,
                p.TotalDespesas,
                Saldo = p.TotalReceitas - p.TotalDespesas
            })
            .ToList();

        var totalReceitas = totaisPorPessoa.Sum(p => p.TotalReceitas);
        var totalDespesas = totaisPorPessoa.Sum(p => p.TotalDespesas);

        var resultado = new
        {
            Pessoas = totaisPorPessoa,

            TotalGeral = new
            {
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            }
        };

        return Ok(resultado);
    }

}