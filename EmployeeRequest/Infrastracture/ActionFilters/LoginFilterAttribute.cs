using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.ActionFilters
{
    public class LoginFilterAttribute : ActionFilterAttribute//AuthorizeAttribute
    {
        //public override void OnAuthorization(AuthorizationContext filterContext)
        //{
        //    var applicationLoginType = ApplicationSingleton.Current.ApplicationLoginType;

        //    if (applicationLoginType == ApplicationLoginType.UserNamePasswordOnly)
        //    {
        //        base.OnAuthorization(filterContext);
        //        return;
        //    }

        //    var redirectToLoginResult = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Account", action = "Login" }));
        //    if (applicationLoginType == ApplicationLoginType.ActiveDirectoryOnly)
        //    {
        //        filterContext.Result = redirectToLoginResult;
        //    }

        //    if (applicationLoginType == ApplicationLoginType.UserNamePasswordOrActiveDirectory)
        //    {
        //        filterContext.Result = redirectToLoginResult;
        //    }
        //}
    }
}