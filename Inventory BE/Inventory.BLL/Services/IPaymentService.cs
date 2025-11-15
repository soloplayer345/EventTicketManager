using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IPaymentService : IBaseService<Payment, PaymentDTO>
    {
        Task<List<PaymentDTO>> GetByOrderId(int orderId);
    }
}
