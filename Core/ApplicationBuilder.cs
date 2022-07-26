namespace Core
{
    public class ApplicationBuilder
    {
        public WebApplication app;
        public ApplicationBuilder(WebApplication app)
        {
            this.app = app;
        }
        public WebApplication GetWebApplication() {
            app.UseCors("CorsPolicy");
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            return this.app;
        }
    }
}
