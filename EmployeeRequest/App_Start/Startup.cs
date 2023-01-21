using Microsoft.AspNet.SignalR;
using Owin;

namespace EmployeeRequest
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR(new HubConfiguration());
        }
    }
}