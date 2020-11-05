using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OlxAPI.Models
{
    public class WishList
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}