namespace OlxAPI.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}