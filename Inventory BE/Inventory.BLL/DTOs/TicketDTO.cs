namespace Inventory.BLL.DTOs
{
    public class TicketDTO
    {
        public int TicketId { get; set; }
        public int TicketTypeId { get; set; }
        public int OrderDetailId { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
