using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace desafio_backend.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int BranchId { get; set; }
        [Required]
        public float Balance { get; set; }
        public virtual User User { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
