using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using DCIS.Persistence;
using TCEPORT.TC.Data;
using TCEPORT.TC.Business.Common;
using DCIS.DbAccess;
using System.Web;
using System.Data.SqlClient;

namespace TCEPORT.TC.Business
{
  public  class UserManage_BLL
    {
      public dynamic Get_UserInfo(int start, int limit, string strOrderBy, dynamic data)
      {
          string UserCode = HttpContext.Current.Session["UserCode"].ToString();
          string strSql = @" SELECT UserCode,UserName,UserPassword,UserEmail,UserPhone FROM SysUser WHERE UserCode= '"+UserCode+"'";
          //int PositionCode = int.Parse(HttpContext.Current.Session["PositionCode"].ToString());
          //if (PositionCode == 1)
          //{
          //    strSql += string.Format(@" and PurUserCode='{0}' ", UserCode);
          //}
          //if (data != null)
          //{
          //    if (data.CustomerName != null && data.CustomerName != "")
          //    {
          //        strSql += string.Format(@" and CustomerName like '%{0}%'", data.CustomerName);
          //    }
          //}
          //strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          //string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }


      public string Update_UserInfo(SysUser_Entity entity)
      {
          string rec = "";
          try
          {
              PublicRule.Update(entity);
              rec = "true";
          }
          catch (Exception)
          {

              rec = "false";
          }
          return rec;
      }

      public string  Update_UserPassword(SysUser_Entity entity,string newPWD)
      {
          int rec = 0;
          string iret="";
          try
          {
              //PublicRule.Update(entity);
              //string valiUser = "select count(1) from SysUser where UserCode='" + HttpContext.Current.Session["UserCode"].ToString() + "' and UserPassword='" + TCEPORT.TC.Tools.MD5.Lower32(entity.UserPassword) + "' ";
              string sql = "update SysUser set UserPassword='" + TCEPORT.TC.Tools.MD5.Lower32(newPWD) + "' where UserCode='" + entity.UserCode + "' and UserPassword='" + TCEPORT.TC.Tools.MD5.Lower32(entity.UserPassword) + "'";
              rec=DBUtil.ExecuteNonQuery(sql);
          }
          catch (Exception)
          {

          }
          if (rec == 1) { return iret = "true"; } else { return iret = "false"; }
      }

    }
}
