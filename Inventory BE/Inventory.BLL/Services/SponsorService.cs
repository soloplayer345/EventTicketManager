using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class SponsorService : BaseService<Sponsor, SponsorDTO>, ISponsorService
    {
        private readonly IBaseRepository<Sponsor> _repository;
        private readonly IMapper _mapper;

        public SponsorService(IBaseRepository<Sponsor> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<SponsorDTO> GetByAccountId(int accountId)
        {
            var sponsors = await _repository.Read(s => s.AccountId == Guid.Parse(accountId.ToString()));
            var sponsor = sponsors.FirstOrDefault();
            if (sponsor == null)
                throw new KeyNotFoundException("Sponsor not found.");

            return _mapper.Map<SponsorDTO>(sponsor);
        }
    }
}
