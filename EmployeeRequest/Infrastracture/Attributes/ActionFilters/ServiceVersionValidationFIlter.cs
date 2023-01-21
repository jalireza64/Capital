using System.Collections.Generic;
using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.Attributes.ActionFilters
{
    public class ServiceVersionValidationFIlter:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            bool isSynchWithServicesVersion;
            bool.TryParse(filterContext.HttpContext.Application["IsSynchWithServicesVersion"].ToString(),
                out isSynchWithServicesVersion);

            if (!isSynchWithServicesVersion)
            {
                var result = new RedirectResult("~/errorhandler/IsNotSynchWithServicesVersion");
                filterContext.Result = result;
            }
        }
    }
}