namespace Inventory.DLL.Entities
{
    public class Booth : BaseEntity
    {
        public Guid SponsorEventId { get; set; }
        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;

        // Navigation
        public SponsorEvent SponsorEvent { get; set; } = null!;
    }
}