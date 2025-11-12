namespace Inventory.BLL.DTOs
{
    public class EventDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Place { get; set; }
    }
}
