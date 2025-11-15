using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Organizer management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize(Roles = "Admin,Organizer")]
    public class OrganizerController : BaseController<IOrganizerService, OrganizerDTO>
    {
        private readonly IOrganizerService _organizerService;

        public OrganizerController(IOrganizerService organizerService) : base(organizerService)
        {
            _organizerService = organizerService;
        }

        /// <summary>
        /// Get organizer by account ID
        /// </summary>
        [HttpGet("by-account/{accountId}")]
        public async Task<IActionResult> GetByAccountId(int accountId)
        {
            try
            {
                var organizer = await _organizerService.GetByAccountId(accountId);
                return Ok(organizer);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
