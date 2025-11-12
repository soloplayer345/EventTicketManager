using Inventory.DLL.Entities;

namespace Inventory.DLL.Repositories
{
    public class InventoryRepository : BaseRepository<Event>
    {
        public InventoryRepository(EventDbContext dbContext)
            : base(dbContext)
        {
        }
    }
}
