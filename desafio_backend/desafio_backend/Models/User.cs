using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace desafio_backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        public string Password { get; set; }
        [Required]
        [MaxLength(12)]
        public string Cpf { get; set; }
        [Required]
        public int UserType { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
