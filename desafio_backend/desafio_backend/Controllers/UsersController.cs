using desafio_backend.Models;
using desafio_backend.Resources;
using desafio_backend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace desafio_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly DatabaseContext _context;

        public UsersController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            List<User> users = await _context.Users.ToListAsync();
            List<UserDto> userssDto = new List<UserDto>();
            foreach (User account in users)
            {
                userssDto.Add(new UserDto(account));
            }
            return userssDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUsers(int id)
        {
            User user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            UserDto dto = new UserDto(user);
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> PostUsers(UserDto userDto)
        {
            if(_context.Users.Where(e => e.Email == userDto.Email).ToList().Count == 0) {
            User user = new User { Email = userDto.Email, BirthDate = userDto.BirthDate, Cpf = userDto.Cpf, Name = userDto.Name, Password = userDto.Password, UserType = userDto.UserType };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            Branch branch = await _context.Branchs.FindAsync(1);
            if(branch == null) {
                branch = new Branch { Name = "agência 01" };
                _context.Branchs.Add(branch);
                await _context.SaveChangesAsync();
            }
            Account account = new Account { Balance = 1000, Branch = branch, BranchId = branch.Id, User= user, UserId = user.Id};
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return await GetUsers(user.Id);
            }else {
                return BadRequest();
            }
    }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUsers(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        public async Task<ActionResult<User>> DeleteUsers(int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<dynamic> Login(TokenDto tokenResource)
        {
            if (tokenResource != null && tokenResource.Email != null && tokenResource.Password != null)
            {
                var user = await GetUserLogin(tokenResource.Email, tokenResource.Password);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email),
                    new Claim("UserType", user.UserType.ToString())
                   };

                    var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constants.TokenSecret));

                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                    var token = new JwtSecurityToken(claims: claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                    return new
                    {
                        user = user,
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    };
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
        private async Task<User> GetUserLogin(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
