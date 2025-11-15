using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IEventService : IBaseService<Event, EventDTO>
    {
        Task<List<EventDTO>> GetEventsByOrganizer(int organizerId);
        Task<List<EventDTO>> GetUpcomingEvents();
        Task<List<EventDTO>> GetPastEvents();
    }
}
