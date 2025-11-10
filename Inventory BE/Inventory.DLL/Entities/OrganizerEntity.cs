using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Organizer")]
    public class OrganizerEntity : BaseEntity
    {
        [Key]
        [Column("organizer_id")]
        public int OrganizerId { get; set; }

        [Required]
        [Column("account_id")]
        public int AccountId { get; set; }

        [Required]
        [Column("name")]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("description")]
        public string? Description { get; set; }

        [Column("contact")]
        [MaxLength(255)]
        public string? Contact { get; set; }

        // Navigation property
        [ForeignKey("AccountId")]
        public virtual AccountEntity? Account { get; set; }
    }
}
