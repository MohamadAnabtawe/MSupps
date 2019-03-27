using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MSupps.API.Data;
using MSupps.API.Dtos;
using MSupps.API.Models;

namespace MSupps.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class OrdersController : ControllerBase
  {
    private readonly IMSuppsRepository _repo;
    private readonly IMapper _mapper;

    public OrdersController(IMSuppsRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }
    [HttpGet("order/{OrderId}")]
    public async Task<IActionResult> GetOrder(int OrderId)
    {
      var order = await _repo.GetOrder(OrderId);
      return Ok(order);
    }
    [HttpGet("{UserId}")]
    public async Task<IActionResult> GetOrders(int UserId)
    {
      var orders = await _repo.GetOrders(UserId);
      var orderToReturn = _mapper.Map<IEnumerable<OrdersToReturnDto>>(orders);
      return Ok(orderToReturn);
    }
    [HttpGet("allOrders/")]
    public async Task<IActionResult> GetAllOrders()
    {
      if(int.Parse(User.FindFirst(ClaimTypes.Role).Value)!=1)
        return Unauthorized();
      var orders = await _repo.GetAllOrders();
      var orderToReturn = _mapper.Map<IEnumerable<OrdersToReturnDto>>(orders);
      return Ok(orderToReturn);
    }
    [HttpPost("add")]
      public async Task<IActionResult> addOrder(OrderedProduct[] products)
    {
      double total=0;
      foreach (var item in products)
      {
          total+=item.Price;
      }
      DateTime today = DateTime.Today;
      int userId=int.Parse(User.FindFirst(ClaimTypes.Role).Value);
      var order=new Order{
        UserId=userId,
        OrderDate=today,
        TotalPrice=total
      };
      var MyOrder = await _repo.AddOrder(order);
      return Ok(MyOrder);
    }
  }
}