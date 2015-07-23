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
      /// <summary>
      /// 所有用户名单
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic Get_AllUserInfo(int start, int limit, string strOrderBy, dynamic data)
      {

          string strSql = @" SELECT UserCode, UserName, UserPassword, DepartCode, PositionCode,
                        PositionDesc, Rolelist, CreateTime, CreateUserNo, LastUpdateTime,
                      UpdateUserNo, UserEmail, UserPhone, IsUse, TentNo, DepartName, PositionName  FROM ViewAllUser where 1=1  ";

          if (data != null)
          {
              if (data.UserCode != null && data.UserCode != "")
              {
                  strSql += string.Format(@" and UserCode like '%{0}%'", data.UserCode);
              }
              if (data.UserName != null && data.UserName != "")
              {
                  strSql += string.Format(@" and UserName like '%{0}%'", data.UserName);
              }
              if (data.DepartName != null && data.DepartName != "")
              {
                  strSql += string.Format(@" and DepartName like '%{0}%'", data.DepartName);
              }
          }
          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.UserCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 更新,type 为空，不修改密码。 type=‘1’，重置密码为123456,修改与重置共用方法
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Update(SysUser_Entity entity, string type)
      {
          string returnValue = "";
          try
          {
              if (string.IsNullOrEmpty(type))
              {
                  entity.LastUpdateTime = DateTime.Now;
                  entity.UpdateUserNo = HttpContext.Current.Session["UserCode"].ToString();
                  PublicRule.Update(entity);
                  returnValue = "true";
              }
              else
              {
                  string strPwd = Tools.MD5.Lower32("123456");
                  string sql = @" UPDATE SysUser SET UserPassword='" + strPwd + "' where  UserCode='"+entity.UserCode+"' ";
                  if(DBUtil.ExecuteNonQuery(sql)>0)
                  {
                      returnValue = "true";
                  }                 
              }
          }
          catch (Exception ex)
          {

              returnValue = ex.ToString();

          }
          finally
          {

          }
          return returnValue;
      }

      /// <summary>
      /// 新增
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Insert(SysUser_Entity entity)
      {
          string returnValue = "";
          try
          {
              string sql = @" SELECT COUNT(1) FROM SysUser WHERE UserCode='"+entity.UserCode+"' ";
              if(DBUtil.Fill(sql).Rows.Count>0)
              {
                  return "exist";
              }
              else
              {
                  entity.UserPassword = Tools.MD5.Lower32("123456");
                  entity.CreateTime = DateTime.Now;
                  entity.CreateUserNo = HttpContext.Current.Session["UserCode"].ToString();
                  entity.IsUse = "1";
                  entity.Rolelist = "";
                  if (PublicRule.Insert(entity) > 0)
                  {
                      returnValue = "true";
                  }
              }         
          }
          catch (Exception ex)
          {
              returnValue = "出错信息：" + ex.ToString();
          }
          return returnValue;

      } 





      public dynamic Get_UserInfo(int start, int limit, string strOrderBy, dynamic data)
      {
          string UserCode = HttpContext.Current.Session["UserCode"].ToString();
          string strSql = @" SELECT UserCode,UserName,UserPassword,UserEmail,UserPhone FROM SysUser WHERE UserCode= '"+UserCode+"'";
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
