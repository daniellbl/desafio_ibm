namespace desafio_backend.Models
{
    public class AccountDto
    {
        public AccountDto() { }
        public AccountDto(Account account)
        {
            Id = account.Id;
            UserId = account.UserId;
            BranchId = account.BranchId;
            Balance = account.Balance;
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BranchId { get; set; }
        public float Balance { get; set; }


    }
}
