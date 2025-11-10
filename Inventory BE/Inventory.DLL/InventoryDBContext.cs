using Microsoft.EntityFrameworkCore;
using Inventory.DLL.Entities;

namespace Inventory.DLL
{
    public class InventoryDBContext : DbContext
    {
        public InventoryDBContext(DbContextOptions<InventoryDBContext> options) : base(options)
        {
            Database.Migrate();
        }

        // Event Ticket Management DbSets
        public DbSet<AccountEntity> Accounts { get; set; }
        public DbSet<OrganizerEntity> Organizers { get; set; }
        public DbSet<SponsorEntity> Sponsors { get; set; }
        public DbSet<EventEntity> Events { get; set; }
        public DbSet<SponsorEventEntity> SponsorEvents { get; set; }
        public DbSet<TicketTypeEntity> TicketTypes { get; set; }
        public DbSet<OrderEntity> Orders { get; set; }
        public DbSet<OrderDetailEntity> OrderDetails { get; set; }
        public DbSet<TicketEntity> Tickets { get; set; }
        public DbSet<BoothEntity> Booths { get; set; }
        public DbSet<PaymentEntity> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Account Configuration
            modelBuilder.Entity<AccountEntity>()
                .HasKey(a => a.AccountId);

            modelBuilder.Entity<AccountEntity>()
                .HasOne(a => a.Organizer)
                .WithOne(o => o.Account)
                .HasForeignKey<OrganizerEntity>(o => o.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AccountEntity>()
                .HasOne(a => a.Sponsor)
                .WithOne(s => s.Account)
                .HasForeignKey<SponsorEntity>(s => s.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            // Organizer Configuration
            modelBuilder.Entity<OrganizerEntity>()
                .HasKey(o => o.OrganizerId);

            // Sponsor Configuration
            modelBuilder.Entity<SponsorEntity>()
                .HasKey(s => s.SponsorId);

            modelBuilder.Entity<SponsorEntity>()
                .HasMany(s => s.SponsorEvents)
                .WithOne(se => se.Sponsor)
                .HasForeignKey(se => se.SponsorId)
                .OnDelete(DeleteBehavior.Cascade);

            // Event Configuration
            modelBuilder.Entity<EventEntity>()
                .HasKey(e => e.EventId);

            modelBuilder.Entity<EventEntity>()
                .HasMany(e => e.TicketTypes)
                .WithOne(tt => tt.Event)
                .HasForeignKey(tt => tt.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EventEntity>()
                .HasMany(e => e.SponsorEvents)
                .WithOne(se => se.Event)
                .HasForeignKey(se => se.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // SponsorEvent Configuration
            modelBuilder.Entity<SponsorEventEntity>()
                .HasKey(se => se.SponsorEventId);

            modelBuilder.Entity<SponsorEventEntity>()
                .HasMany(se => se.Booths)
                .WithOne(b => b.SponsorEvent)
                .HasForeignKey(b => b.SponsorEventId)
                .OnDelete(DeleteBehavior.Cascade);

            // TicketType Configuration
            modelBuilder.Entity<TicketTypeEntity>()
                .HasKey(tt => tt.TicketTypeId);

            modelBuilder.Entity<TicketTypeEntity>()
                .HasMany(tt => tt.Tickets)
                .WithOne(t => t.TicketType)
                .HasForeignKey(t => t.TicketTypeId);

            // Order Configuration
            modelBuilder.Entity<OrderEntity>()
                .HasKey(o => o.OrderId);

            modelBuilder.Entity<OrderEntity>()
                .HasOne(o => o.Account)
                .WithMany(a => a.Orders)
                .HasForeignKey(o => o.AccountId);

            modelBuilder.Entity<OrderEntity>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderEntity>()
                .HasMany(o => o.Payments)
                .WithOne(p => p.Order)
                .HasForeignKey(p => p.OrderId);

            // OrderDetail Configuration
            modelBuilder.Entity<OrderDetailEntity>()
                .HasKey(od => od.OrderDetailId);

            modelBuilder.Entity<OrderDetailEntity>()
                .HasMany(od => od.Tickets)
                .WithOne(t => t.OrderDetail)
                .HasForeignKey(t => t.OrderDetailId);

            // Ticket Configuration
            modelBuilder.Entity<TicketEntity>()
                .HasKey(t => t.TicketId);

            // Booth Configuration
            modelBuilder.Entity<BoothEntity>()
                .HasKey(b => b.BoothId);

            // Payment Configuration
            modelBuilder.Entity<PaymentEntity>()
                .HasKey(p => p.PaymentId);
        }
    }
}