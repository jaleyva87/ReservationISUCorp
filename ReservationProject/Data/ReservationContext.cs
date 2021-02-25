using ReservationProject.Models;
using Microsoft.EntityFrameworkCore;

namespace ReservationProject.Data
{
  public class ReservationContext : DbContext
  {
    public ReservationContext(DbContextOptions<ReservationContext> options) : base(options)
    {
    }

    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Contact>().ToTable("Contact");
      modelBuilder.Entity<Reservation>().ToTable("Reservation");
      modelBuilder.Entity<Contact>()
          .HasMany(x => x.Reservations) // collection navigation property
          .WithOne() // no reference navigation property
          .HasForeignKey(d => d.ContactName).IsRequired(); // foreign key property

    }
  }
}
