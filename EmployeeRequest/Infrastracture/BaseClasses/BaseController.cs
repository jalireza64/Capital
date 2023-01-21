using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using EmployeeRequest.Infrastracture.ActionResults;
using EmployeeRequest.Infrastracture.Enums;

namespace EmployeeRequest.Infrastracture.BaseClasses
{
    public class BaseController:Controller
    {
        public virtual CustomActionResult Json(ResponseType responseType,
            string message, object data = null)
        {
            return new CustomActionResult(new ResponseResult(responseType, message, data));
        }

        #region Public Methods

        public virtual JsonResult NotAuthorizedResult()
        {
            return Json("_Auth_");
        }

        #endregion

        #region Private Methods


        #endregion

        #region Protected


        #endregion
    }
}