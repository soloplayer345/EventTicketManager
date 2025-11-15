namespace Inventory.BLL.DTOs
{
    public class AuthResponseDTO
    {
        public int AccountId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
