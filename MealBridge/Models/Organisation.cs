using System.ComponentModel.DataAnnotations;

namespace MealBridge.Models
{
    public class Organisation
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } 
        public string Email { get; set; }
        public string ContactNumber { get; set; } 
        public string Address { get; set; } 

        public List<OrganisationType> OrganisationTypes { get; set; } = new List<OrganisationType>();
    }
}
