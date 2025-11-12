namespace Inventory.DLL.Entities
{
    public class Organizer : BaseEntity
    {
        public Guid AccountId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Contact { get; set; } = null!;

        // Navigation
        public Account Account { get; set; } = null!;
    }
}