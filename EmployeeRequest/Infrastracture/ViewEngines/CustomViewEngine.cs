using System.Linq;
using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.ViewEngines
{
    public class CustomViewEngine : RazorViewEngine
    {
        private static readonly string[] NewPartialViewFormats =
        {
            "~/Views/{1}/Partials/{0}.cshtml",
            "~/Views/Shared/ErrorPages/{0}.cshtml"
        };

        public CustomViewEngine()
        {
            base.PartialViewLocationFormats = base.PartialViewLocationFormats.Union(NewPartialViewFormats).ToArray();
        }

    }
}