using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Ticket Type management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize(Roles = "Admin,Organizer")]
    public class TicketTypeController : BaseController<ITicketTypeService, TicketTypeDTO>
    {
        private readonly ITicketTypeService _ticketTypeService;

        /// <summary>
        /// Initialize TicketTypeController
        /// </summary>
        public TicketTypeController(ITicketTypeService ticketTypeService) : base(ticketTypeService)
        {
            _ticketTypeService = ticketTypeService;
        }

        /// <summary>
        /// Get ticket types by event ID
        /// </summary>
        [HttpGet("event/{eventId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByEventId(int eventId)
        {
            try
            {
                var ticketTypes = await _ticketTypeService.GetByEventId(eventId);
                return Ok(ticketTypes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
