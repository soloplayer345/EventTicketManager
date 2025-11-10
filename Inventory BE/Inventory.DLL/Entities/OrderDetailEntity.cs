using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    [Table("OrderDetail")]
    public class OrderDetailEntity : BaseEntity
    {
        [Key]
        [Column("orderDetail_id")]
        public int OrderDetailId { get; set; }

        [Required]
        [Column("order_id")]
        public int OrderId { get; set; }

        [Required]
        [Column("total")]
        public int Total { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        // Navigation properties
        [ForeignKey("OrderId")]
        public virtual OrderEntity? Order { get; set; }

        public virtual ICollection<TicketEntity> Tickets { get; set; } = new List<TicketEntity>();
    }
}
