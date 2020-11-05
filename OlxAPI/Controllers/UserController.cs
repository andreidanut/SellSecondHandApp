using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OlxAPI.Data;
using OlxAPI.Models;
using OlxAPI.Services;

namespace OlxAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IDataRepository _repo;
        private readonly IDataService _dataService;
        public UserController(IDataRepository repo, IDataService dataService)
        {
            _dataService = dataService;
            _repo = repo;
        }

        // [Authorize(Roles="Admin")]
        [AllowAnonymous]
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var prods = await _dataService.GetAllProducts();

            return Ok(prods);
        }

        [HttpGet("userproducts/{id}")]
        public async Task<IActionResult> GetUserProducts(int id)
        {
            var userProds = await _dataService.GetUserProducts(id);

            return Ok(userProds);
        }

        [AllowAnonymous]
        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProdById(int id)
        {
            var userProds = await _repo.GetProductById(id);

            return Ok(userProds);
        }

        [HttpPost("addprod")]
        public async Task<ActionResult<string>> AddProduct(Product product)
        {
            await _dataService.AddProduct(product);

            return Ok(
                new { ok = "Added Successfully!"}
            );
        }

        [HttpPost("delfromwish/{id}")]
        public async Task<IActionResult> DeleteFromWishlist(WishList wish, int id)
        {
            var prodToRemove = await _repo.GetAWishListByIds(id, wish.ProductId);
            _repo.Delete(prodToRemove);
            await _repo.SaveAll();

            return Ok();
        }

        [HttpGet("wishlist")]
        public async Task<IActionResult> GetWishList()
        {
            var wishList = await _repo.GetWishList();

            return Ok(wishList);
        }

        [HttpGet("wishlist/{id}")]
        public async Task<IActionResult> GetWishList(int id)
        {
            var wishList = await _repo.GetUserWishlist(id);

            return Ok(wishList);
        }

        [HttpPost("addwishlist")]
        public async Task<IActionResult> AddToWishList(WishList wishList)
        {
            var wList = await _repo.GetAWishListByIds(wishList.UserId, wishList.ProductId);

            if (wList != null)
            {
                return BadRequest("Already have this one to your wish list!");
            }

            _repo.Add(wishList);
            await _repo.SaveAll();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            return Ok(user);
        }

    }
}