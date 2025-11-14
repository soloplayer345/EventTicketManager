using System.ComponentModel.DataAnnotations;

namespace Inventory.BLL.DTOs
{
    public class RegisterRequestDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[\W_]).{12,}$", 
            ErrorMessage = "Password must be at least 12 characters long, contain at least one uppercase letter, and one special character.")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        public required string Role { get; set; } // "Admin", "Organizer", "Sponsor", "Attendee"
    }
}
