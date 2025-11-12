namespace Inventory.DLL.Entities
{
    public class Event : BaseEntity
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Place { get; set; } = null!;

        // Navigation
        public ICollection<TicketType>? TicketTypes { get; set; }
        public ICollection<SponsorEvent>? SponsorEvents { get; set; }
    }
}