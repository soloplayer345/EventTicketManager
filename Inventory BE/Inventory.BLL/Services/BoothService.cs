using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class BoothService : BaseService<Booth, BoothDTO>, IBoothService
    {
        private readonly IBaseRepository<Booth> _repository;
        private readonly IMapper _mapper;

        public BoothService(IBaseRepository<Booth> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<BoothDTO>> GetBySponsorEventId(int sponsorEventId)
        {
            var booths = await _repository.Read(b => b.SponsorEventId == Guid.Parse(sponsorEventId.ToString()));
            return _mapper.Map<List<BoothDTO>>(booths);
        }
    }
}
