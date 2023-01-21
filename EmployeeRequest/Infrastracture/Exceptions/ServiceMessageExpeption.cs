using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeRequest.Infrastracture.BaseClasses;

namespace EmployeeRequest.Infrastracture.Exceptions
{
    public class ServiceMessageExpeption:Exception
    {
        public override string Message => ResponseResult.Message;
        public ResponseResult ResponseResult { get; }

        public ServiceMessageExpeption(ResponseResult responseResult)
        {
            ResponseResult = responseResult;
        }
    }
}