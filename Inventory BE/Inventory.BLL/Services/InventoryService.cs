using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;
using Inventory.DLL.Repositories;

namespace Inventory.BLL.Services
{
    public class InventoryService : BaseService<Event, EventDTO>
    {
        private readonly InventoryRepository _repository;
        private readonly IMapper _mapper;

        public InventoryService(InventoryRepository repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}
