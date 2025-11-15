using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Repositories;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Services
{
    public class PaymentService : BaseService<Payment, PaymentDTO>, IPaymentService
    {
        private readonly IBaseRepository<Payment> _repository;
        private readonly IMapper _mapper;

        public PaymentService(IBaseRepository<Payment> repository, IMapper mapper)
            : base(repository, mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<PaymentDTO>> GetByOrderId(int orderId)
        {
            var payments = await _repository.Read(p => p.OrderId == Guid.Parse(orderId.ToString()));
            return _mapper.Map<List<PaymentDTO>>(payments);
        }
    }
}
