using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Order")]
    public class OrderEntity : BaseEntity
    {
        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }

        [Required]
        [Column("account_id")]
        public int AccountId { get; set; }

        [Required]
        [Column("orderDate")]
        public DateTime OrderDate { get; set; }

        [Required]
        [Column("status")]
        [MaxLength(50)]
        public string Status { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("AccountId")]
        public virtual AccountEntity? Account { get; set; }

        public virtual ICollection<OrderDetailEntity> OrderDetails { get; set; } = new List<OrderDetailEntity>();
        public virtual ICollection<PaymentEntity> Payments { get; set; } = new List<PaymentEntity>();
    }
}
