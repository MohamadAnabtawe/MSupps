using System.Net;
using Microsoft.AspNetCore.Http;

namespace MSupps.API.Helpers
{
  public static class Extensions
  {
    /* add headers to the error response */
    public static void AddApplicationError(this HttpResponse response, string message)
    {
      // new header to display the error message
      response.Headers.Add("Application-Error", message);
      // these headers we added to allow the message to be displayed
      response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
      response.Headers.Add("Access-Control-Allow-Origin", "*");
    }
  }
}