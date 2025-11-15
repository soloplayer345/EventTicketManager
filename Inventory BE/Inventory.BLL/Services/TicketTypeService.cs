using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class TicketTypeService : BaseService<TicketType, TicketTypeDTO>, ITicketTypeService
    {
        private readonly IBaseRepository<TicketType> _repository;
        private readonly IMapper _mapper;

        public TicketTypeService(IBaseRepository<TicketType> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<TicketTypeDTO>> GetByEventId(int eventId)
        {
            var ticketTypes = await _repository.Read(t => t.EventId == Guid.Parse(eventId.ToString()));
            return _mapper.Map<List<TicketTypeDTO>>(ticketTypes);
        }
    }
}
