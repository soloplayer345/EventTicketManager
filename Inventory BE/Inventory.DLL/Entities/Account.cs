using Inventory.DLL.Emun;

namespace Inventory.DLL.Entities
{
    public class Account : BaseEntity
    {
        public string? email { get; set; }
        public string? password { get; set; }
        public AccountRole accountRole { get; set; }
    }
}
