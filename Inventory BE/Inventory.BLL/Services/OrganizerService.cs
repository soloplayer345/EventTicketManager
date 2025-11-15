using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class OrganizerService : BaseService<Organizer, OrganizerDTO>, IOrganizerService
    {
        private readonly IBaseRepository<Organizer> _repository;
        private readonly IMapper _mapper;

        public OrganizerService(IBaseRepository<Organizer> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<OrganizerDTO> GetByAccountId(int accountId)
        {
            var organizers = await _repository.Read(o => o.AccountId == Guid.Parse(accountId.ToString()));
            var organizer = organizers.FirstOrDefault();
            if (organizer == null)
                throw new KeyNotFoundException("Organizer not found.");

            return _mapper.Map<OrganizerDTO>(organizer);
        }
    }
}
