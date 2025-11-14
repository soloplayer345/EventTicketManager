using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Authentication controller for user registration and login
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        /// <summary>
        /// Constructor for AuthController
        /// </summary>
        /// <param name="authService">Authentication service</param>
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Register a new user account
        /// </summary>
        /// <param name="registerDto">Registration details including email, password, and role</param>
        /// <returns>Authentication response with token if successful</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.Register(registerDto);

            if (string.IsNullOrEmpty(result.Token))
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(result);
        }

        /// <summary>
        /// Login with existing user credentials
        /// </summary>
        /// <param name="loginDto">Login credentials including email and password</param>
        /// <returns>Authentication response with token if successful</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.Login(loginDto);

            if (string.IsNullOrEmpty(result.Token))
            {
                return Unauthorized(new { message = result.Message });
            }

            return Ok(result);
        }
    }
}
