using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Sponsor management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize(Roles = "Admin,Sponsor")]
    public class SponsorController : BaseController<ISponsorService, SponsorDTO>
    {
        private readonly ISponsorService _sponsorService;

        public SponsorController(ISponsorService sponsorService) : base(sponsorService)
        {
            _sponsorService = sponsorService;
        }

        /// <summary>
        /// Get sponsor by account ID
        /// </summary>
        [HttpGet("by-account/{accountId}")]
        public async Task<IActionResult> GetByAccountId(int accountId)
        {
            try
            {
                var sponsor = await _sponsorService.GetByAccountId(accountId);
                return Ok(sponsor);
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
