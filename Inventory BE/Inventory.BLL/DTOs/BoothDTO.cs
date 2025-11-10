namespace Inventory.BLL.DTOs
{
    public class BoothDTO
    {
        public int BoothId { get; set; }
        public int SponsorEventId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Location { get; set; }
    }
}
