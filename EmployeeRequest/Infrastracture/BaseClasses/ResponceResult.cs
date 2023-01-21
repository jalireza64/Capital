using EmployeeRequest.Infrastracture.Enums;

namespace EmployeeRequest.Infrastracture.BaseClasses
{
    public class ResponseResult 
    {
        public ResponseResult() { }
        public ResponseResult(ResponseType responseType, string message,object data)
        {
            ResponseType = responseType;
            Message = message;
            Data = data;
        }
        public ResponseResult(ResponseType responseType, string message):this(responseType,message,null){}
        public string Message { get; set; }
        public ResponseType ResponseType { get; set; }
        public  object Data { get; set; }
    }
}