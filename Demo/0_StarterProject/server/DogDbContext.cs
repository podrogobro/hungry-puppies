using Microsoft.EntityFrameworkCore;

namespace Dogs;

public class DogDbContext : DbContext
{
    public DogDbContext(DbContextOptions<DogDbContext> options) : base(options) { }

    public DbSet<Dog> Dogs { get; set; }
}