using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface ITicketService : IBaseService<Ticket, TicketDTO>
    {
        Task<List<TicketDTO>> GetByOrderDetailId(int orderDetailId);
        Task<List<TicketDTO>> GetByTicketTypeId(int ticketTypeId);
    }
}
