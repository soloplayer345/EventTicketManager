namespace Inventory.DLL.Entities
{
    public class Sponsor : BaseEntity
    {
        public Guid AccountId { get; set; }
        public string Name { get; set; } = null!;
        public string Information { get; set; } = null!;

        // Navigation
        public Account Account { get; set; } = null!;
        public ICollection<SponsorEvent>? SponsorEvents { get; set; }
    }
}