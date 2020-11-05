using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OlxAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<Product> Products { get; set; }

        
    }
}