using desafio_backend.Models;
using desafio_backend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private readonly DatabaseContext _context;

        public TransactionsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> Get()
        {
            List<Transaction> transactions = await _context.Transactions.ToListAsync();
            List<TransactionDto> transactionsDto = new List<TransactionDto>();
            foreach (Transaction account in transactions)
            {
                transactionsDto.Add(new TransactionDto(account));
            }
            return transactionsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransactions(int id)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            TransactionDto dto = new TransactionDto(transaction);
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> PostTransactions(TransactionDto transactionDto)
        {
            try
            {
                Account account = _context.Accounts.Single(e => e.Id == transactionDto.AccountId);
                if (account.Balance < transactionDto.Value) {
                    return BadRequest();
                }
                Transaction transaction = new Transaction { AccountId = transactionDto.AccountId,
                    Account = account, AccountNumber = transactionDto.AccountNumber,
                    BankNumber = transactionDto.BankNumber, BranchNumber = transactionDto.BranchNumber,
                    Description = transactionDto.Description, ExecutedDate = new DateTime(),
                    Value = transactionDto.Value, PersonCode = transactionDto.PersonCode };
                if(transaction.BankNumber != Constants.BankCode)
                {
                    _context.Transactions.Add(transaction);
                    await _context.SaveChangesAsync();
                    _context.Entry(account).State = EntityState.Modified;
                    account.Balance = account.Balance - transaction.Value;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    Account accountReceiver = _context.Accounts.First(
                        e => e.BranchId == transaction.BranchNumber && e.Id == transaction.AccountNumber);
                    if (accountReceiver != null)
                    {
                        _context.Entry(accountReceiver).State = EntityState.Modified;
                        accountReceiver.Balance = accountReceiver.Balance + transaction.Value;
                        await _context.SaveChangesAsync();
                        _context.Entry(account).State = EntityState.Modified;
                        account.Balance = account.Balance - transaction.Value;
                        await _context.SaveChangesAsync();

                        _context.Transactions.Add(transaction);
                        await _context.SaveChangesAsync();
                    }
                }
                return await GetTransactions(transaction.Id);
            }
            catch (InvalidOperationException)
            {
                return BadRequest();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDto>> DeleteTransactions(int id)
        {
            Transaction transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByAccount/{id}")]
        public ActionResult<IEnumerable<TransactionDto>> GetTransactionsByAccount(int id)
        {
            List<TransactionDto> transactionsDto = new List<TransactionDto>();
            Account account = _context.Accounts.First(e => e.Id == id);
            if (account == null)
            {
                return NotFound();
            }
            List<Transaction> transactions;
            transactions = _context.Transactions.Where(e => e.AccountId == id).ToList();
            foreach (Transaction transaction in transactions)
            {
                TransactionDto transactionDto = new TransactionDto(transaction);
                transactionDto.Type = 0;
                transactionsDto.Add(transactionDto);
            }
            transactions = _context.Transactions.Where(e => e.BankNumber == Constants.BankCode && e.BranchNumber == account.BranchId && e.AccountNumber == account.Id).ToList();
            foreach (Transaction transaction in transactions)
            {
                TransactionDto transactionDto = new TransactionDto(transaction);
                transactionDto.Type = 1;
                transactionsDto.Add(transactionDto);
            }
            return transactionsDto;
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Id == id);
        }
    }
}
