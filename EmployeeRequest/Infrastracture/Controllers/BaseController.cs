using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using App_Resources;
using EmployeeRequest.Infrastracture.Attributes.ActionFilters;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using Kendo.Mvc.UI;

namespace EmployeeRequest.Infrastracture.Controllers
{
    [ServiceVersionValidationFIlter]
    public class BaseController : Controller
    {


        #region Overrided Methods

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding,
          JsonRequestBehavior behavior)
        {
            return new JsonResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = int.MaxValue,
                RecursionLimit = 1024
            };
        }

        #endregion
    }
}