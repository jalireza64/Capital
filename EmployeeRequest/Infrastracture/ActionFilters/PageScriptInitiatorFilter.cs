using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace EmployeeRequest.Infrastracture.ActionFilters
{

    public class PageScriptInitiatorFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var sb = new StringBuilder();

            var methodPattern = "function {0}({1}options){{" +
                                " var innerOptions = {{url:'{2}'{3}}};" +
                                " if(options)$.extend(innerOptions,options);" +
                                " var appdefulatOptions = appAjaxOptions(); " +
                                "  $.extend(appdefulatOptions,innerOptions); " +
                                "  return $.ajax(appdefulatOptions);" +
                                "}}";


            var cls = filterContext.Controller.GetType();
            var methodds = cls.GetMethods()
                .Where(m => m.GetCustomAttributes(typeof(AjaxMethodAttribute), false).Length > 0)
                .ToList();
            foreach (var methodInfo in methodds)
            {
                var methodParams = "";
                var ajaxParams = "";
                foreach (var parameterInfo in methodInfo.GetParameters())
                {
                    var paramName = parameterInfo.Name;
                    methodParams += $"{paramName},";
                    ajaxParams += $"{paramName}:{paramName},";
                }

                if (methodParams != string.Empty)
                {
                    //methodParams = methodParams.Remove(methodParams.LastIndexOf(",", StringComparison.Ordinal));
                    ajaxParams =
                        $",data:{{{ajaxParams.Remove(ajaxParams.LastIndexOf(",", StringComparison.Ordinal))}}}";
                }
                var httpContext = new HttpContextWrapper(HttpContext.Current);
                var urlHelper = new UrlHelper(new RequestContext(httpContext, new RouteData()));
                var url = urlHelper.Action(methodInfo.Name, cls.Name.Replace("Controller", ""));
                sb.AppendLine(string.Format(methodPattern, methodInfo.Name, methodParams, url, ajaxParams));
            }
            if (sb.Length>0)
            {
                filterContext.Controller.ViewBag.PageScripts = $"<script>{sb}</script>";
            }
            base.OnActionExecuted(filterContext);
        }
    }
}