using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Booth management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize(Roles = "Admin,Sponsor")]
    public class BoothController : BaseController<IBoothService, BoothDTO>
    {
        private readonly IBoothService _boothService;

        /// <summary>
        /// Initialize BoothController
        /// </summary>
        public BoothController(IBoothService boothService) : base(boothService)
        {
            _boothService = boothService;
        }

        /// <summary>
        /// Get booths by sponsor event ID
        /// </summary>
        [HttpGet("sponsor-event/{sponsorEventId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBySponsorEventId(int sponsorEventId)
        {
            try
            {
                var booths = await _boothService.GetBySponsorEventId(sponsorEventId);
                return Ok(booths);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
