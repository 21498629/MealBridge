using System.ComponentModel.DataAnnotations;

namespace MealBridge.Models
{
    public class Organisation
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        public List<OrganisationType> OrganisationTypes { get; set; } = new List<OrganisationType>();
    }
}
