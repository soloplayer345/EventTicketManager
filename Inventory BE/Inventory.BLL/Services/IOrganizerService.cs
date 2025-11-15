using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IOrganizerService : IBaseService<Organizer, OrganizerDTO>
    {
        Task<OrganizerDTO> GetByAccountId(int accountId);
    }
}
