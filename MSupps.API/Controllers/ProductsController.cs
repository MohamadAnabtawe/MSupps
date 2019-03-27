
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MSupps.API.Data;
using MSupps.API.Dtos;
using MSupps.API.Models;
using System;
using System.Security.Claims;

namespace MSupps.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly IMSuppsRepository _repo;
    private readonly IMapper _mapper;

    public ProductsController(IMSuppsRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
      var products = await _repo.GetProducts();
      var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
      return Ok(productsToReturn);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
      var product = await _repo.GetProduct(id);
      var productToReturn = _mapper.Map<ProductToReturnDto>(product);
      return Ok(productToReturn);
    }
    [HttpGet("search/{searchString}")]
    public async Task<IActionResult> GetProduct(string searchString)
    {
      var products = await _repo.SearchProduct(searchString);
      var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
      return Ok(productsToReturn);
    }
    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetProductsByCategory(string category)
    {
      var products = await _repo.GetProductsByCategory(category);
      var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
      return Ok(productsToReturn);
    }
    [HttpPost("add")]
    public async Task<IActionResult> AddProduct(ProductAddDto productAddDtoDto)
    {
      var productToCreate = new Product
      {
        Description = productAddDtoDto.Description,
        SuggestedUse = productAddDtoDto.SuggestedUse,
        OtherIngredients = productAddDtoDto.OtherIngredients,
        Warnings = productAddDtoDto.Warnings,
        Price = productAddDtoDto.Price,
        Quantity = productAddDtoDto.Quantity,
        Name = productAddDtoDto.Name.ToLower(),
        Brand = productAddDtoDto.Brand.ToLower(),
        Category = productAddDtoDto.Category.ToLower()
      };
      var CreatedProduct = await _repo.AddProduct(productToCreate);
      return Ok(CreatedProduct);
    }


    [HttpPost("photo/add")]
    public async Task<IActionResult> AddProductPhoto(PhotoToAddDto photoToAddDto)
    {
      var photoToCreate = new Photo
      {
        IsMain = photoToAddDto.IsMain,
        ProductId = photoToAddDto.ProductId,
        Url = photoToAddDto.Url
      };
      var CreatedPhoto = await _repo.AddProductPhoto(photoToCreate);
      return StatusCode(201);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id,ProductAddDto productToUpdate)
    {
      var productFromRepo=await _repo.GetProduct(id);
       _mapper.Map(productToUpdate,productFromRepo);
      if(await _repo.SaveAll()) 
          return NoContent();
      throw new Exception($"Updating product {id} failed on save");
    }
    [HttpDelete("{id}")]    
    public async Task<IActionResult> DeleteProduct(int id)
    {
      if(int.Parse(User.FindFirst(ClaimTypes.Role).Value)!=1)
        return Unauthorized();
      var productFromRepo=await _repo.GetProduct(id);
      _repo.Delete(productFromRepo);
      if(await _repo.SaveAll()) 
          return Ok();
      return BadRequest("Failed deleting the product");
    }

  }

}