using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OlxAPI.Models;

namespace OlxAPI.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly DataContext _context;
        public DataRepository(DataContext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var products = await _context.Products.Include(p => p.Photos).ToListAsync();

            return products;
        }

        public async Task<WishList> GetAWishListByIds(int userId, int productId)
        {
            var wishList = await _context.WishLists.FirstOrDefaultAsync(w => w.ProductId == productId && w.UserId == userId);

            return wishList;
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products.Include(p => p.Photos).FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<Product>> GetUserProducts(int id)
        {
            var userProducts = await _context.Products.Include(p => p.Photos).Where(p => p.UserId == id).ToListAsync();

            return userProducts;
        }

        public async Task<IEnumerable<object>> GetUserWishlist(int id)
        {
            var wishListForId = await _context.WishLists.Include(w => w.Product).ThenInclude(p => p.Photos).Where(p => p.UserId == id).Select(a => new {
                id = a.Product.Id,
                title = a.Product.Title,
                description = a.Product.Description,
                price = a.Product.Price,
                photos = a.Product.Photos,

            }).ToListAsync();

            return wishListForId;
        }
        // public async Task<IEnumerable<object>> GetUserWishlist(string title, string price)
        // {
        //     var wishListForId = await _context.WishLists.Include(w => w.Product).Where(p => p.UserId == id).Select(a => new {
        //         title = a.Product.Title,
        //         description = a.Product.Description,
        //         price = a.Product.Price
        //     }).ToListAsync();

        //     return wishListForId;
        // }

        public async Task<IEnumerable<WishList>> GetWishList()
        {
            var wishList = await _context.WishLists.ToListAsync();

            return wishList;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}