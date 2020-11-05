using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OlxAPI.Data;
using OlxAPI.Dtos;
using OlxAPI.Models;

namespace OlxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _auth;
        private readonly IConfiguration _config;
        private readonly DataContext _context;
        public AuthController(IAuthRepository auth, IConfiguration config, DataContext context)
        {
            _context = context;
            _config = config;
            _auth = auth;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _auth.Login(userForLoginDto.Username, userForLoginDto.Password);
            var userRole = await _context.Roles.Include(r => r.RoleDescription).FirstOrDefaultAsync(r => r.UserId == user.Id);

            if (user == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name , user.Username),
                new Claim(ClaimTypes.Role, userRole.RoleDescription.RoleName),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (!ModelState.IsValid)            ///error validator
            {
                return BadRequest(ModelState);
            }

            if (await _auth.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists!");
            }

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = _auth.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
    }
}