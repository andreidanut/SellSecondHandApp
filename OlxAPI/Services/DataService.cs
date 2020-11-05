using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OlxAPI.Data;
using OlxAPI.Models;

namespace OlxAPI.Services
{
    public class DataService : IDataService
    {
        private readonly IDataRepository _repo;
        public DataService(IDataRepository repo)
        {
            _repo = repo;
        }

        public async Task<string> AddProduct(Product product)
        {
            product.PostedOn = DateTime.Now;
            _repo.Add(product);
            await _repo.SaveAll();

            return "Added successfully!";
        }

        public async Task<IEnumerable<Product>> GetAllProducts() 
        {
            var products = await _repo.GetAllProducts();

            return products;
        }

        public async Task<IEnumerable<Product>> GetUserProducts(int id)
        {
            var userProds = await _repo.GetUserProducts(id);

            return userProds;
        }
    }
}