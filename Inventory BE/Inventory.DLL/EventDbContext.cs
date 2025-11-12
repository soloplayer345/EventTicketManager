using Inventory.DLL.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.DLL
{
    public class EventDbContext : DbContext
    {
        public EventDbContext(DbContextOptions<EventDbContext> options)
            : base(options)
        {
        }

        // === DbSet Definitions ===
        public DbSet<Account> Accounts { get; set; } = null!;
        public DbSet<Organizer> Organizers { get; set; } = null!;
        public DbSet<Sponsor> Sponsors { get; set; } = null!;
        public DbSet<SponsorEvent> SponsorEvents { get; set; } = null!;
        public DbSet<Event> Events { get; set; } = null!;
        public DbSet<TicketType> TicketTypes { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<Booth> Booths { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // === ENUM CONFIG (store as string) ===
            modelBuilder.Entity<Account>()
                .Property(a => a.accountRole)
                .HasConversion<string>();

            modelBuilder.Entity<Order>()
                .Property(o => o.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Ticket>()
                .Property(t => t.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Payment>()
                .Property(p => p.PaymentMethod)
                .HasConversion<string>();

            modelBuilder.Entity<SponsorEvent>()
                .Property(s => s.SponsorLevel)
                .HasConversion<string>();

            // === RELATIONSHIP CONFIG ===
            modelBuilder.Entity<Organizer>()
                .HasOne(o => o.Account)
                .WithOne(a => a.Organizer)
                .HasForeignKey<Organizer>(o => o.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sponsor>()
                .HasOne(s => s.Account)
                .WithOne(a => a.Sponsor)
                .HasForeignKey<Sponsor>(s => s.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SponsorEvent>()
                .HasOne(se => se.Sponsor)
                .WithMany(s => s.SponsorEvents)
                .HasForeignKey(se => se.SponsorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SponsorEvent>()
                .HasOne(se => se.Event)
                .WithMany(e => e.SponsorEvents)
                .HasForeignKey(se => se.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booth>()
                .HasOne(b => b.SponsorEvent)
                .WithMany(se => se.Booths)
                .HasForeignKey(b => b.SponsorEventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TicketType>()
                .HasOne(tt => tt.Event)
                .WithMany(e => e.TicketTypes)
                .HasForeignKey(tt => tt.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.TicketType)
                .WithMany(tt => tt.Tickets)
                .HasForeignKey(t => t.TicketTypeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.OrderDetail)
                .WithMany(od => od.Tickets)
                .HasForeignKey(t => t.OrderDetailId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Account)
                .WithMany(a => a.Orders)
                .HasForeignKey(o => o.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Order)
                .WithMany(o => o.Payments)
                .HasForeignKey(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Optional: Table name pluralization removal
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.DisplayName());
            }
        }

        // === AUTO SET AUDIT FIELDS ===
        public override int SaveChanges()
        {
            UpdateAuditFields();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditFields();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditFields()
        {
            var entries = ChangeTracker.Entries<BaseEntity>();
            var now = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = now;
                        entry.Entity.ModifiedDate = now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.ModifiedDate = now;
                        break;
                }
            }
        }
    }
}
