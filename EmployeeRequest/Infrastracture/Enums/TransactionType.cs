using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Infrastracture.Enums
{
    public enum TransactionType
    {
        [Description("خرید")]
        Buy = 01,

        [Description("فروش")]
        Sell = 02
    }
}