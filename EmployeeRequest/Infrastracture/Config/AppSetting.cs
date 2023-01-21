using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace EmployeeRequest.Infrastracture.Config
{
    public class AppSetting
    {
        public static string GetFinalCustomerName()
        {
            string result = WebConfigurationManager.AppSettings["FinalCustomerName"];
            return result;
        }

        public static string GetCstCode()
        {
            string result = WebConfigurationManager.AppSettings["CstCode"];
            return result;
        }

        public static bool GetShowPasswordInLoginState()
        {
            bool result = Convert.ToBoolean(WebConfigurationManager.AppSettings["ShowPasswordInLoginState"]);
            return result;
        }

        public static bool GetShowRememberMeInLoginState()
        {
            bool result = Convert.ToBoolean(WebConfigurationManager.AppSettings["ShowRememberMeInLoginState"]);
            return result;
        }
    }
}