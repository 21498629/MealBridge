using MealBridge.Models;
using Microsoft.EntityFrameworkCore;

namespace MealBridge.Models
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }

        // Saving changes
        public async Task<bool>SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        // Adding
        public void Add<T>(T entity) where T : class 
        {
            _appDbContext.Add(entity);
        }

        // Delete
        public void Delete<T>(T entity) where T : class 
        {
            _appDbContext.Remove(entity);
        }

        // Organisation
        public async Task<Organisation[]> GetAllOrganisationsAsync()
        {
            IQueryable<Organisation> query = _appDbContext.Organisations;
            return await query.ToArrayAsync();
        }

        public async Task<Organisation> GetOrganisationByIdAsync(int OrganisationId)
        {
            IQueryable<Organisation> query = _appDbContext.Organisations;
            return await query.FirstOrDefaultAsync();
        }

        // Organisation Type
        public async Task<OrganisationType[]> GetAllOrganisationTypesAsync()
        {
            IQueryable<OrganisationType> query = _appDbContext.OrganisationTypes;
            return await query.ToArrayAsync();
        }

        public async Task<OrganisationType> GetOrganisationTypeByIdAsync(int OrganisationTypeId)
        {
            IQueryable<OrganisationType> query = _appDbContext.OrganisationTypes;
            return await query.FirstOrDefaultAsync();
        }
    }
}
