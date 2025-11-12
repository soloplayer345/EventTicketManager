namespace Inventory.BLL.DTOs
{
    public class AccountDTO
    {
        public int AccountId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
