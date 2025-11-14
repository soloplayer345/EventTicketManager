using Inventory.BLL.DTOs;

namespace Inventory.BLL.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> Register(RegisterRequestDTO registerDto);
        Task<AuthResponseDTO> Login(LoginRequestDTO loginDto);
    }
}
