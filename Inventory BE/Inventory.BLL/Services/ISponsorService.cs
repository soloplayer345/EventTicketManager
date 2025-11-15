using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface ISponsorService : IBaseService<Sponsor, SponsorDTO>
    {
        Task<SponsorDTO> GetByAccountId(int accountId);
    }
}
