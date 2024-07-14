using MealBridge.Models;

namespace MealBridge.Models
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // Organisation
        Task<Organisation[]> GetAllOrganisationsAsync();
        Task<Organisation> GetOrganisationByIdAsync(int OrganisationId);

        // Organisation Type
        Task<OrganisationType[]> GetAllOrganisationTypesAsync();
        Task<OrganisationType> GetOrganisationTypeByIdAsync(int OrganisationTypeId);
    }
}
