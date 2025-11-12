namespace Inventory.BLL.DTOs
{
    public class TicketTypeDTO
    {
        public int TicketTypeId { get; set; }
        public int EventId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Price { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
    }
}
