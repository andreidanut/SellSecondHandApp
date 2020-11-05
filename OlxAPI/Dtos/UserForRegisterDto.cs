using System.ComponentModel.DataAnnotations;

namespace OlxAPI.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [MinLength(4)]
        public string Password { get; set; }
    }
}