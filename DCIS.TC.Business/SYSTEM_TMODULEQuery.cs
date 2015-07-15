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
using TCEPORT.TC.Tools;

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
            string rolelist = "";
            string SysFlag = "";
            if (string.IsNullOrEmpty(type))
            {
                type = "first";
            }
            SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings[type].ToString(); //系统标识
            if (System.Web.HttpContext.Current.Session["rolelist"].ToString() != "")
            {
                rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
               // string strSql = string.Format(@"select * from SYSTEM_TMODULE  where id in ({0}) and m_isshow=1 and m_level='{1}' order by forderindex ", rolelist, type);
             //   string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE  where id in ({0}) and m_isshow=1 or fsuperid='0' order by forderindex ", rolelist);
                string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE  where id in ({0}) and M_LEVEL=1  and M_TARGET='{1}' order by forderindex ", rolelist, SysFlag);
                DataTable dt = DBUtil.Fill(strSql);
                return dt;
            }
            else
            {
              //  string strSql = string.Format(@"select * from system_tmodule where m_isshow=1 and m_level='{0}' or fsuperid='0' order by forderindex", type);//a start with fsuperid=1200 connect by prior  id=fsuperid order by forderindex ";
                string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where   M_TARGET='{0}' and M_LEVEL=1  order by forderindex", SysFlag);
                DataTable dt = DBUtil.Fill(strSql);
                return dt;
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
            DataTable dt;
            string SysFlag = "";
            string rolelist = "";
            SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings[type].ToString(); //系统标识
            if (System.Web.HttpContext.Current.Session["rolelist"].ToString() != "")
            {
                rolelist = System.Web.HttpContext.Current.Session["rolelist"].ToString();
                string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE  where id in ({0}) and m_isshow=1 and M_LEVEL=1 and M_TARGET='{1}' order by forderindex ", rolelist, SysFlag);
                dt = DBUtil.Fill(strSql);
            }
            else
            {
                //rolelist = "1206,120601";
                string strSql = string.Format(@"select ID,FMAINALIAS,FSUPERID,M_LINK,M_ICON,M_SHOWINDEX from SYSTEM_TMODULE where m_isshow=1 and M_LEVEL=1 and M_TARGET='{0}'  order by forderindex", SysFlag);
                dt = DBUtil.Fill(strSql);
            }
            foreach (DataRow dr in dt.Rows)
            {
                int count = 0;
                if (dr["ID"].ToString() == "120701")
                {
                    string strSql = "select count(1) from DEC_E_HEAD where ID_CHK='0' AND COMPANYID='" + TCEPORT.TC.Business.Common.Users.CMP_GUID + "'";
                    count = int.Parse(DBUtil.ExecuteScalar(strSql).ToString());
                    if (count > 0)
                        dr["M_SHOWINDEX"] = count;
                }
                if (dr["ID"].ToString() == "120702")
                {
                    string strSql = "select count(1) from DEC_I_HEAD where ID_CHK='0' AND COMPANYID='" + TCEPORT.TC.Business.Common.Users.CMP_GUID + "'";
                    count = int.Parse(DBUtil.ExecuteScalar(strSql).ToString());
                    if (count > 0)
                        dr["M_SHOWINDEX"] = count;
                }

                //入境报检
                if (dr["ID"].ToString() == "121002")
                {
                    string strSql = " select count(1) from DEC_I_DAIBAN where busniesstype='I' AND COMPANYID='" + TCEPORT.TC.Business.Common.Users.CMP_GUID + "'";
                    count = int.Parse(DBUtil.ExecuteScalar(strSql).ToString());
                    if (count > 0)
                        dr["M_SHOWINDEX"] = count;
                }
                //出境报检
                if (dr["ID"].ToString() == "121001")
                {
                    string strSql = " select count(1) from DEC_I_DAIBAN where busniesstype='E' AND COMPANYID='" + TCEPORT.TC.Business.Common.Users.CMP_GUID + "'";
                    count = int.Parse(DBUtil.ExecuteScalar(strSql).ToString());
                    if (count > 0)
                        dr["M_SHOWINDEX"] = count;
                };
            }
            return dt;
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

        public bool IsLoginOK(string Login_Name, string OriPassWord)
        {
            string sql = " SELECT * FROM SysUser WHERE UserCode='" + Login_Name + "' AND UserPassword='" + MD5.Lower32(OriPassWord) + "' AND IsUse='1' ";
            DataTable dt = DBUtil.Fill(sql);
            if(dt.Rows.Count>0)
            {
                //UserCode, UserName, UserPassword, DepartCode, PositionCode, PositionDesc, Uipaddress, Rolelist, CreateTime, CreateUserNo, LastUpdateTime, UpdateUserNo, UserEmail, UserPhone, IsUse, TentNo
                HttpContext.Current.Session["UserCode"] = dt.Rows[0]["UserCode"].ToString();
                HttpContext.Current.Session["UserName"] = dt.Rows[0]["UserName"].ToString();
                HttpContext.Current.Session["DepartCode"] = dt.Rows[0]["DepartCode"].ToString();
                HttpContext.Current.Session["PositionCode"] = dt.Rows[0]["PositionCode"].ToString();
                HttpContext.Current.Session["Rolelist"] = dt.Rows[0]["Rolelist"].ToString();
                HttpContext.Current.Session["UserPhone"] = dt.Rows[0]["UserPhone"].ToString();
                HttpContext.Current.Session["PositionDesc"] = dt.Rows[0]["PositionDesc"].ToString();
                return true;
            }
            else
            {
                return false;
            }
        }

    }

}