using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class OrderDetailService : BaseService<OrderDetail, OrderDetailDTO>, IOrderDetailService
    {
        private readonly IBaseRepository<OrderDetail> _repository;
        private readonly IMapper _mapper;

        public OrderDetailService(IBaseRepository<OrderDetail> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<OrderDetailDTO>> GetByOrderId(int orderId)
        {
            var orderDetails = await _repository.Read(od => od.OrderId == Guid.Parse(orderId.ToString()));
            return _mapper.Map<List<OrderDetailDTO>>(orderDetails);
        }
    }
}
