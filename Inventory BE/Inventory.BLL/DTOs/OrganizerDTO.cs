namespace Inventory.BLL.DTOs
{
    public class OrganizerDTO
    {
        public int OrganizerId { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Contact { get; set; }
    }
}
