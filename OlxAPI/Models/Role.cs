namespace OlxAPI.Models
{
    public class Role
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoleDescriptionId { get; set; }
        public RoleDescription RoleDescription { get; set; }
    }
}