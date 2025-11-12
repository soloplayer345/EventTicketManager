namespace Inventory.DLL.Entities
{
    public class TicketType : BaseEntity
    {
        public Guid EventId { get; set; }
        public string Name { get; set; } = null!;
        public int Price { get; set; }
        public string Description { get; set; } = null!;
        public int Quantity { get; set; }

        // Navigation
        public Event Event { get; set; } = null!;
        public ICollection<Ticket>? Tickets { get; set; }
    }
}