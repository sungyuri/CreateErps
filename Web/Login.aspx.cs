using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TCEPORT.TC.Business;

namespace Web
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //获取Cookie
                //HttpCookie MyCookie = Request.Cookies["_TCPASS_TOKEN"];
                //if (MyCookie != null)
                //{
                //    string tokenValue = MyCookie.Values["_TOKEN_VALUE"];
                //    Response.AppendCookie(MyCookie);
                //    this.GotoWebUrl(tokenValue);
                //}
                if(Session["UserCode"]!=null)
                {
                    Response.Redirect("Default.aspx");
                }
            }
            ViewState["ErrInfo"] = "";
            ViewState["Code"] = spanCode.InnerText; //获取变更之前的验证码
            //生成验证码
            Random Ro = new Random();
            spanCode.InnerText = Ro.Next(1000, 9999).ToString();
        }

        protected void Imagebutton1_Click(object sender, EventArgs e)
        {
            //判断验证码
            if (txtCode.Text != ViewState["Code"].ToString())
            {
                ViewState["ErrInfo"] = "验证码不正确！";
                return;
            }
            //if (string.IsNullOrEmpty(Convert.ToString(Request.QueryString["BackURL"])))
            //{
            //    //没有返回地址，给出警告信息
            //    ViewState["ErrInfo"] = "没有BackURL返回地址标识！";
            //    return;
            //}
            bool IsOK = new SYSTEM_TMODULEQuery().IsLoginOK(txtUserName.Text.Trim(), txtPwd.Text);
            if (IsOK)
            {
                //产生令牌
                //string tokenValue = System.Guid.NewGuid().ToString().ToUpper();
                //this.HandleCookie(tokenValue);//处理Cookie
                //this.GotoWebUrl(tokenValue);
                Response.Redirect("Default.aspx");
            }
            else //登录不成功，给予警示
            {
                ViewState["ErrInfo"] = "用户名或密码错误！";
            }
        }
        /// <summary>
        /// 返回分站地址
        /// </summary>
        /// <param name="tokenValue"></param>
        protected void GotoWebUrl(string tokenValue)
        {
            //跳转回分站
          //  string BackURL = Server.UrlDecode(Request.QueryString["BackURL"]);
            string BackURL = "Default.aspx";
            if (BackURL.ToUpper().IndexOf("TOKEN=") == -1)
            {
                if (BackURL.IndexOf("?") > -1)
                {
                    BackURL += "&Token=" + tokenValue;
                }
                else
                {
                    BackURL += "?Token=" + tokenValue;
                }
            }
            Response.Redirect(BackURL);
        }
        /// <summary>
        /// 进行Cookie操作
        /// </summary>
        protected void HandleCookie(string tokenValue)
        {
            //对Cookie进行操作
            HttpCookie MyCookie = Request.Cookies["_TCPASS_TOKEN"];
            if (MyCookie != null) //如果存在该Cookie则进行修改
            {
                MyCookie.Values["_TOKEN_VALUE"] = tokenValue;
                Response.AppendCookie(MyCookie);
            }
            else //不存在Cookie则进行添加Cookie
            {
                HttpCookie NewCookie = new HttpCookie("_TCPASS_TOKEN");
                NewCookie.Values.Add("_TOKEN_VALUE", tokenValue);
                Response.AppendCookie(NewCookie);
            }
        }

    }
}