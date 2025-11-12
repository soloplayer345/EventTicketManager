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
            CreateMap<AccountDTO, Account>();
            CreateMap<Account, AccountDTO>();

            CreateMap<OrganizerDTO, Organizer>();
            CreateMap<Organizer, OrganizerDTO>();

            CreateMap<SponsorDTO, Sponsor>();
            CreateMap<Sponsor, SponsorDTO>();

            CreateMap<EventDTO, Event>();
            CreateMap<Event, EventDTO>();

            CreateMap<SponsorEventDTO, SponsorEvent>();
            CreateMap<SponsorEvent, SponsorEventDTO>();

            CreateMap<TicketTypeDTO, TicketType>();
            CreateMap<TicketType, TicketTypeDTO>();

            CreateMap<OrderDTO, Order>();
            CreateMap<Order, OrderDTO>();

            CreateMap<OrderDetailDTO, OrderDetail>();
            CreateMap<OrderDetail, OrderDetailDTO>();

            CreateMap<TicketDTO, Ticket>();
            CreateMap<Ticket, TicketDTO>();

            CreateMap<BoothDTO, Booth>();
            CreateMap<Booth, BoothDTO>();

            CreateMap<PaymentDTO, Payment>();
            CreateMap<Payment, PaymentDTO>();
        }
    }
}

