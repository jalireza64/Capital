using System;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using EmployeeRequest.Infrastracture.BootStrapper;

namespace EmployeeRequest
{
    public class MvcApplication : HttpApplication
    {
        #region Application Methods

        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("Server");
            Response.Headers.Remove("X-AspNet-Version");
            Response.Headers.Remove("X-AspNetMvc-Version");
        }

        protected void Application_Start()
        {
            MvcHandler.DisableMvcResponseHeader = true;
            Stimulsoft.Base.StiLicense.Key = @"6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHm4lqN+V3/fvJECXRrqdoEPZqYyFXh3g3K9oCDFvgzMl4c9KudQQwMJ6nO6w7rHz59BhwYgDE0QzKtjY2WxEejTNewbNDXY492M2mDsK1Hb4t6MoFYGbSoID0gow3VC5cFhvcOKVoagiHq6/4iqFc3RS7nZQBp95+WB6N1fR//H7OBlvfuBKldvC1pJh6pTW/7HRdOclErt/EGwivx9SpuDNabWWBfIZJBdJsvKjpoIsDQGibWk8Y8F9V1mCLf88FurWwEZ9WzXePbJn+wfabHM+a7pqDAXhsaW33UEW6vQ3kgLrVjbcHWdhtYbp5j6ZeIMLBCW2LXiCZpzy3N3XqjlroV/s7KRZGeZMvRrLWhcM8YJ6sBTMUyQrF/Fk3d5f0WbAf7+opIA5rhxY+qgwWcE42S+HOOcMgb2IWtj5ycC/GXZ4o9qtk2WWJzCC+ygckXK7iI5pzhzScGmLCBrFnjyE5EP65FViVDSCcNl6hUFw7wwRtcQq5pnOu6wHRXsSpwNPufWaRqE4gd7hbrQoPqki4BLOYgGOQjZ3kJdc7MG47nVT62z1ScLsjH73q4yhABt8h1wmJl0LanKnE6EGkvZPCrDBBf0sZp12sJrxK8FGsPUKrBNZ5f4VuYkdzWS1ed2m5MZNHkDDd3LncYkQnLPh/MYAsnc2ud715njwiM62xIWYk9lIrmCWJU3JVcexRDS3/l7Po9UU5gx2xJKUW1tWOXKQ9GqQZYtn/rl804VMC1/tWr4X2XU1otulny5P8YkZ7BTG6zmkcW6raROxv7xkSUwE0LK2FmIpeBr29Zxn0QUYBtC09J+wVD5y00f/1jMU+k1jQmi1n2tpWgy6CxAHPPrQFhk0FsGXEDg82IELCKncbqkfqgT0QyV262YL2uxrcbcJ1Wrzf4llEX90hMa3oZK5wdQLrCBkXIlXverhGL3I09fR6lcXDMj8A3vrQrhr4bwYcWTH0hyJCPVLYIVxAFLwgV8wk700QOo3z32sSWKnyMHVx3brFB8I7rOPaW2Sc8rBxc1E9EvNcqiTwRd9QA3lIdR2Hpc4jyn5dx8PT6GTNGXNKhoTZDLrGMtYqXw4rVOXfkE8+opF4+/H602ockCI/IY7C65+sxooNgSg+9LpzImUt6GdtrvF8HrvJ0rUW6ZiAmGaQmqdrHfwC3K+QKU4UEWuLU1GPG+PKMrYEbtT/Hei7NPA5sOqHqbzaMsW7zj+enlhuEUeMdlxqfQs1QtTERrzX2HXv/JZ43rASH4ycuGftLR2v3AOHhtBCoYOCszhOiHYGmH0I9lwi8HDRTXjkuoRU1Zxmz9rSIQy35/aypV339OS7p4VydO5LibEiwugzaNHXCZalEPShhcWzTAq6+uCb+jA9ob+Za4yICRdIjgot/E5ZQNZl2VEhFmWR7pYSB7MB24z0ysVf3igAc50/3Lr4d7mQ7SgmtKFoejGOjvb75YOq/pEJGxCo1xIS+jhZklyLuiwmtyDe7Xmpn33fip22qx2iF7FYW71AyuT3tTPn2a7Jc2wXlPCAxB6dqx0eeX4fWA3+RIosUTxTyA7a/SM95pwN9FKYFPZ8TcTqDIq0Ntc57IdX5u1To=";



            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            // Disable Asp.Net Mvc Handler On Response Header
            MvcHandler.DisableMvcResponseHeader = true;
        }

        //protected void Application_PreSendRequestHeaders()
        //{
        //    Response.Headers.Remove("Server");
        //    Response.Headers.Remove("X-AspNet-Version"); 
        //}


        public void Session_OnStart()
        {
                if (Request.IsSecureConnection)
                {
                    var httpCookie = Response.Cookies["ASP.NET_SessionId"];
                    if (httpCookie != null)
                        httpCookie.Secure = true;
                }

            Session["appCulture"] = 0;
        }

        private void Session_End()
        {
            Session["appCulture"] = null;
        }

        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
                var cultureInfo = new CultureInfo("fa-IR");
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureInfo.Name);
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = ".";
                CheckSessionHijacking();
        }

        private void CheckSessionHijacking()
        {

            var sessionIpAddress = string.Empty;

            if (HttpContext.Current.Session == null)
                return;

            var encryptedString = Convert.ToString(Session["encryptedSession"]);
            var encodedAsBytes = Convert.FromBase64String(encryptedString);
            var decryptedString = System.Text.Encoding.ASCII.GetString(encodedAsBytes);
            var separator = new[] { '^' };

            if (!string.IsNullOrEmpty(decryptedString))
            {
                var splitStrings = decryptedString.Split(separator);
                if (splitStrings.Any())
                {
                    if (splitStrings[2].Any())
                    {
                        var userBrowserInfo = splitStrings[2].Split('~');
                        if (userBrowserInfo.Any())
                            sessionIpAddress = userBrowserInfo[1];
                    }
                }
            }

            var currentUseripAddress = string.IsNullOrEmpty(Request.ServerVariables["HTTP_X_FORWARDED_FOR"]) ?
                Request.ServerVariables["REMOTE_ADDR"] :
                Request.ServerVariables["HTTP_X_FORWARDED_FOR"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();


            //System.Net.IPAddress result;
            //if (currentUseripAddress != null && !System.Net.IPAddress.TryParse(currentUseripAddress, out result))
            //    result = System.Net.IPAddress.None;


            if (string.IsNullOrEmpty(sessionIpAddress))
                return;

            if (sessionIpAddress == currentUseripAddress)
                return;

            //Same way we can validate browser info also...
            //string currentBrowserInfo = Request.Browser.Browser + Request.Browser.Version + Request.UserAgent;
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();

            var httpCookie = Response.Cookies["ASP.NET_SessionId"];
            if (httpCookie != null)
                httpCookie.Expires = DateTime.Now.AddSeconds(-30);

            Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            Response.Redirect(@"~/home/index");
        }

        //protected void Application_BeginRequest(Object sender, EventArgs e)
        //{
        //    switch (Request.Url.Scheme)
        //    {
        //        case "https":
        //            Response.AddHeader("Strict-Transport-Security", "max-age=300");
        //            break;
        //        case "http":
        //            var path = "https://" + Request.Url.Host + Request.Url.PathAndQuery;
        //            Response.Status = "301 Moved Permanently";
        //            Response.AddHeader("Location", path);
        //            break;
        //    }
        //}


        #endregion
    }
}