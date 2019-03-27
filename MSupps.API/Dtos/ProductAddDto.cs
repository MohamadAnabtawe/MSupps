namespace MSupps.API.Dtos
{
  public class ProductAddDto
  {
    public string Description { get; set; }
    public string SuggestedUse { get; set; }
    public string OtherIngredients { get; set; }
    public string Warnings { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Category { get; set; }

  }
}