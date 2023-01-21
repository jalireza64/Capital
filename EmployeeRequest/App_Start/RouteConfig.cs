using System.Web.Mvc;
using System.Web.Routing;

namespace EmployeeRequest
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("wwwroot/");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.LowercaseUrls = true;
            routes.MapMvcAttributeRoutes();

            //routes.MapRoute("Default", "{controller}/{action}/{id}", new
            //{
            //    controller = "Home",
            //    action = "Index",
            //    id = UrlParameter.Optional,
            //});

            routes.MapRoute(
                "API",
                "api/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute("CatchAll", "{*url}", new { controller = "Home", action = "Index" });
        }
    }
}
