using ControleGastos.Data;
using ControleGastos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> Listar()
    {
        return Ok(await context.Pessoas.AsNoTracking().ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Pessoa>> ObterPorId(int id)
    {
        var pessoa = await context.Pessoas
            .AsNoTracking()
            .Include(p => p.Transacoes)
            .FirstOrDefaultAsync(p => p.Id == id);

        return pessoa is null ? NotFound() : Ok(pessoa);
    }

    [HttpPost]
    public async Task<ActionResult<Pessoa>> Criar(CriarPessoaRequest request)
    {
        var pessoa = new Pessoa { Nome = request.Nome.Trim(), Idade = request.Idade };
        context.Pessoas.Add(pessoa);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(ObterPorId), new { id = pessoa.Id }, pessoa);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, CriarPessoaRequest request)
    {
        var pessoa = await context.Pessoas.FindAsync(id);
        if (pessoa is null)
        {
            return NotFound();
        }

        pessoa.Nome = request.Nome.Trim();
        pessoa.Idade = request.Idade;
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var pessoa = await context.Pessoas.FindAsync(id);
        if (pessoa is null)
        {
            return NotFound();
        }

        context.Pessoas.Remove(pessoa);
        await context.SaveChangesAsync();

        return NoContent();
    }
}

public class CriarPessoaRequest
{
    [Required, StringLength(120)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 130)]
    public int Idade { get; set; }
}
