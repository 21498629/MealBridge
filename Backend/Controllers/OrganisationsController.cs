﻿using System;
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
    public class OrganisationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrganisationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Organisations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organisation>>> GetOrganisations()
        {
          if (_context.Organisations == null)
          {
              return NotFound();
          }
            return await _context.Organisations.ToListAsync();
        }

        // GET: api/Organisations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organisation>> GetOrganisation(int id)
        {
          if (_context.Organisations == null)
          {
              return NotFound();
          }
            var organisation = await _context.Organisations.FindAsync(id);

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

            _context.Entry(organisation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
          if (_context.Organisations == null)
          {
              return Problem("Entity set 'AppDbContext.Organisations'  is null.");
          }
            _context.Organisations.Add(organisation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganisation", new { id = organisation.Id }, organisation);
        }

        // DELETE: api/Organisations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganisation(int id)
        {
            if (_context.Organisations == null)
            {
                return NotFound();
            }
            var organisation = await _context.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }

            _context.Organisations.Remove(organisation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrganisationExists(int id)
        {
            return (_context.Organisations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
