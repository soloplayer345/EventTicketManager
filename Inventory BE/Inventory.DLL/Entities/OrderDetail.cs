namespace Inventory.DLL.Entities
{
    public class OrderDetail : BaseEntity
    {
        public int OrderId { get; set; }
        public int Total { get; set; }
        public int Quantity { get; set; }

        // Navigation
        public Order Order { get; set; } = null!;
        public ICollection<Ticket>? Tickets { get; set; }
    }
}