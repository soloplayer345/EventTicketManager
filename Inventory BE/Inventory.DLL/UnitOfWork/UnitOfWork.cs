using Inventory.DLL.Entities;
using Inventory.DLL.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace Inventory.DLL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EventDbContext _context;
        private IDbContextTransaction? _transaction;
        
        private IBaseRepository<Account>? _accountRepository;
        private IBaseRepository<Organizer>? _organizerRepository;
        private IBaseRepository<Sponsor>? _sponsorRepository;
        private IBaseRepository<SponsorEvent>? _sponsorEventRepository;
        private IBaseRepository<Event>? _eventRepository;
        private IBaseRepository<TicketType>? _ticketTypeRepository;
        private IBaseRepository<Ticket>? _ticketRepository;
        private IBaseRepository<Booth>? _boothRepository;
        private IBaseRepository<Order>? _orderRepository;
        private IBaseRepository<OrderDetail>? _orderDetailRepository;
        private IBaseRepository<Payment>? _paymentRepository;

        public UnitOfWork(EventDbContext context)
        {
            _context = context;
        }

        public IBaseRepository<Account> AccountRepository
        {
            get
            {
                if (_accountRepository == null)
                    _accountRepository = new BaseRepository<Account>(_context);
                return _accountRepository;
            }
        }

        public IBaseRepository<Organizer> OrganizerRepository
        {
            get
            {
                if (_organizerRepository == null)
                    _organizerRepository = new BaseRepository<Organizer>(_context);
                return _organizerRepository;
            }
        }

        public IBaseRepository<Sponsor> SponsorRepository
        {
            get
            {
                if (_sponsorRepository == null)
                    _sponsorRepository = new BaseRepository<Sponsor>(_context);
                return _sponsorRepository;
            }
        }

        public IBaseRepository<SponsorEvent> SponsorEventRepository
        {
            get
            {
                if (_sponsorEventRepository == null)
                    _sponsorEventRepository = new BaseRepository<SponsorEvent>(_context);
                return _sponsorEventRepository;
            }
        }

        public IBaseRepository<Event> EventRepository
        {
            get
            {
                if (_eventRepository == null)
                    _eventRepository = new BaseRepository<Event>(_context);
                return _eventRepository;
            }
        }

        public IBaseRepository<TicketType> TicketTypeRepository
        {
            get
            {
                if (_ticketTypeRepository == null)
                    _ticketTypeRepository = new BaseRepository<TicketType>(_context);
                return _ticketTypeRepository;
            }
        }

        public IBaseRepository<Ticket> TicketRepository
        {
            get
            {
                if (_ticketRepository == null)
                    _ticketRepository = new BaseRepository<Ticket>(_context);
                return _ticketRepository;
            }
        }

        public IBaseRepository<Booth> BoothRepository
        {
            get
            {
                if (_boothRepository == null)
                    _boothRepository = new BaseRepository<Booth>(_context);
                return _boothRepository;
            }
        }

        public IBaseRepository<Order> OrderRepository
        {
            get
            {
                if (_orderRepository == null)
                    _orderRepository = new BaseRepository<Order>(_context);
                return _orderRepository;
            }
        }

        public IBaseRepository<OrderDetail> OrderDetailRepository
        {
            get
            {
                if (_orderDetailRepository == null)
                    _orderDetailRepository = new BaseRepository<OrderDetail>(_context);
                return _orderDetailRepository;
            }
        }

        public IBaseRepository<Payment> PaymentRepository
        {
            get
            {
                if (_paymentRepository == null)
                    _paymentRepository = new BaseRepository<Payment>(_context);
                return _paymentRepository;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                if (_transaction != null)
                {
                    await _transaction.CommitAsync();
                }
            }
            catch
            {
                await RollbackTransactionAsync();
                throw;
            }
            finally
            {
                if (_transaction != null)
                {
                    await _transaction.DisposeAsync();
                    _transaction = null;
                }
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }
}
