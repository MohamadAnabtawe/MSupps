namespace MSupps.API.Dtos
{
    public class OrderedProductDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string PhotoUrl { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }  
    }
}