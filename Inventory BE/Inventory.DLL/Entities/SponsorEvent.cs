using Inventory.DLL.Emun;
using Microsoft.Extensions.Logging;

namespace Inventory.DLL.Entities
{
    public class SponsorEvent : BaseEntity
    {
        public Guid SponsorId { get; set; }
        public Guid EventId { get; set; }
        public int Contribution { get; set; }
        public SponsorLevel SponsorLevel { get; set; }

        // Navigation
        public Sponsor Sponsor { get; set; } = null!;
        public Event Event { get; set; } = null!;
        public ICollection<Booth>? Booths { get; set; }
    }
}