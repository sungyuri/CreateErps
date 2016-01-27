using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace TCEPORT.TC.Business.Common
{
    public static class Users  
    {
        private static string _cmp_guid;

        public static string CMP_GUID
        {
            get
            {
                //if (string.IsNullOrEmpty(_cmp_guid))
                //{

                    if (System.Web.HttpContext.Current.Session != null && System.Web.HttpContext.Current.Session["EPORTID"] != null)
                    {
                        _cmp_guid = System.Web.HttpContext.Current.Session["EPORTID"].ToString();
                    }
                    else
                    {
                        //throw new Exception("error my");
                        _cmp_guid = "TCWD111123";//TCWD111123 ZHWL111207 JLZY120216
                    }
                //}
                return _cmp_guid;
            }

            set
            {
                _cmp_guid = value;
            }
        }


        private static string _user_id;

        public static string USER_ID
        {
            get
            {
                //if (string.IsNullOrEmpty(_user_id))
                //{

                    if (System.Web.HttpContext.Current.Session != null && System.Web.HttpContext.Current.Session["UserID"] != null)
                    {
                        _user_id = System.Web.HttpContext.Current.Session["UserID"].ToString();
                    }
                    else
                    {
                        _user_id = "zhangqin";//zhangqin shaye scf
                    }
                //}
                return _user_id;
            }

            set
            {
                _user_id = value;
            }
        }


        private static string _realname;



        /// <summary>
        /// 登录用户
        /// </summary>
        public static string REALNAME
        {
            get
            {
                //if (string.IsNullOrEmpty(_realname))
                //{

                    if (System.Web.HttpContext.Current.Session!=null && System.Web.HttpContext.Current.Session["RealName"] != null)
                    {
                        _realname = System.Web.HttpContext.Current.Session["RealName"].ToString();
                    }
                    else
                    {
                        _realname = "测试人员";
                    }
               // }
                return _realname;
            }

            set
            {
                _realname = value;
            }
        }


        /// <summary>
        /// 企业注册号
        /// </summary>
        private static string _EPORTID;
        public static string EPORTID
        {
            get
            {
                //if (string.IsNullOrEmpty(_EPORTID))
                //{

                    if (System.Web.HttpContext.Current.Session != null && System.Web.HttpContext.Current.Session["EPORTID"] != null)
                    {
                        _EPORTID = System.Web.HttpContext.Current.Session["EPORTID"].ToString();
                    }
                    else
                    {
                        _EPORTID = "TCWD";//TCWD
                    }
                //}
                return _EPORTID;
            }
            set
            {
                _EPORTID = value;
            }
        }

        /// <summary>
        /// 企业全称
        /// </summary>
        private static string _CompanyFullName;
        public static string CompanyFullName
        {
            get
            {
                //if (string.IsNullOrEmpty(_CompanyFullName))
                //{

                    if (System.Web.HttpContext.Current.Session != null && System.Web.HttpContext.Current.Session["CompanyFullName"] != null)
                    {
                        _CompanyFullName = System.Web.HttpContext.Current.Session["CompanyFullName"].ToString();
                    }
                    else
                    {
                        _CompanyFullName = "中国太仓外轮代理有限公司";
                    }
               // }
                return _CompanyFullName;
            }
            set
            {
                _CompanyFullName = value;
            }
        }
    }
}
