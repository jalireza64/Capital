using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Globalization;
using System;
using System.ComponentModel;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebPush;

namespace Test.Controllers
{
  public class SubscriptionController : Controller
  {

      public static List<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    // public static string PublicKey { get; set; } = "BF-9DAjR4QAFiR8wU9Yb0TMxuhX5FTs9-uEeGZNq4OsY5I-munE2VDABXUEbcrF6nry4xUiMaa-jorWMvQchy1U";
    // public static string PrivateKey { get; set; } = "WP7Mcxhwdckw0w4_-Dm0k0wq8_Ax6r-RFiLgGZsOV0o";
    public VapidDetails VapidDetails { get; set; } = new VapidDetails("mailto:samir1374@gmail.com", "BF-9DAjR4QAFiR8wU9Yb0TMxuhX5FTs9-uEeGZNq4OsY5I-munE2VDABXUEbcrF6nry4xUiMaa-jorWMvQchy1U", "WP7Mcxhwdckw0w4_-Dm0k0wq8_Ax6r-RFiLgGZsOV0o");
        

    public IActionResult Register([FromBody]Subscription SubscriptionModel)
    {
      if (!Subscriptions.Contains(SubscriptionModel))
        Subscriptions.Add(SubscriptionModel);
      return Ok();
    }

    public async Task<IActionResult> Trigger([FromBody]string endpoint)
    {
      var subscription = Subscriptions.FirstOrDefault(o=>o.Endpoint == endpoint);
      var pushSubscription = new PushSubscription(subscription.Endpoint, subscription.P256DH, subscription.Auth);
      var options = new Dictionary<string, object>();
      options["vapidDetails"] = VapidDetails;
      var webPushClient = new WebPushClient();
      webPushClient.SendNotification(pushSubscription, "شما یک درخواست مرخصی دارید", options);
      return Ok();
    }
  }

    public class Subscription
    {
        public int Id { get; set; }
        public string Endpoint { get; set; }
        public string P256DH { get; set; }
        public string Auth { get; set; }
    }
}
