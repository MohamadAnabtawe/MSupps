using System.Linq;
using AutoMapper;
using MSupps.API.Dtos;
using MSupps.API.Models;

namespace MSupps.API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserForListDto>();
      CreateMap<User, UserDetailsDto>();
      CreateMap<Order, OrdersToReturnDto>();
      CreateMap<Photo, PhotosDto>();
      CreateMap<Product, ProductToReturnDto>().ForMember(dest => dest.PhotoUrl, opt =>
      {
        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain == 1).Url);
      });

      CreateMap<Cart, CartToReturnDto>();
      CreateMap<ProductCart, CartProductDto>();
      CreateMap<UserForUpdateDto, User>(); 
      CreateMap<ProductAddDto, Product>();
      CreateMap<CartProductUpdateDto,ProductCart>();
    }
  }
}