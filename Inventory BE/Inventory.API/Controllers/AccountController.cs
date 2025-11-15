using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Account management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize]
    public class AccountController : BaseController<IAccountService, AccountDTO>
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService) : base(accountService)
        {
            _accountService = accountService;
        }

        /// <summary>
        /// Get account by email
        /// </summary>
        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            try
            {
                var account = await _accountService.GetByEmail(email);
                return Ok(account);
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
