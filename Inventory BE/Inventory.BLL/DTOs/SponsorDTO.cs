namespace Inventory.BLL.DTOs
{
    public class SponsorDTO
    {
        public int SponsorId { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Information { get; set; }
    }
}
