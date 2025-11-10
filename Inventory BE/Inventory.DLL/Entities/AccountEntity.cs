using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Account")]
    public class AccountEntity : BaseEntity
    {
        [Key]
        [Column("account_id")]
        public int AccountId { get; set; }

        [Required]
        [Column("email")]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Column("role")]
        [MaxLength(50)]
        public string Role { get; set; } = string.Empty;

        // Navigation properties
        public virtual OrganizerEntity? Organizer { get; set; }
        public virtual SponsorEntity? Sponsor { get; set; }
        public virtual ICollection<OrderEntity> Orders { get; set; } = new List<OrderEntity>();
    }
}
