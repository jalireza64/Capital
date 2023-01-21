using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.ActionFilters
{
    public class DeleteFileAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            filterContext.HttpContext.Response.Flush();

            //convert the current filter context to file and get the file path
            string filePath = ((FilePathResult)filterContext.Result).FileName;

            //delete the file after download
            System.IO.File.Delete(filePath);
        }
    }
}