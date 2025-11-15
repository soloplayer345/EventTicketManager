namespace Inventory.DLL.Entities
{
    public class OrganizorEvent :BaseEntity
    {
        public Guid OrganizerId { get; set; }
        public Guid EventId { get; set; }

        // Navigation
        public Organizer Organizer { get; set; } = null!;
        public Event Event { get; set; } = null!;
    }
}
