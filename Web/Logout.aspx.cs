using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace Web
{
    public partial class Logout : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                //string Eprotid = HttpContext.Current.Session["EPORTID"].ToString();
                string TokenVal = Convert.ToString(Session["Token"]);
                //  string SysFlag = Convert.ToString(Session["SysFlag"]);
                FormsAuthentication.SignOut();
                //清除所有的session			
                HttpContext.Current.Session.Clear();
                Response.Redirect("Default.aspx");
            }
        }
    }
}