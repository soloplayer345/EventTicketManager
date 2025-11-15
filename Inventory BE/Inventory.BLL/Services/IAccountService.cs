using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IAccountService : IBaseService<Account, AccountDTO>
    {
        Task<AccountDTO> GetByEmail(string email);
    }
}
