using System;
using System.ComponentModel.DataAnnotations;

namespace MealBridge.Models
{
    public class Regiter
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Usernname { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("password")]
        [DataType(DataType.Password)]
        public string Confirmpassword { get; set; }
    }
}
