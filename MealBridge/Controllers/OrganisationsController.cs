using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MealBridge.Models;
using MealBridge.ViewModels;

namespace MealBridge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationsController : ControllerBase
    {
        private readonly AppDbContext _appDbcontext;

        public OrganisationsController(AppDbContext appDbcontext)
        {
            _appDbcontext = appDbcontext;
        }

        // GET: api/Organisations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organisation>>> GetOrganisations()
        {
          if (_appDbcontext.Organisations == null)
          {
              return NotFound();
          }
            return await _appDbcontext.Organisations.ToListAsync();
        }

        // GET: api/Organisations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organisation>> GetOrganisation(int id)
        {
          if (_appDbcontext.Organisations == null)
          {
              return NotFound();
          }
            var organisation = await _appDbcontext.Organisations.FindAsync(id);

            if (organisation == null)
            {
                return NotFound();
            }

            return organisation;
        }

        // PUT: api/Organisations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganisation(int id, Organisation organisation)
        {
            if (id != organisation.Id)
            {
                return BadRequest();
            }

            _appDbcontext.Entry(organisation).State = EntityState.Modified;

            try
            {
                await _appDbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(id))
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

        // POST: api/Organisations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Organisation>> PostOrganisation(Organisation organisation)
        {
          if (_appDbcontext.Organisations == null)
          {
              return Problem("Entity set 'AppDbContext.Organisations'  is null.");
          }
            _appDbcontext.Organisations.Add(organisation);
            await _appDbcontext.SaveChangesAsync();

            return CreatedAtAction("GetOrganisation", new { id = organisation.Id }, organisation);
        }

        // DELETE: api/Organisations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganisation(int id)
        {
            if (_appDbcontext.Organisations == null)
            {
                return NotFound();
            }
            var organisation = await _appDbcontext.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }

            _appDbcontext.Organisations.Remove(organisation);
            await _appDbcontext.SaveChangesAsync();

            return NoContent();
        }

        private bool OrganisationExists(int id)
        {
            return (_appDbcontext.Organisations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
