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
                //向单点登录申请注销
                if (!string.IsNullOrEmpty(TokenVal))
                {
                    try
                    {
                        new tceport.TokenService().ClearToken(TokenVal.Trim());
                    }
                    catch { }
                }
                Response.Redirect("Default.aspx");
            }
        }
    }
}