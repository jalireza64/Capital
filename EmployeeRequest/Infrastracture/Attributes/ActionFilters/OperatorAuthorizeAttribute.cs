using System;
using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.Attributes.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class OperatorAuthorizeAttribute : ActionFilterAttribute
    {

    }
}