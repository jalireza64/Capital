using System;
using System.Net;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web.Routing;
using Elmah;

namespace EmployeeRequest.Infrastracture.Attributes.Shared
{
    public class ElmahMvcErrorLoggerFilter : IExceptionFilter
    {
        private static ErrorFilterConfiguration _config;

        public void OnException(ExceptionContext context)
        {
            if (context.ExceptionHandled) //The unhandled ones will be picked by the elmah module
            {
                var e = context.Exception;
                var context2 = context.HttpContext.ApplicationInstance.Context;
                if ((context2 == null) || (!RaiseErrorSignal(e, context2) && !IsFiltered(e, context2)))
                    LogException(e, context2);
            }
            else
            {
                if (context.HttpContext.Session != null)
                    //context.Result = new InternalServerErrorResult(context.HttpContext.Request);
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }

        private static bool IsFiltered(Exception e, HttpContext context)
        {
            if (_config == null)
            {
                _config = (context.GetSection("elmah/errorFilter") as ErrorFilterConfiguration) ?? new ErrorFilterConfiguration();
            }
            var context2 = new ErrorFilterModule.AssertionHelperContext(e, context);
            return _config.Assertion.Test(context2);
        }

        private static void LogException(Exception e, HttpContext context)
        {
            ErrorLog.GetDefault(context).Log(new Error(e, context));
        }

        private static bool RaiseErrorSignal(Exception e, HttpContext context)
        {
            var signal = ErrorSignal.FromContext(context);
            if (signal == null)
                return false;
            
            signal.Raise(e, context);
            return true;
        }
    }
}