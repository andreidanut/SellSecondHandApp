namespace OlxAPI.Data
{
    public interface IRepository
    {
        void Add<T>(T Entity) where T : class;
        void Delete<T>(T Entity) where T : class;
    }
}