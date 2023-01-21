using System.Web.Mvc;

namespace EmployeeRequest.Areas.RM
{
    public class RMAreaRegistration : AreaRegistration 
    {
        public override string AreaName => "RM";

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //context.MapRoute(
            //    "RM_default",
            //    "RM/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}