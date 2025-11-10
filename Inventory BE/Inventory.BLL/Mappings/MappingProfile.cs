using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.DLL.Entities;

namespace Inventory.BLL.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Event Ticket Management Mappings
            CreateMap<AccountDTO, AccountEntity>();
            CreateMap<AccountEntity, AccountDTO>();

            CreateMap<OrganizerDTO, OrganizerEntity>();
            CreateMap<OrganizerEntity, OrganizerDTO>();

            CreateMap<SponsorDTO, SponsorEntity>();
            CreateMap<SponsorEntity, SponsorDTO>();

            CreateMap<EventDTO, EventEntity>();
            CreateMap<EventEntity, EventDTO>();

            CreateMap<SponsorEventDTO, SponsorEventEntity>();
            CreateMap<SponsorEventEntity, SponsorEventDTO>();

            CreateMap<TicketTypeDTO, TicketTypeEntity>();
            CreateMap<TicketTypeEntity, TicketTypeDTO>();

            CreateMap<OrderDTO, OrderEntity>();
            CreateMap<OrderEntity, OrderDTO>();

            CreateMap<OrderDetailDTO, OrderDetailEntity>();
            CreateMap<OrderDetailEntity, OrderDetailDTO>();

            CreateMap<TicketDTO, TicketEntity>();
            CreateMap<TicketEntity, TicketDTO>();

            CreateMap<BoothDTO, BoothEntity>();
            CreateMap<BoothEntity, BoothDTO>();

            CreateMap<PaymentDTO, PaymentEntity>();
            CreateMap<PaymentEntity, PaymentDTO>();
        }
    }
}

