using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("TicketType")]
    public class TicketTypeEntity : BaseEntity
    {
        [Key]
        [Column("ticketType_id")]
        public int TicketTypeId { get; set; }

        [Required]
        [Column("event_id")]
        public int EventId { get; set; }

        [Required]
        [Column("name")]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("price")]
        public int Price { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        // Navigation properties
        [ForeignKey("EventId")]
        public virtual EventEntity? Event { get; set; }

        public virtual ICollection<TicketEntity> Tickets { get; set; } = new List<TicketEntity>();
    }
}
