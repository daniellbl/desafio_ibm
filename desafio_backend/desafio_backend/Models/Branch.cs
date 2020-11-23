using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace desafio_backend.Models
{
    public class Branch
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
