using System.Linq.Expressions;

namespace Inventory.DLL.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> Read(Expression<Func<T, bool>>? filter = null,
                                 Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                 int pageNumber = 1,
                                 int pageSize = 100);
        Task<T?> Read(object id);
        Task<T> Create(T entity);
        Task Update(T entity);
        Task Delete(object id);
    }
}
