using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class TicketService : BaseService<Ticket, TicketDTO>, ITicketService
    {
        private readonly IBaseRepository<Ticket> _repository;
        private readonly IMapper _mapper;

        public TicketService(IBaseRepository<Ticket> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<TicketDTO>> GetByOrderDetailId(int orderDetailId)
        {
            var tickets = await _repository.Read(t => t.OrderDetailId == Guid.Parse(orderDetailId.ToString()));
            return _mapper.Map<List<TicketDTO>>(tickets);
        }

        public async Task<List<TicketDTO>> GetByTicketTypeId(int ticketTypeId)
        {
            var tickets = await _repository.Read(t => t.TicketTypeId == Guid.Parse(ticketTypeId.ToString()));
            return _mapper.Map<List<TicketDTO>>(tickets);
        }
    }
}
