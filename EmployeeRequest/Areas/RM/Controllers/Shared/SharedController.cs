using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Config;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRequest.Areas.RM.Controllers.Shared
{
    public class SharedController : BaseController
    {
        [HttpPost]
        public virtual ActionResult GetAppSettingKeyForLogin()
        {
            bool showPasswordInLoginState = AppSetting.GetShowPasswordInLoginState();
            bool showRememberMeInLoginState = AppSetting.GetShowRememberMeInLoginState();
            var result = new
            {
                showPasswordInLoginState,
                showRememberMeInLoginState
            };
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult GetVersion()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string result = fvi.FileVersion;
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult setPrintFlag(string shrh_code,decimal comp_id)
        {
            var shareholder = ShareholerRepository.GetShareholder(shrh_code).FirstOrDefault();
            shareholder.shrh_code = shrh_code;
            shareholder.comp_id = comp_id;
            shareholder.print_flag = "2";
            shareholder.update_date = DateTime.Now;
            var result = ShareholerRepository.SetPrintFlag(shareholder);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }
    }
}