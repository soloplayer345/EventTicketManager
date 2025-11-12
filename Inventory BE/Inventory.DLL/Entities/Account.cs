using Inventory.DLL.Emun;

namespace Inventory.DLL.Entities
{
    public class Account : BaseEntity
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public AccountRole accountRole { get; set; }

        // Navigation properties
        public Organizer? Organizer { get; set; }
        public Sponsor? Sponsor { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
