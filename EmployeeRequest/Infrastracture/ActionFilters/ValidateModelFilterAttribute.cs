using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;

namespace EmployeeRequest.Infrastracture.ActionFilters
{
    public class ValidateModelFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var modelState = filterContext.Controller.ViewData.ModelState;
            if (!modelState.IsValid)
            {
                var errors = modelState.Values.SelectMany(v => v.Errors).Select(t=> t.ErrorMessage);
                filterContext.Result = new JsonResult()
                {
                    Data =  new ResponseResult()
                    {
                        ResponseType =  ResponseType.ValidationFailed,
                        Message = MessagesLibrary.InputError,
                        Data = errors.ToList()
                    }
                };
                return;
            }

            base.OnActionExecuting(filterContext);
        }

    }

    
}