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

namespace TCEPORT.TC.Business
{
  public  class ShipInPreDataRecord_BLL
    {
      /// <summary>
      /// 进港预报
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
      {
          //预报未申报列表状态0 ：草稿 1：已申报 ，2：确报
          //泊位代码关联需要添加
          string strSql = @" SELECT A.*,B.Key_Text as DEPARTURE_PORT_CODE_TEXT,
                                C.KEY_TEXT AS ARRIVAL_PORT_CODE_TEXT
                                FROM TRAN_IN_FORECAST A
                                LEFT JOIN tran_port_code B ON A.DEPARTURE_PORT_CODE=B.KEY_VALUE 
                                LEFT JOIN tran_port_code C ON A.ARRIVAL_PORT_CODE=C.KEY_VALUE

                                WHERE A.R_STATUE='0'  ";
          if (data != null)
          {
              if (data.IMO != null && data.IMO != "")
              {
                  strSql += string.Format(@" and A.IMO like '%{0}%'", data.SHIP_NAME);
              }

              if (data.SHIP_NAME != null && data.SHIP_NAME != "")
              {
                  strSql += string.Format(@" and A.SHIP_NAME like '%{0}%'  ", data.SHIP_NAME_CN);
              }

              if (data.SHIP_NO != null && data.SHIP_NO != "")
              {
                  strSql += string.Format(@" and A.SHIP_NO like '%{0}%'", data.SHIP_NO);
              }
              if (data.dateFrom != null && data.dateTo != "")
              {
                  strSql += string.Format(@" and A.DECLARATION_DATE between '%{0}%' and '%{1}%' ", data.dateFrom, data.dateTo);
              }
          }
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

    /// <summary>
    /// 获取预申报船舶信息
    /// </summary>
    /// <param name="start"></param>
    /// <param name="limit"></param>
    /// <param name="strOrderBy"></param>
    /// <param name="data"></param>
    /// <returns></returns>
      public dynamic GetPreShip(int start, int limit, string strOrderBy, dynamic data)
      {
          string strSql = @"SELECT A.SHIP_NO,A.VESSELNAMEEN AS SHIP_NAME,A.IMO,A.VESSELNAMECN 
                            FROM TRAN_SHIP_FILING A 
                            WHERE 1=1  AND 
                            A.SHIP_NO NOT IN
                            (SELECT SHIP_NO FROM TRAN_SCHEDULE_INFO WHERE SHIP_STATUE IN('0','1','2','3','4') ) ";
          if (data != null)
          {
              if (data.SHIP_NAME != null && data.SHIP_NAME != "")//英文名
              {
                  strSql += string.Format(@" and A.VESSELNAMEEN like '%{0}%'", data.SHIP_NAME);
              }

              if (data.VESSELNAMECN != null && data.VESSELNAMECN != "")
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
      public string Update(TRAN_IN_FORECASTEntity entity, string type)   
      {
          entity.R_STATUE = type;
          try
          {
              DBUtil.BeginTrans();
              PublicRule.Update(entity);
              if (type.Equals("1"))
              {
                  TRAN_SCHEDULE_INFOEntity scientity = new TRAN_SCHEDULE_INFOEntity();
                  scientity.SCHEDULE_ID = entity.SCHEDULE_ID;
                  scientity.SHIP_NAME = entity.SHIP_NAME;
                  scientity.SHIP_NO = entity.SHIP_NO;
                  scientity.IMO = entity.IMO;
                  scientity.BERTH_CODE = entity.BERTH_CODE;
                  scientity.SHIP_STATUE = "1";
                  PublicRule.Update(scientity);

                  TRAN_IN_FORECAST_BAKEntity entityBak = new TRAN_IN_FORECAST_BAKEntity();
                  entityBak.SCHEDULE_ID = entity.SCHEDULE_ID;
                  entityBak.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityBak.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityBak.SENDID = "AA27799084400";
                  entityBak.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityBak.FLAG = "0";

                  PublicRule.Insert(entityBak);    
              }
              DBUtil.Commit();
          }
          catch (Exception ex)
          {

              DBUtil.Rollback();
              entity.SCHEDULE_ID = "";
          }
          finally
          {

          }
         
       
          return entity.SCHEDULE_ID;
      }


      /// <summary>
      /// 新增
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Insert(TRAN_IN_FORECASTEntity entity,string type)
      {
          string returnValue = "";
          try
          {

              entity.R_STATUE = type;
              string[] getNo = getTableNo(entity.SHIP_NO);
              entity.SCHEDULE_ID = getNo[0];
              DBUtil.BeginTrans();

              if (getNo[1].Equals("yes"))
              {
                  TRAN_SCHEDULE_INFOEntity scientity = new TRAN_SCHEDULE_INFOEntity();
                  scientity.SCHEDULE_ID = getNo[0];
                  scientity.SHIP_NAME = entity.SHIP_NAME;
                  scientity.SHIP_NO = entity.SHIP_NO;
                  scientity.IMO = entity.IMO;
                  scientity.BERTH_CODE = entity.BERTH_CODE;
                  if(type.Equals("1"))
                  {
                      scientity.SHIP_STATUE = "1";
                  }
                  else
                  {
                      scientity.SHIP_STATUE = "0";
                  }                 
                  PublicRule.Insert(scientity);
              }
              else {
                  TRAN_SCHEDULE_INFOEntity scientity = new TRAN_SCHEDULE_INFOEntity();
                  scientity.SCHEDULE_ID = getNo[0];
                  scientity.SHIP_NAME = entity.SHIP_NAME;
                  scientity.SHIP_NO = entity.SHIP_NO;
                  scientity.IMO = entity.IMO;
                  scientity.BERTH_CODE = entity.BERTH_CODE;
                  if (type.Equals("1"))
                  {
                      scientity.SHIP_STATUE = "1";
                  }
                  else
                  {
                      scientity.SHIP_STATUE = "0";
                  }
                  PublicRule.Update(scientity);
              }
              PublicRule.Insert(entity);
              if(type.Equals("1"))
              {

                  TRAN_IN_FORECAST_BAKEntity entityBak = new TRAN_IN_FORECAST_BAKEntity();
                  entityBak.SCHEDULE_ID = entity.SCHEDULE_ID;
                  entityBak.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityBak.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityBak.SENDID = "AA27799084400";
                  entityBak.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityBak.FLAG = "0";

                  PublicRule.Insert(entityBak);
              }
                
              DBUtil.Commit();
              returnValue = "true";
          }
          catch (Exception ex)
          {
              DBUtil.Rollback();
              returnValue = "出错信息：" + ex.ToString();
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
          try
          {
              DBUtil.BeginTrans();
              string selSCid = string.Format(@"SELECT SCHEDULE_ID FROM TRAN_IN_FORECAST WHERE SCHEDULE_ID IN({0}) ", strID);
              DataTable dt = DBUtil.Fill(selSCid);
              if (dt.Rows.Count > 0)
              {
                  string scid = dt.Rows[0][0].ToString();
                  string sql = string.Format(@"delete from TRAN_IN_FORECAST where SCHEDULE_ID in({0})", strID);
                  DBUtil.ExecuteNonQuery(sql);
                  string delSC = string.Format(@"delete from TRAN_SCHEDULE_INFO where SCHEDULE_ID in('{0}')", scid);
                  DBUtil.ExecuteNonQuery(delSC);
                  DBUtil.Commit();
              }


          }
          catch (Exception ex)
          {

              DBUtil.Rollback();
          }
      }

      public string[] getTableNo(string SHIP_NO)
      {
          string[] reStr = new string[2];
          string tbNo = "";
          string strSql = " SELECT SCHEDULE_ID FROM  TRAN_SCHEDULE_INFO  WHERE SHIP_NO='" + SHIP_NO + "' AND SHIP_STATUE='0' ";
          DataTable dt = DBUtil.Fill(strSql);
          if(dt.Rows.Count>0)
          {
              tbNo = dt.Rows[0][0].ToString();
              reStr[1] = "no";
          }
          else
          {
              reStr[1] = "yes";
              strSql = " SELECT MAX(SCHEDULE_ID) FROM TRAN_SCHEDULE_INFO    ";
              dt = DBUtil.Fill(strSql);
              string strF = "JY"+DateTime.Now.Date.ToString("yyMMdd");
              if (dt.Rows.Count > 0)
              {
                  if (dt.Rows[0][0] == null || dt.Rows[0][0].ToString() == "")
                  {
                      tbNo = "JY" + DateTime.Now.Date.ToString("yyMMdd") + "000001";
                  }
                  else
                  {
                      string maxNo = dt.Rows[0][0].ToString();
                      if (maxNo.Substring(0, 8).Equals(strF))
                      {
                          string strB = maxNo.Substring(8, 6);
                          strB = (int.Parse(strB) + 1).ToString();
                          int ilen = strB.Length;
                          for (int i = 0; i < 6 - ilen; i++)
                          {
                              strB = "0" + strB;
                          }
                          tbNo = strF + strB;
                      }
                      else
                      {
                          tbNo = "JY" + DateTime.Now.Date.ToString("yyMMdd") + "000001";
                      }
                  }
              }
              else
              {
                  tbNo = "JY" + DateTime.Now.Date.ToString("yyMMdd") + "000001";
              }
          }
          reStr[0] = tbNo;
          return reStr;
      }


    }
}
