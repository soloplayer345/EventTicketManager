using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Ticket")]
    public class TicketEntity : BaseEntity
    {
        [Key]
        [Column("ticket_id")]
        public int TicketId { get; set; }

        [Required]
        [Column("ticketType_id")]
        public int TicketTypeId { get; set; }

        [Required]
        [Column("orderDetail_id")]
        public int OrderDetailId { get; set; }

        [Required]
        [Column("status")]
        [MaxLength(50)]
        public string Status { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("TicketTypeId")]
        public virtual TicketTypeEntity? TicketType { get; set; }

        [ForeignKey("OrderDetailId")]
        public virtual OrderDetailEntity? OrderDetail { get; set; }
    }
}
