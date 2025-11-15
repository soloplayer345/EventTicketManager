using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface ITicketTypeService : IBaseService<TicketType, TicketTypeDTO>
    {
        Task<List<TicketTypeDTO>> GetByEventId(int eventId);
    }
}
