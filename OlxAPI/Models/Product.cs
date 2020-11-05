using System;
using System.Collections.Generic;

namespace OlxAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime PostedOn { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        
        
    }
}