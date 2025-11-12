using Inventory.DLL.Emun;

namespace Inventory.DLL.Entities
{
    public class Ticket : BaseEntity
    {
        public Guid TicketTypeId { get; set; }
        public Guid OrderDetailId { get; set; }
        public TicketStatus Status { get; set; }

        // Navigation
        public TicketType TicketType { get; set; } = null!;
        public OrderDetail OrderDetail { get; set; } = null!;
    }
}