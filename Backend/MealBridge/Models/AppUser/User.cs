using MealBridge.Models;
using System.ComponentModel.DataAnnotations;

namespace MealBridge.Models.AppUser
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        //public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
