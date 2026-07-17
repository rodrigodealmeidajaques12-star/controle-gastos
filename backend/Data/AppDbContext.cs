using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Data;

/// <summary>
/// Contexto do banco de dados da aplicação.
/// Responsável por mapear as entidades para o banco SQLite.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Tabela de pessoas.
    /// </summary>
    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    /// <summary>
    /// Tabela de transações.
    /// </summary>
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}