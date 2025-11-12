namespace Inventory.BLL.DTOs
{
    public class OrderDetailDTO
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int Total { get; set; }
        public int Quantity { get; set; }
    }
}
