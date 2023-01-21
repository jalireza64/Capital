using System;
using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.ActionResults
{
    public class PermanentRedirectResult : ActionResult
    {
        public string Url { get; set; }

        public PermanentRedirectResult(string url)
        {
            if (string.IsNullOrEmpty(url))
                throw new ArgumentException(@"url is null or empty", nameof(url));
            
            Url = url;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));
            
            context.HttpContext.Response.StatusCode = 301;
            context.HttpContext.Response.RedirectLocation = Url;
            context.HttpContext.Response.End();
        }
    }
}