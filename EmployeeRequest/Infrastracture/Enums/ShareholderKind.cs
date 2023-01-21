using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Infrastracture.Enums
{
    public enum ShareholderKind
    {
        [Description("حقیقی")]
        Actual = 1,

        [Description("حقوقی")]
        Legal = 2
    }
}