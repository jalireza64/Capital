using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace EmployeeRequest.Infrastracture.ActionResults
{
    public class CustomActionResult : ActionResult
    {
        private readonly bool _datetimeWithSecond;
        private readonly object _data;

        public CustomActionResult(object data, bool datetimeWithSecond = false)
        {
            _datetimeWithSecond = datetimeWithSecond;
            _data = data;
        }
        public override void ExecuteResult(ControllerContext context)
        {
            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = "application/json";
            using (JsonTextWriter writer = new JsonTextWriter(response.Output))
            {
                writer.Formatting = Formatting.Indented;
                JsonSerializerSettings sett = new JsonSerializerSettings()
                {
                    PreserveReferencesHandling = PreserveReferencesHandling.None,

                    ContractResolver = new ContractResolver()
                };

                //sett.Converters.Add(new CustomDateTimeConvertor(_datetimeWithSecond));
                JsonSerializer serializer = JsonSerializer.Create(sett);

                serializer.Serialize(writer, _data);

                writer.Flush();
            }
        }
    }

    public class ContractResolver : DefaultContractResolver
    {
        public override JsonContract ResolveContract(Type type)
        {
            var contract = base.ResolveContract(type);
            contract.IsReference = false;
            
            return contract;
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(member, memberSerialization);

            //property.HasMemberAttribute = true;
            property.Ignored = false;

            //property.ShouldSerialize = instance =>
            //{
            //    return true;
            //};

            return property;
        }
    }
}