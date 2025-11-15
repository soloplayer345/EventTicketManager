using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface ISponsorEventService : IBaseService<SponsorEvent, SponsorEventDTO>
    {
        Task<List<SponsorEventDTO>> GetBySponsorId(int sponsorId);
        Task<List<SponsorEventDTO>> GetByEventId(int eventId);
    }
}
