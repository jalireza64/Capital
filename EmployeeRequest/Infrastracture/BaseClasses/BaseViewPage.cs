using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRequest.Infrastracture.BaseClasses
{
    public class BaseViewPage: WebViewPage
    {
        public override void Execute()
        {
            
        }
    }

    public class BaseViewPage<T> : WebViewPage<T>
    {
        public override void Execute()
        {
            
        }
    }
}