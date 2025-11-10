using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("SponsorEvent")]
    public class SponsorEventEntity : BaseEntity
    {
        [Key]
        [Column("sponsorEvent_id")]
        public int SponsorEventId { get; set; }

        [Required]
        [Column("sponsor_id")]
        public int SponsorId { get; set; }

        [Required]
        [Column("event_id")]
        public int EventId { get; set; }

        [Required]
        [Column("contribution")]
        public int Contribution { get; set; }

        [Column("sponsorLevel")]
        [MaxLength(50)]
        public string? SponsorLevel { get; set; }

        // Navigation properties
        [ForeignKey("SponsorId")]
        public virtual SponsorEntity? Sponsor { get; set; }

        [ForeignKey("EventId")]
        public virtual EventEntity? Event { get; set; }

        public virtual ICollection<BoothEntity> Booths { get; set; } = new List<BoothEntity>();
    }
}
