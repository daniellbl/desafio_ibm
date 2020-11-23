using System;

namespace desafio_backend.Models
{
    public class TransactionDto
    {
        public TransactionDto() { }
        public TransactionDto(Transaction transaction)
        {
            Id = transaction.Id;
            AccountId = transaction.AccountId;
            BankNumber = transaction.BankNumber;
            BranchNumber = transaction.BranchNumber;
            AccountNumber = transaction.AccountNumber;
            ExecutedDate = transaction.ExecutedDate;
            Value = transaction.Value;
            Description = transaction.Description;
        }
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int BankNumber { get; set; }
        public int BranchNumber { get; set; }
        public int AccountNumber { get; set; }
        public DateTime ExecutedDate { get; set; }
        public float Value { get; set; }
        public string Description { get; set; }
        public string PersonCode { get; set; }
        public int Type { get; set; }
    }
}
