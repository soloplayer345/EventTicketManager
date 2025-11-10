using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Booth")]
    public class BoothEntity : BaseEntity
    {
        [Key]
        [Column("booth_id")]
        public int BoothId { get; set; }

        [Required]
        [Column("sponsorEvent_id")]
        public int SponsorEventId { get; set; }

        [Required]
        [Column("name")]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("location")]
        [MaxLength(500)]
        public string? Location { get; set; }

        // Navigation property
        [ForeignKey("SponsorEventId")]
        public virtual SponsorEventEntity? SponsorEvent { get; set; }
    }
}
