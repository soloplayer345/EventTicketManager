using Inventory.DLL.Entities;
using Inventory.DLL.Repositories;

namespace Inventory.DLL.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IBaseRepository<Account> AccountRepository { get; }
        IBaseRepository<Organizer> OrganizerRepository { get; }
        IBaseRepository<Sponsor> SponsorRepository { get; }
        IBaseRepository<SponsorEvent> SponsorEventRepository { get; }
        IBaseRepository<Event> EventRepository { get; }
        IBaseRepository<TicketType> TicketTypeRepository { get; }
        IBaseRepository<Ticket> TicketRepository { get; }
        IBaseRepository<Booth> BoothRepository { get; }
        IBaseRepository<Order> OrderRepository { get; }
        IBaseRepository<OrderDetail> OrderDetailRepository { get; }
        IBaseRepository<Payment> PaymentRepository { get; }

        Task<int> SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
