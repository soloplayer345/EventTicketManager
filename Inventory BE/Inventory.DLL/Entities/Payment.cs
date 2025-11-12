using Inventory.DLL.Emun;

namespace Inventory.DLL.Entities
{
    public class Payment : BaseEntity
    {
        public int OrderId { get; set; }
        public int Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }

        // Navigation
        public Order Order { get; set; } = null!;
    }
}