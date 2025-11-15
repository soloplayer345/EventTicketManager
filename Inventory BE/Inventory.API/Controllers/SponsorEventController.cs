using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Sponsor Event management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize(Roles = "Admin,Sponsor")]
    public class SponsorEventController : BaseController<ISponsorEventService, SponsorEventDTO>
    {
        private readonly ISponsorEventService _sponsorEventService;

        /// <summary>
        /// Initialize SponsorEventController
        /// </summary>
        public SponsorEventController(ISponsorEventService sponsorEventService) : base(sponsorEventService)
        {
            _sponsorEventService = sponsorEventService;
        }

        /// <summary>
        /// Get sponsor events by sponsor ID
        /// </summary>
        [HttpGet("sponsor/{sponsorId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBySponsorId(int sponsorId)
        {
            try
            {
                var sponsorEvents = await _sponsorEventService.GetBySponsorId(sponsorId);
                return Ok(sponsorEvents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get sponsor events by event ID
        /// </summary>
        [HttpGet("event/{eventId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByEventId(int eventId)
        {
            try
            {
                var sponsorEvents = await _sponsorEventService.GetByEventId(eventId);
                return Ok(sponsorEvents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
