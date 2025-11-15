using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Ticket management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize]
    public class TicketController : BaseController<ITicketService, TicketDTO>
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService) : base(ticketService)
        {
            _ticketService = ticketService;
        }

        /// <summary>
        /// Get tickets by order detail ID
        /// </summary>
        [HttpGet("order-detail/{orderDetailId}")]
        public async Task<IActionResult> GetByOrderDetailId(int orderDetailId)
        {
            try
            {
                var tickets = await _ticketService.GetByOrderDetailId(orderDetailId);
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get tickets by ticket type ID
        /// </summary>
        [HttpGet("ticket-type/{ticketTypeId}")]
        public async Task<IActionResult> GetByTicketTypeId(int ticketTypeId)
        {
            try
            {
                var tickets = await _ticketService.GetByTicketTypeId(ticketTypeId);
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
