using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.DLL.Entities
{
    public class BaseEntity
    {
        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [Column("CreatedBy")]
        public string? CreatedBy { get; set; }

        [Column("ModifiedDate")]
        public DateTime ModifiedDate { get; set; }

        [Column("ModifiedBy")]
        public string? ModifiedBy { get; set; }

        [Column("IsDeleted")]
        public bool IsDeleted { get; set; }
    }
}
