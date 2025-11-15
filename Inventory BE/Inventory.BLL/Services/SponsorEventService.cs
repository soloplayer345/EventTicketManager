using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class SponsorEventService : BaseService<SponsorEvent, SponsorEventDTO>, ISponsorEventService
    {
        private readonly IBaseRepository<SponsorEvent> _repository;
        private readonly IMapper _mapper;

        public SponsorEventService(IBaseRepository<SponsorEvent> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<SponsorEventDTO>> GetBySponsorId(int sponsorId)
        {
            var sponsorEvents = await _repository.Read(se => se.SponsorId == Guid.Parse(sponsorId.ToString()));
            return _mapper.Map<List<SponsorEventDTO>>(sponsorEvents);
        }

        public async Task<List<SponsorEventDTO>> GetByEventId(int eventId)
        {
            var sponsorEvents = await _repository.Read(se => se.EventId == Guid.Parse(eventId.ToString()));
            return _mapper.Map<List<SponsorEventDTO>>(sponsorEvents);
        }
    }
}
