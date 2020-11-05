using System.Collections.Generic;
using System.Threading.Tasks;
using OlxAPI.Models;

namespace OlxAPI.Data
{
    public interface IDataRepository : IRepository
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<IEnumerable<Product>> GetUserProducts(int id);
        Task<WishList> GetAWishListByIds(int userId, int productId);
        Task<IEnumerable<WishList>> GetWishList();
        Task<IEnumerable<object>> GetUserWishlist(int id);
        Task<User> GetUser(int id);
        Task<bool> SaveAll();
    }
}