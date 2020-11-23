using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace desafio_backend.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public int AccountId { get; set; }
        public virtual Account Account { get; set; }
        [Required]
        public int BankNumber { get; set; }
        [Required]
        public int BranchNumber { get; set; }
        [Required]
        public int AccountNumber { get; set; }
        [Column(TypeName = "datetime(2)")]
        public DateTime ExecutedDate { get; set; }
        [Required]
        public float Value { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }
        [Required]
        [MaxLength(15)]
        public string PersonCode { get; set; }

    }
}
