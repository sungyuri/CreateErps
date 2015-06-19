using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web
{
    public partial class cross : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string name = Path.GetFileName(Request.FilePath);
            string aa = Request.QueryString["aa"].ToString();
           string bb= HttpContext.Current.Session["UserID"].ToString();
            frame.Attributes.Add("src", "");
        }
    }
}