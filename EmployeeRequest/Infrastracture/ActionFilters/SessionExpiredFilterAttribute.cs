using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using Kendo.Mvc.UI;

namespace EmployeeRequest.Infrastracture.ActionFilters
{
    public class SessionExpiredFilterAttribute : ActionFilterAttribute
    {

    }
}