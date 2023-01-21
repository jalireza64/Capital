using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using App_Resources;
using EmployeeRequest.Infrastracture.Controllers;
using Kendo.Mvc.UI;

namespace EmployeeRequest.Infrastracture.Attributes.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class SessionExpireAttribute : ActionFilterAttribute
    {

    }
}