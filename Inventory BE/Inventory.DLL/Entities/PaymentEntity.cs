using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("Payment")]
    public class PaymentEntity : BaseEntity
    {
        [Key]
        [Column("payment_id")]
        public int PaymentId { get; set; }

        [Required]
        [Column("order_id")]
        public int OrderId { get; set; }

        [Required]
        [Column("amount")]
        public int Amount { get; set; }

        [Column("paymentMethod")]
        [MaxLength(100)]
        public string? PaymentMethod { get; set; }

        [Required]
        [Column("paymentDate")]
        public DateTime PaymentDate { get; set; }

        // Navigation property
        [ForeignKey("OrderId")]
        public virtual OrderEntity? Order { get; set; }
    }
}
