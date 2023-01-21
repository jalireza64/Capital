using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeRequest.ViewModel
{
    public class LockModel
    {
        public bool IsValidContract { get; set; }

        public string CustomerName { get; set; }

        public string DeviceId { get; set; }
    }
}