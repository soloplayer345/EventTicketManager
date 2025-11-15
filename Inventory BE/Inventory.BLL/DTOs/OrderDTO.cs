namespace Inventory.BLL.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int AccountId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
