using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IOrderDetailService : IBaseService<OrderDetail, OrderDetailDTO>
    {
        Task<List<OrderDetailDTO>> GetByOrderId(int orderId);
    }
}
