namespace Inventory.BLL.Services
{
    public interface IBaseService<TEntity, TDto> 
        where TEntity : class
        where TDto : class
    {
        Task<TDto> Create(TDto dto);
        Task<List<TDto>> Read(int pageSize, int pageNumber);
        Task<TDto> Read(int id);
        Task Update(TDto dto);
        Task Delete(int id);
    }
}
