namespace Inventory.BLL.DTOs
{
    public class SponsorEventDTO
    {
        public int Id { get; set; }
        public int SponsorEventId { get; set; }
        public int SponsorId { get; set; }
        public int EventId { get; set; }
        public int Contribution { get; set; }
        public string? SponsorLevel { get; set; }
    }
}
