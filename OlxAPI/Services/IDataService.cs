using System.Collections.Generic;
using System.Threading.Tasks;
using OlxAPI.Models;

namespace OlxAPI.Services
{
    public interface IDataService
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetUserProducts(int id);
        Task<string> AddProduct(Product product);
    }
}