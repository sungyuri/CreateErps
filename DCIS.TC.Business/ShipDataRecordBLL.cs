using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using DCIS.Persistence;
using TCEPORT.TC.Data;
using TCEPORT.TC.Business.Common;
using DCIS.DbAccess;
using System.Reflection;
using System.Web;

namespace TCEPORT.TC.Business
{
    /// <summary>
    /// 船舶备案
    /// </summary>
  public class ShipDataRecordBLL
    {
      /// <summary>
      /// 分页获取
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
      {
          string strSql = @" SELECT A.*,B.Key_Text as NATIONALITY_TEXT,C.KEY_TEXT AS VESSELSORT_TEXT,
                        D.KEY_TEXT AS LINETYPE_TEXT,E.KEY_TEXT AS COMMUNICATIONTYPE_TEXT,
                        F.KEY_TEXT AS CONTROLTYPE_TEXT,G.KEY_TEXT AS HAILINGPORT_TEXT
                        FROM TRAN_SHIP_FILING A
                        LEFT JOIN tran_key B ON A.NATIONALITY=B.KEY_VALUE AND B.KEY_TYPE='Nationality'
                        LEFT JOIN tran_key C ON A.VESSELSORT=C.KEY_VALUE AND C.KEY_TYPE='ShipType'
                        LEFT JOIN tran_key D ON A.LINETYPE=D.KEY_VALUE AND D.KEY_TYPE='EnterpriseProperty'
                        LEFT JOIN tran_key E ON A.COMMUNICATIONTYPE=E.KEY_VALUE AND E.KEY_TYPE='CommunicationMode'
                        LEFT JOIN tran_key F ON A.CONTROLTYPE=F.KEY_VALUE AND F.KEY_TYPE='ControlType'
                        LEFT JOIN tran_port_code G ON A.HAILINGPORT=G.KEY_VALUE   WHERE 1=1  ";
          if(data!=null)
          {
              if (data.SHIP_NAME != null && data.SHIP_NAME != "")
              {
                  strSql += string.Format(@" and A.VESSELNAMEEN like '%{0}%'", data.SHIP_NAME);
              }

              if (data.SHIP_NAME_CN != null && data.SHIP_NAME_CN != "")
              {
                  strSql += string.Format(@" and A.VESSELNAMECN like '%{0}%'", data.SHIP_NAME_CN);
              }

              if (data.SHIP_NO != null && data.SHIP_NO != "")
              {
                  strSql += string.Format(@" and A.SHIP_NO like '%{0}%'", data.SHIP_NO);
              }
              if (data.IMO != null && data.IMO != "")
              {
                  strSql += string.Format(@" and A.IMO like '%{0}%'", data.IMO);
              }
          }
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 更新
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Update(TRAN_SHIP_FILINGEntity entity,string type)
      {
          try
          {
              DBUtil.BeginTrans();
              entity.R_STATUE = type;
              PublicRule.Update(entity);
              if (type.Equals("1"))
              {
                  //SqlHelper sh = new SqlHelper();
                  // sh.copyEntity(entity, entityNew);
                  TRAN_SHIP_FILING_BAKEntity entityNew = new TRAN_SHIP_FILING_BAKEntity();
                  entityNew.SHIP_NO = entity.SHIP_NO;
                  entityNew.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityNew.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityNew.SENDID = "AA27799084400";
                  entityNew.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityNew.FLAG = "0";
                  PublicRule.Insert(entityNew);                  
              }
              DBUtil.Commit();
          }
          catch (Exception)
          {
              DBUtil.Rollback();
              entity.SHIP_NO = "";
          }
          return entity.SHIP_NO;
      }

      /// <summary>
      /// 新增
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Insert(TRAN_SHIP_FILINGEntity entity,string type)
      {
          string returnValue = "";
          try
          {
              DBUtil.BeginTrans();
              entity.SHIP_NO = Guid.NewGuid().ToString();
              entity.R_STATUE = type;

              if (PublicRule.Insert(entity) > 0)
              {
                  returnValue = "true";
              }
            
              if (type.Equals("1"))
              {
                  TRAN_SHIP_FILING_BAKEntity entityNew = new TRAN_SHIP_FILING_BAKEntity();
                  entityNew.SHIP_NO = entity.SHIP_NO;
                  entityNew.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityNew.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityNew.SENDID = "AA27799084400";
                  entityNew.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityNew.FLAG = "0";
                 // PublicRule.Insert(entityNew);    
                  if (PublicRule.Insert(entityNew) > 0)
                  {
                      returnValue = "true";
                  }
              }
              if (returnValue == "true")
              {
                  DBUtil.Commit();
              }
          }

          catch (Exception ex)
          {
              returnValue = "出错信息：" + ex.ToString();
              DBUtil.Rollback();
          }
          return returnValue;

      }


      /// <summary>
      /// 删除
      /// </summary>
      /// <param name="clienId"></param>
      /// <returns></returns>
      public void Delete(string strID)
      {
          string sql = string.Format(@"delete from TRAN_SHIP_FILING where SHIP_NO in({0})", strID);
          DBUtil.Fill(sql);
      }



    }
}
