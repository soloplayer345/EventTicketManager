using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IBoothService : IBaseService<Booth, BoothDTO>
    {
        Task<List<BoothDTO>> GetBySponsorEventId(int sponsorEventId);
    }
}
