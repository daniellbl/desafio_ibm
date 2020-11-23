using desafio_backend.Models;
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
    public class AccountsController : Controller
    {
        private readonly DatabaseContext _context;

        public AccountsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountDto>>> Get()
        {
            List<Account> accounts = await _context.Accounts.ToListAsync();
            List<AccountDto> accountsDto = new List<AccountDto>();
            foreach (Account account in accounts)
            {
                accountsDto.Add(new AccountDto(account));
            }
            return accountsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountDto>> GetAccounts(int id)
        {
            Account account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            AccountDto dto = new AccountDto(account);
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<AccountDto>> PostAccounts(AccountDto accountDto)
        {
            try
            {
                Account account = new Account { UserId = accountDto.UserId, User = _context.Users.Single(e => e.Id == accountDto.UserId), BranchId = accountDto.BranchId, Branch = _context.Branchs.Single(e => e.Id == accountDto.BranchId), Balance = accountDto.Balance };
                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                return await GetAccounts(account.Id);
            } catch (InvalidOperationException) {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AccountDto>> PutAccounts(int id, AccountDto accountDto)
        {

            Account account = new Account { Id = id, UserId = accountDto.UserId, BranchId = accountDto.BranchId, Balance = accountDto.Balance, User =_context.Users.Single(e => e.Id == accountDto.UserId), Branch = _context.Branchs.Single(e => e.Id == accountDto.BranchId) };
            if (id != account.Id)
            {
                return BadRequest();
            }
            _context.Entry(account).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccounts(int id)
        {
            Account account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByUser/{id}")]
        public ActionResult<AccountDto> GetAccountsByUser(int id)
        {
            List<Account> account = _context.Accounts.Where(e => e.UserId == id).ToList();
            if (account == null || account.Count == 0)
            {
                return NotFound();
            }
            AccountDto accountDto = new AccountDto(account[0]);
            return accountDto;
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}
