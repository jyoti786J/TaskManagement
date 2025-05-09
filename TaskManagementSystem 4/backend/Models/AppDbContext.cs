using Microsoft.EntityFrameworkCore;

namespace TaskManagementSystem.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Task> Tasks => Set<Task>();
    
}