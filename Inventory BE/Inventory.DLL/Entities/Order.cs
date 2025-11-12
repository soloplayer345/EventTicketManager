using Inventory.DLL.Emun;

namespace Inventory.DLL.Entities
{
    public class Order : BaseEntity
    {
        public Guid AccountId { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }

        // Navigation
        public Account Account { get; set; } = null!;
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }
}