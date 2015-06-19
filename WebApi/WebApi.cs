using System.Web;

namespace WebApi
{
    public class WebApi
    {
        public HttpRequest Request
        {
            get
            {
                return HttpContext.Current.Request;
            }
        }

        public HttpResponse Response
        {
            get
            {
                return HttpContext.Current.Response;
            }
        }
    }
}