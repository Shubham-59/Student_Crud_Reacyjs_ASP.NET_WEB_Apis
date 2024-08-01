using ASPCoreWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPCoreWebApi.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}
