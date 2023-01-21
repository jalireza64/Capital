using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace EmployeeRequest.Infrastracture.Attributes.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class ApplicationLockCheckerAttribute : ActionFilterAttribute
    {

    }
}