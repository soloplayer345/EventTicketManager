using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class EventService : BaseService<Event, EventDTO>, IEventService
    {
        private readonly IBaseRepository<Event> _repository;
        private readonly IMapper _mapper;

        public EventService(IBaseRepository<Event> repository, IMapper mapper) 
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<EventDTO>> GetEventsByOrganizer(int organizerId)
        {
            var events = await _repository.Read(e => e.OrganizorEvents.Any(oe => oe.Id == Guid.Empty));
            return _mapper.Map<List<EventDTO>>(events);
        }

        public async Task<List<EventDTO>> GetUpcomingEvents()
        {
            var events = await _repository.Read(e => e.StartDate > DateTime.UtcNow);
            return _mapper.Map<List<EventDTO>>(events);
        }

        public async Task<List<EventDTO>> GetPastEvents()
        {
            var events = await _repository.Read(e => e.EndDate < DateTime.UtcNow);
            return _mapper.Map<List<EventDTO>>(events);
        }
    }
}
