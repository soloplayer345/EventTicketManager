using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class OrderService : BaseService<Order, OrderDTO>, IOrderService
    {
        private readonly IBaseRepository<Order> _repository;
        private readonly IMapper _mapper;

        public OrderService(IBaseRepository<Order> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<OrderDTO>> GetByAccountId(int accountId)
        {
            var orders = await _repository.Read(o => o.AccountId == Guid.Parse(accountId.ToString()));
            return _mapper.Map<List<OrderDTO>>(orders);
        }
    }
}
