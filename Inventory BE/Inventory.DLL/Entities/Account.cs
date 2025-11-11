using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.DLL.Entities
{
    public class Account : BaseEntity
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        // Navigation properties
        public Organizer? Organizer { get; set; }
        public Sponsor? Sponsor { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
