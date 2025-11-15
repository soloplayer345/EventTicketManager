using AutoMapper;
using Inventory.BLL.DTOs;
using Inventory.BLL.Exceptions;
using Inventory.DLL;
using Inventory.DLL.Emun;
using Inventory.DLL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Inventory.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly EventDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;

        public AuthService(EventDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _jwtSecret = "ThisIsASecretKeyForJwtWith32Chars!!";
            _jwtIssuer = "your-app";
            _jwtAudience = "your-app";
        }

        public async Task<AuthResponseDTO> Register(RegisterRequestDTO registerDto)
        {
            // Check if email already exists
            var existingAccount = await _dbContext.Accounts
                .FirstOrDefaultAsync(a => a.Email == registerDto.Email);

            if (existingAccount != null)
            {
                return new AuthResponseDTO
                {
                    Message = "Email already exists."
                };
            }

            // Hash password
            var hashedPassword = HashPassword(registerDto.Password);

            // Create new account with Attendee role
            var newAccount = new Account
            {
                Email = registerDto.Email,
                Password = hashedPassword,
                accountRole = AccountRole.Attendee
            };

            _dbContext.Accounts.Add(newAccount);
            await _dbContext.SaveChangesAsync();

            // Generate JWT token
            var token = GenerateJwtToken(newAccount);

            return new AuthResponseDTO
            {
                AccountId = newAccount.Id.GetHashCode(), // Convert Guid to int for response
                Email = newAccount.Email,
                Role = newAccount.accountRole.ToString(),
                Token = token,
                Message = "Registration successful."
            };
        }

        public async Task<AuthResponseDTO> Login(LoginRequestDTO loginDto)
        {
            // Find account by email
            var account = await _dbContext.Accounts
                .FirstOrDefaultAsync(a => a.Email == loginDto.Email);

            if (account == null)
            {
                return new AuthResponseDTO
                {
                    Message = "Invalid email or password."
                };
            }

            // Verify password
            if (!VerifyPassword(loginDto.Password, account.Password))
            {
                return new AuthResponseDTO
                {
                    Message = "Invalid email or password."
                };
            }

            // Generate JWT token
            var token = GenerateJwtToken(account);

            return new AuthResponseDTO
            {
                AccountId = account.Id.GetHashCode(), // Convert Guid to int for response
                Email = account.Email,
                Role = account.accountRole.ToString(),
                Token = token,
                Message = "Login successful."
            };
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string inputPassword, string storedHash)
        {
            var inputHash = HashPassword(inputPassword);
            return inputHash == storedHash;
        }

        private string GenerateJwtToken(Account account)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, account.Id.ToString()),
                new Claim(ClaimTypes.Email, account.Email),
                new Claim(ClaimTypes.Role, account.accountRole.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtIssuer,
                audience: _jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
