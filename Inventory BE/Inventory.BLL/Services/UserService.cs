using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;
using Inventory.DLL.Repositories;

namespace Inventory.BLL.Services
{
    public class UserService : BaseService<Account, UserDTO>
    {
        private readonly UserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(UserRepository repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}
