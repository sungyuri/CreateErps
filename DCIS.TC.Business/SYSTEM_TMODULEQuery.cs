using System;
using System.Collections.Generic;
using System.Data;
using DCIS.Persistence;
using Newtonsoft.Json.Linq;
using System.Web;
using System.Configuration;
using System.Text;
using System.Data.OracleClient;
using System.ComponentModel;
using System.Collections;
using Microsoft.Win32;

namespace TCEPORT.TC.Business
{
    public class SYSTEM_TMODULEQuery
    {

        /// <summary>
        /// 根据权限ID获取菜单
        /// </summary>
        /// <returns></returns>
        public DataTable GetAllMenus(string type)
        {
            string TokenVal = Convert.ToString(HttpContext.Current.Session["Token"]);
            string XmlStr = "";
            string SysFlag = "";
            string rolelist = "";
            string WSUrl = System.Web.Configuration.WebConfigurationManager.AppSettings["WSUrl"].ToString(); //单点登录地址
            if(type.Equals("HDPT"))
            {
                type = "APP_SGY";
            }
            SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings[type].ToString(); //系统标识
            string BackUrl = WSUrl + HttpContext.Current.Request.Url.AbsoluteUri;

            if (type.Equals("transport"))
            {
                #region 交通工具菜单

                HttpContext.Current.Session["Token"] = TokenVal;
                HttpContext.Current.Session["SysFlag"] = SysFlag;
                if (System.Web.HttpContext.Current.Session["rolelist"] != null)
                {
                    rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
                    string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t where id in ({0}) and m_isshow=1 and M_TARGET='cust' and m_level='{1}' or fsuperid='0' order by forderindex ", rolelist, type);
                    DataTable dt = DBUtil.Fill(strSql);

                    return dt;
                }
                else
                {
                    //rolelist = rolelist = "1206,120601";
                    string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where m_isshow=1 and M_TARGET='cust'  order by forderindex");//a start with fsuperid=1200 connect by prior  id=fsuperid order by forderindex ";
                    DataTable dt = DBUtil.Fill(strSql);

                    return dt;
                } 
                #endregion
            }
            else if (type.Equals("TGSB"))
            {
                #region 通关申报菜单
                HttpContext.Current.Session["Token"] = TokenVal;
                HttpContext.Current.Session["SysFlag"] = SysFlag;
                if (System.Web.HttpContext.Current.Session["rolelist"] != null)
                {
                    rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
                    string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t where id in ({0}) and m_isshow=1 and M_TARGET='tgsb' and m_level='{1}' or fsuperid='0' order by forderindex ", rolelist, type);
                    DataTable dt = DBUtil.Fill(strSql);

                    return dt;
                }
                else
                {
                    //rolelist = rolelist = "1206,120601";
                    string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where m_isshow=1  and M_TARGET='tgsb'   order by forderindex");
                    DataTable dt = DBUtil.Fill(strSql);

                    return dt;
                } 
                #endregion
            }
            else if (type.Equals("APP_SGY"))
            {
                #region 三个一菜单
                HttpContext.Current.Session["Token"] = TokenVal;
                HttpContext.Current.Session["SysFlag"] = SysFlag;
                cn.com.tceport.www.TokenService SsoService = new cn.com.tceport.www.TokenService();

                #region 获取单点登录XML
                try
                {
                    XmlStr = SsoService.GetToken(TokenVal, SysFlag);
                    if (string.IsNullOrEmpty(XmlStr)) //如果为空，则重定向到单点登录页面
                    {
                       // HttpContext.Current.Response.Redirect(@"../../Logout.aspx");
                        HttpContext.Current.Session.Clear();
                        if (!string.IsNullOrEmpty(TokenVal))
                        {
                            SsoService.ClearToken(TokenVal.Trim());
                        }
                        HttpContext.Current.Response.Redirect(BackUrl.Substring(0, BackUrl.IndexOf("api")) + "Default.aspx");

                    }
                }
                catch (Exception ex)
                {
                    HttpContext.Current.Session.Clear();
                    if (!string.IsNullOrEmpty(TokenVal))
                    {
                        SsoService.ClearToken(TokenVal.Trim());
                    }
                    HttpContext.Current.Response.Redirect(BackUrl.Substring(0, BackUrl.IndexOf("api")) + "Default.aspx");

                }
                System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                xmldoc.Load(new System.IO.MemoryStream(System.Text.Encoding.GetEncoding("utf-8").GetBytes(XmlStr)));
                System.Xml.XmlNodeReader reader = new System.Xml.XmlNodeReader(xmldoc);
                System.Data.DataSet ds = new System.Data.DataSet();
                ds.ReadXml(reader);
                reader.Close();
                #endregion

                if (ds.Tables.Count > 0)
                {

                    #region 设置session
                    //获取xml中的信息，保存到Session中
                    HttpContext.Current.Session["UserID"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                    HttpContext.Current.Session["UserName"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                    HttpContext.Current.Session["RealName"] = Common.Users.REALNAME = ds.Tables["BASE_USERS"].Rows[0]["NAME"].ToString();
                    HttpContext.Current.Session["CompanyName"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_NAME_SHORT"].ToString();  //企业简称
                    HttpContext.Current.Session["CMP_GUID"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_GUID"].ToString();   
                    HttpContext.Current.Session["EPORTID"] = TCEPORT.TC.Business.Common.Users.CMP_GUID = ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString();//企业ID
                    HttpContext.Current.Session["Token"] = TokenVal;
                    HttpContext.Current.Session["SysFlag"] = SysFlag;
                    HttpContext.Current.Session["XML"] = XmlStr;
                    HttpContext.Current.Session["surl"] = "NOAU" + "," + "";
                    #endregion


                    #region 构造menudatatable
                    DataTable dt = new DataTable();
                    DataColumn dc1 = new DataColumn();
                    dc1.ColumnName = "ID";
                    dc1.DataType = typeof(string);

                    DataColumn dc2 = new DataColumn();
                    dc2.ColumnName = "FMAINALIAS";
                    dc2.DataType = typeof(string);

                    DataColumn dc3 = new DataColumn();
                    dc3.ColumnName = "FSUPERID";
                    dc3.DataType = typeof(string);

                    DataColumn dc4 = new DataColumn();
                    dc4.ColumnName = "M_LINK";
                    dc4.DataType = typeof(string);

                    DataColumn dc5 = new DataColumn();
                    dc5.ColumnName = "M_ICON";
                    dc5.DataType = typeof(string);

                    DataColumn dc6 = new DataColumn();
                    dc6.ColumnName = "M_SHOWINDEX";
                    dc6.DataType = typeof(string);

                    dt.Columns.Add(dc1);
                    dt.Columns.Add(dc2);
                    dt.Columns.Add(dc3);
                    dt.Columns.Add(dc4);
                    dt.Columns.Add(dc5);
                    dt.Columns.Add(dc6);
                    #endregion

                    DataRow dr;
                    string strAPPF = "urlF" + SysFlag;
                    string strAPPB = "urlB" + SysFlag;
                    string urlF = System.Web.Configuration.WebConfigurationManager.AppSettings[strAPPF].ToString();
                    string urlB = System.Web.Configuration.WebConfigurationManager.AppSettings[strAPPB].ToString();

                    if (ds.Tables.Count > 2)
                    {
                        foreach (System.Data.DataRow row in ds.Tables[2].Rows)
                        {
                            rolelist += row["M_URL"].ToString() + ",";
                        }
                       rolelist= rolelist.TrimEnd(new char[] { ',' });

                        Random num = new Random();
                        //select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t where id in ({0}) and m_isshow=1 and M_TARGET='cust' and m_level='{1}' or fsuperid='0' order by forderindex
                        string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t 
                        where id in ({0}) and m_isshow=1 and m_level='4' or fsuperid='0' order by forderindex ", rolelist);

                        DataTable newdt = oracleDB(strSql, "ora8Cargo");


                        #region 生成菜单datatable
                        foreach (System.Data.DataRow row in newdt.Rows)
                        {
                            dr = dt.NewRow();
                            dr[0] = row["ID"].ToString();
                            dr[1] = row["FMAINALIAS"].ToString();
                            dr[2] = row["FSUPERID"].ToString();
                            if (string.IsNullOrEmpty(row["M_LINK"].ToString()))
                            {
                                dr[3] = "";
                            }
                            else
                            {
                                string[] linkArr = row["M_LINK"].ToString().Split('.');
                                dr[3] = urlF + linkArr[2].ToString() + ".aspx"+ @"?Token=" + TokenVal;;
                            }
                            int a = num.Next(1, 43);
                            string png = a.ToString() + @".png";
                            dr[4] = png;
                            dr[5] = "";
                            dt.Rows.Add(dr);
                            HttpContext.Current.Session["surl"] = dr[3] + "," + urlF;
                        }
                        #endregion
                        return dt;
                    }
                    else
                    {
                        return null;
                    }

                }
                else
                {
                    return null;
                }



                #endregion
            }
            else
            {            
                if (type.Equals("first"))
                {
                    XmlStr = HttpContext.Current.Session["XML"].ToString();
                }
                else
                {
                    #region 获取单点登录返回XML
                    cn.com.tceport.www.TokenService SsoService = new cn.com.tceport.www.TokenService();
                    try
                    {
                        XmlStr = SsoService.GetToken(TokenVal, SysFlag);
                        if (string.IsNullOrEmpty(XmlStr)) //如果为空，则重定向到单点登录页面
                        {
                            HttpContext.Current.Session.Clear();
                            if (!string.IsNullOrEmpty(TokenVal))
                            {
                                SsoService.ClearToken(TokenVal.Trim());
                            }
                            HttpContext.Current.Response.Redirect(BackUrl.Substring(0, BackUrl.IndexOf("api")) + "Default.aspx");
                        }
                    }
                    catch (Exception ex)
                    {
                        HttpContext.Current.Session.Clear();
                        if (!string.IsNullOrEmpty(TokenVal))
                        {
                            SsoService.ClearToken(TokenVal.Trim());
                        }
                        HttpContext.Current.Response.Redirect(BackUrl.Substring(0, BackUrl.IndexOf("api")) + "Default.aspx");
                    } 
                    #endregion
                }
                System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                xmldoc.Load(new System.IO.MemoryStream(System.Text.Encoding.GetEncoding("utf-8").GetBytes(XmlStr)));
                System.Xml.XmlNodeReader reader = new System.Xml.XmlNodeReader(xmldoc);
                System.Data.DataSet ds = new System.Data.DataSet();
                ds.ReadXml(reader);
                reader.Close();
                if (ds.Tables.Count > 0)
                {
                    if (type.Equals("first"))
                    {

                    }
                    else
                    {
                        #region 设置session
                        //获取xml中的信息，保存到Session中
                        HttpContext.Current.Session["UserID"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                        HttpContext.Current.Session["UserGuid"] = ds.Tables["BASE_USERS"].Rows[0]["USER_GUID"].ToString();
                        HttpContext.Current.Session["UserName"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                        HttpContext.Current.Session["RealName"] = Common.Users.REALNAME = ds.Tables["BASE_USERS"].Rows[0]["NAME"].ToString();
                        //  HttpContext.Current.Session["DeptName"] = ds.Tables["BASE_USERS"].Rows[0]["DEPT_NAME"].ToString();
                         HttpContext.Current.Session["CMP_GUID"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_GUID"].ToString();       //企业GUID
                        HttpContext.Current.Session["CompanyName"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_NAME_SHORT"].ToString();  //企业简称
                        //  HttpContext.Current.Session["CompanyFullName"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_NAME_FULL"].ToString();
                        //   HttpContext.Current.Session["EPORT_CODE"] = ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString().Length >= 4 ? ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString().Substring(0, 4) : "";
                        //  HttpContext.Current.Session["ID_NO"] = ds.Tables["BASE_USERS"].Rows[0]["IDCARD_NO"].ToString();
                          HttpContext.Current.Session["EPORTID"] = TCEPORT.TC.Business.Common.Users.CMP_GUID = ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString();//企业ID
                        //  HttpContext.Current.Session["DeptID"] = ds.Tables["BASE_USERS"].Rows[0]["DEPT_GUID"].ToString();
                        HttpContext.Current.Session["Token"] = TokenVal;
                        HttpContext.Current.Session["SysFlag"] = SysFlag;
                        HttpContext.Current.Session["XML"] = XmlStr;
                        HttpContext.Current.Session["surl"] = "NOAU" + "," + ""; 
                        #endregion

                    }

                    #region 构造menudatatable
                    DataTable dt = new DataTable();
                    DataColumn dc1 = new DataColumn();
                    dc1.ColumnName = "ID";
                    dc1.DataType = typeof(string);

                    DataColumn dc2 = new DataColumn();
                    dc2.ColumnName = "FMAINALIAS";
                    dc2.DataType = typeof(string);

                    DataColumn dc3 = new DataColumn();
                    dc3.ColumnName = "FSUPERID";
                    dc3.DataType = typeof(string);

                    DataColumn dc4 = new DataColumn();
                    dc4.ColumnName = "M_LINK";
                    dc4.DataType = typeof(string);

                    DataColumn dc5 = new DataColumn();
                    dc5.ColumnName = "M_ICON";
                    dc5.DataType = typeof(string);

                    DataColumn dc6 = new DataColumn();
                    dc6.ColumnName = "M_SHOWINDEX";
                    dc6.DataType = typeof(string);

                    dt.Columns.Add(dc1);
                    dt.Columns.Add(dc2);
                    dt.Columns.Add(dc3);
                    dt.Columns.Add(dc4);
                    dt.Columns.Add(dc5);
                    dt.Columns.Add(dc6);
                    #endregion

                    DataRow dr;
                    string strAPPF = "urlF" + SysFlag;
                    string strAPPB = "urlB" + SysFlag;
                    string urlF = System.Web.Configuration.WebConfigurationManager.AppSettings[strAPPF].ToString();
                    string urlB = System.Web.Configuration.WebConfigurationManager.AppSettings[strAPPB].ToString();

                    if (ds.Tables.Count > 2)
                    {
                        Random num = new Random();
                        DataView dv = ds.Tables["MY_MODULE"].DefaultView;
                        dv.Sort = "ORDER_NUM ASC";
                        DataTable newdt = dv.ToTable();

                        #region 生成菜单datatable
                        foreach (System.Data.DataRow row in newdt.Rows)
                        {
                            dr = dt.NewRow();
                            dr[0] = row["M_CODE"].ToString();
                            dr[1] = row["M_NAME"].ToString();
                            int ilen = row["M_CODE"].ToString().Length;
                            if (ilen > 4)
                            {
                                dr[2] = row["M_CODE"].ToString().Substring(0, ilen - 4);
                            }
                            else
                            {
                                dr[2] = "0";
                            }
                            if (string.IsNullOrEmpty(row["M_URL"].ToString()))
                            {
                                dr[3] = "";
                            }
                            else
                            {
                                if (urlB.Equals("tokenAndrl"))
                                {
                                    string url = row["M_URL"].ToString();
                                    // url = url.Substring(url.IndexOf('/'));
                                    dr[3] = urlF + @"/slogin?Token=" + TokenVal + @"&surl=" + url;
                                }
                                if (urlB.Equals("tokennew"))
                                {
                                    string url = row["M_URL"].ToString();
                                    url = url.Substring(url.IndexOf('/'));
                                    dr[3] = urlF + url + @"?Token=" + TokenVal;
                                }
                                if (urlB.Equals("userid"))
                                {
                                    dr[3] = urlF + row["M_URL"].ToString() + urlB;
                                }
                                if (urlB.Equals(""))
                                {
                                    dr[3] = urlF + row["M_URL"].ToString();
                                    //  dr[3] = HttpContext.Current.Session["SysFlag"].ToString();
                                }

                            }
                            int a = num.Next(1, 43);
                            string png = a.ToString() + @".png";
                            dr[4] = png;
                            dr[5] = "";
                            dt.Rows.Add(dr);
                            HttpContext.Current.Session["surl"] = dr[3] + "," + urlF;
                        } 
                        #endregion

                        return dt;
                    }
                    else
                    {
                        return null;
                    }
                   
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// 获取cookie菜单值
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public string getIdarr(dynamic type)
        {
            string idarr = "";
            string SysFlag = HttpContext.Current.Session["SysFlag"].ToString();
            HttpCookie cookie = HttpContext.Current.Request.Cookies[SysFlag];
            if (cookie != null)
            {
                if (cookie["IdArray"].ToString() != "")
                {
                    //string[] array = cookie["IdArray"].ToString().Split(',');
                    idarr = cookie["IdArray"].ToString();
                    //  idarr= ToArrayString(array);

                }
            }
            return idarr;
        }

        public string ToArrayString(string[] array)
        {
            StringBuilder jsonString = new StringBuilder();
            jsonString.Append("[");
            foreach (string item in array)
            {
                jsonString.Append("\"" + item + "\"" + ",");
            }

            jsonString.Remove(jsonString.Length - 1, 1);
            jsonString.Append("]");

            return jsonString.ToString();

        }

        /// <summary>
        /// 获取桌面菜单
        /// </summary>
        public DataTable SelectAllChild(dynamic data)
        {
            string type = data.type;
            DataTable dt = new DataTable();
            if (type.Equals("save"))
            {
                type = HttpContext.Current.Session["SysFlag"].ToString();
            }
            dt = GetAllMenus(type);
            if(dt==null)
            {
                return null;
            }
            DataTable dtNew = dt.Clone();
            if(type.Equals("HDPT"))
            {
                type = "APP_SGY";
            }
            string SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings[type].ToString();
            HttpCookie cookie = HttpContext.Current.Request.Cookies[SysFlag];
            if (cookie != null)
            {
                if (cookie["IdArray"].ToString() != "")
                {
                    string[] array = cookie["IdArray"].ToString().Split(',');
                    DataRow[] drArr = dt.Select("M_LINK<>''");
                    for (int i = 0; i < drArr.Length; i++)
                    {
                        foreach (string item in array)
                        {
                            if (item.Equals(drArr[i]["ID"].ToString()))
                            {
                                dtNew.ImportRow(drArr[i]);
                                break;
                            }
                        }

                    }
                }
            }
            else
            {
                cookie = new HttpCookie(SysFlag);
                cookie.Values.Set("IdArray", "");
                cookie.Expires = System.DateTime.Now.AddYears(100);
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
            DataRow dr = dtNew.NewRow();
            dr[0] = "-1";
            dr[1] = "添加菜单";
            dr[2] = "-1";
            dr[3] = "more.more";
            dr[4] = "more.png";
            dr[5] = "";
            dtNew.Rows.Add(dr);

            return dtNew;
        }


        /// <summary>
        ///  获取窗口菜单
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public DataTable GetWindowMenus(string type)
        {
            string strXml = "";
            string rolelist = "";
            if (HttpContext.Current.Session["XML"] != null)
            {
                System.Data.DataSet ds = new System.Data.DataSet();
                string SysFlag = HttpContext.Current.Session["SysFlag"].ToString();
                if (SysFlag.Equals("transport"))
                {
                  
                    if (System.Web.HttpContext.Current.Session["rolelist"] != null)
                    {
                        rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
                        string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t where id in ({0}) and m_isshow=1 or fsuperid='0' order by forderindex ", rolelist);
                        DataTable MY_MODULE = DBUtil.Fill(strSql);
                        MY_MODULE.TableName = "MY_MODULE";
                        ds.Tables.Add(MY_MODULE);
                    }
                    else
                    {
                        //rolelist = rolelist = "1206,120601";
                        string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where m_isshow=1 and M_TARGET='cust'  order by forderindex");
                        DataTable MY_MODULE = DBUtil.Fill(strSql);
                        MY_MODULE.TableName = "MY_MODULE";
                        ds.Tables.Add(MY_MODULE);
                    }
                }
                else if (SysFlag.Equals("TGSB"))
                {
                    string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where m_isshow=1  and M_TARGET='tgsb'   order by forderindex");
                    DataTable MY_MODULE = DBUtil.Fill(strSql);
                    MY_MODULE.TableName = "MY_MODULE";
                    ds.Tables.Add(MY_MODULE);
                 }
                else
                {
                    strXml = HttpContext.Current.Session["XML"].ToString();
                    System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                    xmldoc.Load(new System.IO.MemoryStream(System.Text.Encoding.GetEncoding("utf-8").GetBytes(strXml)));
                    System.Xml.XmlNodeReader reader = new System.Xml.XmlNodeReader(xmldoc);
                    ds.ReadXml(reader);
                    reader.Close();
                    if(SysFlag.Equals("HDPT")&&ds.Tables.Count>2)
                    {
                        foreach (System.Data.DataRow row in ds.Tables[2].Rows)
                        {
                            rolelist += row["M_URL"].ToString() + ",";
                        }
                        rolelist = rolelist.TrimEnd(new char[] { ',' });

                        string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from system_tmodule t 
                        where id in ({0}) and m_isshow=1 and m_level='4' or fsuperid='0' order by forderindex ", rolelist);

                        DataTable nedt = oracleDB(strSql, "ora8Cargo");
                        DataTable MY_MODULE = new DataTable();
                        MY_MODULE = nedt.Copy();
                        ds.Tables[2].TableName="OLD_MY_MODULE";
                        MY_MODULE.TableName = "MY_MODULE";
                        ds.Tables.Add(MY_MODULE);                        
                    }
                }
                if (ds.Tables.Count > 0)
                {

                    DataTable dt = new DataTable();
                    DataColumn dc1 = new DataColumn();
                    dc1.ColumnName = "ID";
                    dc1.DataType = typeof(string);

                    DataColumn dc2 = new DataColumn();
                    dc2.ColumnName = "FMAINALIAS";
                    dc2.DataType = typeof(string);

                    DataColumn dc3 = new DataColumn();
                    dc3.ColumnName = "FSUPERID";
                    dc3.DataType = typeof(string);

                    DataColumn dc4 = new DataColumn();
                    dc4.ColumnName = "CHECK";
                    dc4.DataType = typeof(string);

                    DataColumn dc5 = new DataColumn();
                    dc5.ColumnName = "M_ICON";
                    dc5.DataType = typeof(string);

                    DataColumn dc6 = new DataColumn();
                    dc6.ColumnName = "M_SHOWINDEX";
                    dc6.DataType = typeof(string);

                    dt.Columns.Add(dc1);
                    dt.Columns.Add(dc2);
                    dt.Columns.Add(dc3);
                    dt.Columns.Add(dc4);
                    dt.Columns.Add(dc5);
                    dt.Columns.Add(dc6);

                    DataRow dr;


                    if (ds.Tables.Count > 2 || ds.Tables["MY_MODULE"]!=null)
                    {
                        Random num = new Random();
                        HttpCookie cookie = HttpContext.Current.Request.Cookies[SysFlag];
                        if (cookie == null)
                        {
                            cookie = new HttpCookie(SysFlag);
                            cookie.Values.Set("IdArray", "");
                            cookie.Expires = System.DateTime.Now.AddYears(100);
                            HttpContext.Current.Response.Cookies.Add(cookie);
                        }


                        foreach (System.Data.DataRow row in ds.Tables["MY_MODULE"].Rows)
                        {
                            if (SysFlag.Equals("transport") || SysFlag.Equals("TGSB"))
                            {
                                //ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX
                                dr = dt.NewRow();
                                dr[0] = row["ID"].ToString();
                                dr[1] = row["FMAINALIAS"].ToString();
                                int ilen = row["ID"].ToString().Length;
                                if (ilen > 4)
                                {
                                    dr[2] = row["ID"].ToString().Substring(0, ilen - 4);
                                }
                                else
                                {
                                    dr[2] = "0";
                                }
                                if (cookie["IdArray"].ToString() != "")
                                {
                                    string[] array = cookie["IdArray"].ToString().Split(',');
                                    foreach (string item in array)
                                    {
                                        if (item.Equals(row["ID"].ToString()))
                                        {
                                            dr[3] = "true";
                                            break;
                                        }
                                    }
                                }
                                int a = num.Next(1, 43);
                                string png = a.ToString() + @".png";
                                dr[4] = png;
                                dr[5] = "";
                                dt.Rows.Add(dr);
                            }
                            else if (SysFlag.Equals("HDPT"))
                            {
                                dr = dt.NewRow();
                                dr[0] = row["ID"].ToString();
                                dr[1] = row["FMAINALIAS"].ToString();
                                dr[2] = row["FSUPERID"].ToString();
                                if (cookie["IdArray"].ToString() != "")
                                {
                                    string[] array = cookie["IdArray"].ToString().Split(',');
                                    foreach (string item in array)
                                    {
                                        if (item.Equals(row["ID"].ToString()))
                                        {
                                            dr[3] = "true";
                                            break;
                                        }
                                    }
                                }
                                int a = num.Next(1, 43);
                                string png = a.ToString() + @".png";
                                dr[4] = png;
                                dr[5] = "";
                                dt.Rows.Add(dr);

                            }
                            else
                            {
                                dr = dt.NewRow();
                                dr[0] = row["M_CODE"].ToString();
                                dr[1] = row["M_NAME"].ToString();
                                int ilen = row["M_CODE"].ToString().Length;
                                if (ilen > 4)
                                {
                                    dr[2] = row["M_CODE"].ToString().Substring(0, ilen - 4);
                                }
                                else
                                {
                                    dr[2] = "0";
                                }
                                if (cookie["IdArray"].ToString() != "")
                                {
                                    string[] array = cookie["IdArray"].ToString().Split(',');
                                    foreach (string item in array)
                                    {
                                        if (item.Equals(row["M_CODE"].ToString()))
                                        {
                                            dr[3] = "true";
                                            break;
                                        }
                                    }
                                }
                                int a = num.Next(1, 43);
                                string png = a.ToString() + @".png";
                                dr[4] = png;
                                dr[5] = "";
                                dt.Rows.Add(dr);
                            }

                        }
                    }
                    return dt;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }

        public string saveCookie(dynamic type)
        {
            string str = "";
            string strIds = "";
            if (type.Count > 0)
            {
                for (int i = 0; i < type.Count; i++)
                {
                    string strid = type[i];
                    // strid=strid.Replace("{","").Replace("}","");
                    if (strid != "")
                    {
                        strIds += strid + ",";
                    }
                }
                strIds = strIds.Remove(strIds.Length - 1);
            }

            if (HttpContext.Current.Session["SysFlag"] != null)
            {
                string SysFlag = HttpContext.Current.Session["SysFlag"].ToString();
                str = SysFlag;
                HttpCookie cookie = HttpContext.Current.Request.Cookies[SysFlag];
                if (cookie == null)
                {
                    cookie = new HttpCookie(SysFlag);
                    cookie.Values.Set("IdArray", strIds);
                    cookie.Expires = System.DateTime.Now.AddYears(100);
                    HttpContext.Current.Response.Cookies.Add(cookie);
                }
                else
                {
                    cookie["IdArray"] = strIds;
                    cookie.Expires = System.DateTime.Now.AddYears(100);
                    HttpContext.Current.Response.SetCookie(cookie);
                }
            }
            return str;
        }

        public string Get_CurrentRight(string type)
        {
            //if (string.IsNullOrEmpty(type))
            //    type = "1";
            string temp = "0";

            DataTable dt;
            string rolelist = "";

            if (System.Web.HttpContext.Current.Session["rolelist"] != null)
            {
                rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
                string strSql = string.Format(@"select * from system_tmodule t where id in ({0}) and m_isshow=1 and m_level='{1}' order by forderindex ", rolelist, type);
                dt = DBUtil.Fill(strSql);
            }
            else
            {
                //rolelist = rolelist = "1206,120601";
                string strSql = string.Format(@"select * from system_tmodule where m_isshow=1 and m_level='{0}' order by forderindex", type);
                dt = DBUtil.Fill(strSql);
            }
            if (dt.Rows.Count > 0)
            {
                temp = "1";
            }
            return temp;

        }

        public DataTable oracleDB(string sql,string strCS)
        {
            DataSet ds = new DataSet();
            //定义连接数据库的字符串
            string constring = System.Configuration.ConfigurationManager.ConnectionStrings[strCS].ToString();
            //进行连接
            System.Data.OracleClient.OracleConnection conn = new OracleConnection(constring);
            OracleDataAdapter ad = new OracleDataAdapter(sql, conn);
            try
            {
                ad.Fill(ds);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                string ss = ex.ToString();
                return null;
            }
            finally
            {
                conn.Close();//关闭打开的连接
            }

        }

        public string getToken()
        {
            //HttpContext.Current.Request.Browser
            return HttpContext.Current.Session["Token"].ToString() + "," + HttpContext.Current.Session["surl"].ToString();
        }

        public string getSysFlag()
        {
            //HttpContext.Current.Request.Browser
            return HttpContext.Current.Session["SysFlag"].ToString() ;
        }


    }

}