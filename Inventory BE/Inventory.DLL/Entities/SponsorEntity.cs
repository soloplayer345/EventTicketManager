using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Sponsor")]
    public class SponsorEntity : BaseEntity
    {
        [Key]
        [Column("sponsor_id")]
        public int SponsorId { get; set; }

        [Required]
        [Column("account_id")]
        public int AccountId { get; set; }

        [Required]
        [Column("name")]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("information")]
        public string? Information { get; set; }

        // Navigation properties
        [ForeignKey("AccountId")]
        public virtual AccountEntity? Account { get; set; }

        public virtual ICollection<SponsorEventEntity> SponsorEvents { get; set; } = new List<SponsorEventEntity>();
    }
}
