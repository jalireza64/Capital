using System;
using System.Linq;
using System.Text;

namespace EmployeeRequest.Infrastracture.Helpers
{
    public static class EnumToJsonHelper
    {
        public static string ToJsEnum(this Type type)
        {

            if (!type.IsEnum)
                return String.Empty;

            var results = Enum.GetValues(type).Cast<object>()
              .ToDictionary(enumValue => (int)enumValue, enumValue => enumValue.ToString());

            var sb = new StringBuilder();

            sb.Append("");
            results.ToList().ForEach(t =>
            {
                sb.Append($"{t.Value}:{t.Key},");
            });
            sb = sb.Remove(sb.Length - 1, 1);
            sb.Append("");
            return sb.ToString();
        }
    }
}