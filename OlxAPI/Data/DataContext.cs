using Microsoft.EntityFrameworkCore;
using OlxAPI.Models;

namespace OlxAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleDescription> RoleDescriptions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<WishList> WishLists { get; set; }        
        public DbSet<Photo> Photos { get; set; }        
    }
}