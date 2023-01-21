using System.Web.Mvc;
using EmployeeRequest.Infrastracture.ActionFilters;
using EmployeeRequest.Infrastracture.BaseClasses;

namespace EmployeeRequest.Infrastracture.BaseClasses
{
    [LoginFilter(Order = 1)]
    public abstract class BasePageController : BaseController
    {
        [PageLoadFilter]
        [PageScriptInitiatorFilter]
        public abstract ActionResult LoadPage();
    }
}