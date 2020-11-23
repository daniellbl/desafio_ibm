using desafio_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchsController : Controller
    {
        private readonly DatabaseContext _context;

        public BranchsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Branch>>> Get()
        {
            return await _context.Branchs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranchs(int id)
        {
            Branch branch = await _context.Branchs.FindAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            return branch;
        }

        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranchs(Branch branch)
        {
            _context.Branchs.Add(branch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBranchs", new { id = branch.Id }, branch);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Branch>> PutBranchs(int id, Branch branch)
        {
            if (id != branch.Id)
            {
                return BadRequest();
            }
            _context.Entry(branch).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
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
        public async Task<ActionResult<Branch>> DeleteBranchs(int id)
        {
            var branch = await _context.Branchs.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }
            _context.Branchs.Remove(branch);
            await _context.SaveChangesAsync();

            return branch;
        }

        private bool BranchExists(int id)
        {
            return _context.Branchs.Any(e => e.Id == id);
        }
    }
}
