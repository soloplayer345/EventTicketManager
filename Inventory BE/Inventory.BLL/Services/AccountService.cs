using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class AccountService : BaseService<Account, AccountDTO>, IAccountService
    {
        private readonly IBaseRepository<Account> _repository;
        private readonly IMapper _mapper;

        public AccountService(IBaseRepository<Account> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<AccountDTO> GetByEmail(string email)
        {
            var accounts = await _repository.Read(a => a.Email == email);
            var account = accounts.FirstOrDefault();
            if (account == null)
                throw new KeyNotFoundException("Account not found.");

            return _mapper.Map<AccountDTO>(account);
        }
    }
}
