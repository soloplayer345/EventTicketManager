using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Event management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    public class EventController : BaseController<IEventService, EventDTO>
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService) : base(eventService)
        {
            _eventService = eventService;
        }

        /// <summary>
        /// Get events by organizer ID
        /// </summary>
        [HttpGet("organizer/{organizerId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByOrganizer(int organizerId)
        {
            try
            {
                var events = await _eventService.GetEventsByOrganizer(organizerId);
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all upcoming events
        /// </summary>
        [HttpGet("upcoming")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUpcoming()
        {
            try
            {
                var events = await _eventService.GetUpcomingEvents();
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all past events
        /// </summary>
        [HttpGet("past")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPast()
        {
            try
            {
                var events = await _eventService.GetPastEvents();
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
