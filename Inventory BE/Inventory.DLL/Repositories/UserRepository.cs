using Inventory.DLL.Entities;

namespace Inventory.DLL.Repositories
{
    public class UserRepository : BaseRepository<Account>
    {
        public UserRepository(EventDbContext dbContext)
            : base(dbContext)
        {
        }
    }
}
