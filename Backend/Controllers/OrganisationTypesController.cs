using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBridge.Models;

namespace MealBridge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationTypesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrganisationTypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/OrganisationTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganisationType>>> GetOrganisationTypes()
        {
          if (_context.OrganisationTypes == null)
          {
              return NotFound();
          }
            return await _context.OrganisationTypes.ToListAsync();
        }

        // GET: api/OrganisationTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganisationType>> GetOrganisationType(int id)
        {
          if (_context.OrganisationTypes == null)
          {
              return NotFound();
          }
            var organisationType = await _context.OrganisationTypes.FindAsync(id);

            if (organisationType == null)
            {
                return NotFound();
            }

            return organisationType;
        }

        // PUT: api/OrganisationTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganisationType(int id, OrganisationType organisationType)
        {
            if (id != organisationType.Id)
            {
                return BadRequest();
            }

            _context.Entry(organisationType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationTypeExists(id))
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

        // POST: api/OrganisationTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrganisationType>> PostOrganisationType(OrganisationType organisationType)
        {
          if (_context.OrganisationTypes == null)
          {
              return Problem("Entity set 'AppDbContext.OrganisationTypes'  is null.");
          }
            _context.OrganisationTypes.Add(organisationType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganisationType", new { id = organisationType.Id }, organisationType);
        }

        // DELETE: api/OrganisationTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganisationType(int id)
        {
            if (_context.OrganisationTypes == null)
            {
                return NotFound();
            }
            var organisationType = await _context.OrganisationTypes.FindAsync(id);
            if (organisationType == null)
            {
                return NotFound();
            }

            _context.OrganisationTypes.Remove(organisationType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrganisationTypeExists(int id)
        {
            return (_context.OrganisationTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
