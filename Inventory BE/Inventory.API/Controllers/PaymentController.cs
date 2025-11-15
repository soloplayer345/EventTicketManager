using Inventory.BLL.DTOs;
using Inventory.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    /// <summary>
    /// Payment management API endpoints
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOnlyInventoryUIApp")]
    [Authorize]
    public class PaymentController : BaseController<IPaymentService, PaymentDTO>
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService) : base(paymentService)
        {
            _paymentService = paymentService;
        }

        /// <summary>
        /// Get payments by order ID
        /// </summary>
        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            try
            {
                var payments = await _paymentService.GetByOrderId(orderId);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
