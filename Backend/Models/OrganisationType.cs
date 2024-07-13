using System.ComponentModel.DataAnnotations;

namespace MealBridge.Models
{
    public class OrganisationType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
