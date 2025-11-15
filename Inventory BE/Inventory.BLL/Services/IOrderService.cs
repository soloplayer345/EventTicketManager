using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public interface IOrderService : IBaseService<Order, OrderDTO>
    {
        Task<List<OrderDTO>> GetByAccountId(int accountId);
    }
}
