using System;
using System.Collections.Generic;
using System.Web;
using DCIS.Lib;

namespace TCEPORT.TC.Tools
{
    /// <summary>
    /// 用户登陆系统的信息
    /// </summary>
    [Serializable()]
    public abstract class UserInfo
    {
        /// <summary>
        /// 缺省构造
        /// </summary>
        public UserInfo()
        {
            this.UserID = 0;
            this.UserName = "";
            this.UserNo = "";
            this.WriteList = new List<string>();
            this.BeProxyPowerList = new List<string>();
            this.BeProxyRoleList = new List<string>();
            this.BeProxyUserList = new List<string>();
            this.CompanyName = "";
            this.CompID = "";
            this.CompType = EnumCompType.Manufacturing;
            this.Extends = new ExtendsData();
            this.Password = "";
            this.PowerList = new List<string>();
            this.ReadList = new List<string>();
            this.RoleList = new List<string>();
        }

        /// <summary>
        /// 用户名称
        /// </summary>
        public string UserName
        {
            get;
            set;
        }

        /// <summary>
        /// 用户登录帐号,非整型的ID号
        /// </summary>
        public string UserNo
        {
            get;
            set;
        }

        /// <summary>
        /// 用户序号
        /// </summary>
        public int UserID
        {
            get;
            set;
        }

        /// <summary>
        /// 用户所在公司编号
        /// </summary>
        public string CompID
        {
            get;
            set;
        }

        /// <summary>
        /// 用户所在单位
        /// </summary>
        public string CompanyName
        {
            get;
            set;
        }

        /// <summary>
        /// 单位类型
        /// </summary>
        public Enum CompType
        {
            get;
            set;
        }

        /// <summary>
        /// 登陆密码
        /// </summary>
        public string Password
        {
            get;
            set;
        }

        #region 权限字符串

        /// <summary>
        /// 只读权限
        /// </summary>
        public List<string> ReadList
        {
            get;
            set;
        }

        /// <summary>
        /// 写权限
        /// </summary>
        public List<string> WriteList
        {
            get;
            set;
        }

        /// <summary>
        /// 有或者无权限
        /// </summary>
        public List<string> PowerList
        {
            get;
            set;
        }

        /// <summary>
        /// 角色列表
        /// </summary>
        public List<string> RoleList
        {
            get;
            set;
        }

        ///被代理的权限列表
        public List<string> BeProxyPowerList
        {
            get;
            set;
        }

        /// <summary>
        /// 被代理的角色列表
        /// </summary>
        public List<string> BeProxyRoleList
        {
            get;
            set;
        }

        /// <summary>
        /// 被代理的用户列表
        /// </summary>
        public List<string> BeProxyUserList
        {
            get;
            set;
        }

        #endregion 权限字符串

        /// <summary>
        /// 获取当前的用户信息
        /// </summary>
        public static UserInfo GetCurrentUser()
        {
            return null;
        }

        /// <summary>
        /// 扩展属性
        /// </summary>
        public ExtendsData Extends
        {
            get;
            set;
        }

        /// <summary>
        /// 判断是否有权限
        /// </summary>
        /// <param name="funcNo">功能点编号</param>
        /// <returns></returns>
        public bool HasRight(string funcNo)
        {
            int i = this.PowerList.IndexOf(funcNo);
            if (i >= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 是否有操作某一个模块的权限
        /// </summary>
        /// <param name="funcNo">模块编号</param>
        /// <returns></returns>
        public virtual void HasRightP(string funcNo)
        {
        }
    }

    /// <summary>
    /// 用于Web应用程序的用户信息
    /// </summary>
    [Serializable]
    public class WebUserInfo : UserInfo
    {
        /// <summary>
        /// 实现同一个账户在某一时刻只能有一个登录
        /// </summary>
        public static bool OnlyOneOnline = false;

        /// <summary>
        /// 存放在会话中的关键字
        /// </summary>
        public const string SESSION_KEY = "CurrentUser";

        private string _globalID;

        /// <summary>
        /// 实现同一个账户在某一时刻只能有一个登录,后登陆者会踢掉前面的登录
        /// </summary>
        /// <returns></returns>
        public void SetGlobalID()
        {
            _globalID = Guid.NewGuid().ToString();
            HttpContext.Current.Application[this.UserNo] = _globalID;
        }

        private string GetGlobalID()
        {
            if (HttpContext.Current.Application[this.UserNo].ToString() == _globalID)
            {
                return _globalID;
            }
            else
            {
                return _globalID;
            }
        }

        /// <summary>
        /// 全局ID, 为实现同一个账户在某一时刻只能有一个登录,后登陆者会踢掉前面的登录
        /// </summary>
        public string GlobalID
        {
            get
            {
                return GetGlobalID();
            }
        }

        /// <summary>
        /// 判断是否已经登录
        /// </summary>
        /// <returns></returns>
        public static bool IsLogin()
        {
            try
            {
                if (HttpContext.Current.Session["CurrentUser"] == null)
                {
                    return false;
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static void Relogin()
        {
            Relogin("");
        }

        private static void Relogin(string message)
        {
            System.Web.HttpResponse FResponse = System.Web.HttpContext.Current.Response;
            FResponse.Clear();
            System.Web.HttpContext.Current.Session.Abandon();
            string AppPath = System.Web.HttpContext.Current.Request.ApplicationPath;
            if (AppPath[AppPath.Length - 1] == '/')
                AppPath = AppPath.Substring(0, AppPath.Length - 1);
            if (WebUserInfo.LoginPage == null || WebUserInfo.LoginPage == string.Empty)
            {
                FResponse.Redirect(AppPath + "/Layout/BaseLayout/Login.aspx?Message=" + message, true);  //.Write("window.top.location.href = '" + AppPath + "/Login.aspx';</script>");2009-09-28 注释，因为用脚本的方式重定向，会导致ajax的出错
            }
            else
            {
                FResponse.Write("<script>");
                if (message != "")
                    FResponse.Write("alert('" + message.ToJsString() + "');");
                if (WebUserInfo.LoginPage.StartsWith("http://", System.StringComparison.OrdinalIgnoreCase) || WebUserInfo.LoginPage.StartsWith("https://", System.StringComparison.OrdinalIgnoreCase))
                {
                    FResponse.Redirect(WebUserInfo.LoginPage, true);
                }
                else
                {
                    FResponse.Redirect(AppPath + "/" + WebUserInfo.LoginPage + "?Message=" + message, true); //"window.top.location.href = '" + LoginPage + "';</script>");2009-09-28 注释，因为用脚本的方式重定向，会导致ajax的出错
                }
            }
            FResponse.End();
        }

        private static WebUserInfo GetCurrentUser_Inner()
        {
            System.Web.SessionState.HttpSessionState Session;
            Session = System.Web.HttpContext.Current.Session;
            System.Web.HttpResponse FResponse = System.Web.HttpContext.Current.Response;
            if (Session[SESSION_KEY] == null)
            {
                Relogin("尚未登录或者会话已超时");
                return null;
            }
            else
            {
                WebUserInfo currentUser = (WebUserInfo)(Session[SESSION_KEY]);

                //return currentUser; // 2013-03-21
                if (System.Web.HttpContext.Current.Application[currentUser.UserNo] != null)
                {
                    if (System.Web.HttpContext.Current.Application[currentUser.UserNo].ToString() == currentUser._globalID)
                    {
                        return currentUser;
                    }
                    else
                    {
                        if (OnlyOneOnline)
                        {
                            Relogin("当前账号已经在别处登录！");
                            return null;
                        }
                        else
                        {
                            return currentUser;
                        }
                    }
                }
                else
                {
                    return currentUser;
                }
            }
        }

        /// <summary>
        /// 获取当前的用户信息
        /// </summary>
        public new static WebUserInfo GetCurrentUser()
        {
            return GetCurrentUser_Inner();
        }

        /// <summary>
        /// 登陆页面，相对于本Web程序的根目录的相对路径，或者绝对路径
        /// 如果是相对于Web程序的根目录的相对路径，请在字符串开始位置不要加"/";
        /// 如果是绝对路径，请加上http:// 或者https://
        /// </summary>
        public static string LoginPage
        {
            get;
            set;
        }

        /// <summary>
        /// 判断是否有权限
        /// </summary>
        /// <param name="funcNo">权限点编号</param>
        public override void HasRightP(string funcNo)
        {
            bool flag = this.HasRight(funcNo);
            System.Web.HttpResponse FResponse = System.Web.HttpContext.Current.Response;
            if (flag)
            {
                FResponse.Clear();
                FResponse.Write("<script>alert('您无权操作本界面!');window.history.go(-1);</script>");
            }
        }

        /// <summary>
        /// 实现换肤的需要
        /// 样式的URL
        /// 2009-10-21
        /// </summary>
        public string CSS_DIR
        {
            get;
            set;
        }

        /// <summary>
        /// 实现换肤的需要
        /// 样式的名称（不是具体的文件名称）
        /// </summary>
        public string CSS_Name
        {
            get;
            set;
        }
    }
}