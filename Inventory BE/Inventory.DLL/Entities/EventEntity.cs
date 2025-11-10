using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Event")]
    public class EventEntity : BaseEntity
    {
        [Key]
        [Column("event_id")]
        public int EventId { get; set; }

        [Required]
        [Column("title")]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Column("description")]
        public string? Description { get; set; }

        [Required]
        [Column("startDate")]
        public DateTime StartDate { get; set; }

        [Required]
        [Column("endDate")]
        public DateTime EndDate { get; set; }

        [Column("place")]
        [MaxLength(500)]
        public string? Place { get; set; }

        // Navigation properties
        public virtual ICollection<TicketTypeEntity> TicketTypes { get; set; } = new List<TicketTypeEntity>();
        public virtual ICollection<SponsorEventEntity> SponsorEvents { get; set; } = new List<SponsorEventEntity>();
    }
}
