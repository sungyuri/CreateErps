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
   public class ShipArriveDataRecord_BLL
    {
       /// <summary>
       /// 抵港报
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
        public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
        {
            string strSql = @"  SELECT A.*,B.Key_Text as DEPARTURE_PORT_CODE_TEXT,
                                C.KEY_TEXT AS ARRIVAL_PORT_CODE_TEXT
                                FROM TRAN_REACHPORT A
                                LEFT JOIN tran_port_code B ON A.DEPARTURE_PORT_CODE=B.KEY_VALUE 
                                LEFT JOIN tran_port_code C ON A.ARRIVAL_PORT_CODE=C.KEY_VALUE

                                WHERE A.R_STATUE='0' ";
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
        /// 获取抵港船舶信息
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="strOrderBy"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public dynamic GetArrShip(int start, int limit, string strOrderBy, dynamic data)
        {
            string strSql = @"SELECT B.SHIP_NO,B.IMO,B.SHIP_NAME,B.ENTER_NUMBER,B.ABROAD_NUMBER,B.ARRIVAL_DATE,
                              B.BERTH_CODE,B.DEPARTURE_PORT_CODE,B.ARRIVAL_PORT_CODE,B.AGENT_CODE,B.CONTEXT_NAME,
                              B.DECLARATION_DATE,B.FREE_TEXT,
                              D.KEY_TEXT AS DEPARTURE_PORT_CODE_TEXT,E.KEY_TEXT AS ARRIVAL_PORT_CODE_TEXT 
                              FROM TRAN_IN_CONFIRM B 
                              INNER JOIN TRAN_SCHEDULE_INFO C  ON  B.SCHEDULE_ID=C.SCHEDULE_ID  
                              AND C.SHIP_STATUE='2' AND B.SCHEDULE_ID  
                              NOT IN(SELECT SCHEDULE_ID FROM TRAN_REACHPORT WHERE R_STATUE='0')
                              LEFT JOIN tran_port_code D ON B.DEPARTURE_PORT_CODE=D.KEY_VALUE 
                              LEFT JOIN tran_port_code E ON B.ARRIVAL_PORT_CODE=E.KEY_VALUE
                              WHERE 1=1    
                              ";
            if (data != null)
            {
                if (data.SHIP_NAME != null && data.SHIP_NAME != "")
                {
                    strSql += string.Format(@" and B.SHIP_NAME like '%{0}%'", data.SHIP_NAME);
                }

                if (data.SHIP_NO != null && data.SHIP_NO != "")
                {
                    strSql += string.Format(@" and B.SHIP_NO like '%{0}%'", data.SHIP_NO);
                }
                if (data.IMO != null && data.IMO != "")
                {
                    strSql += string.Format(@" and B.IMO like '%{0}%'", data.IMO);
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
        public string Update(TRAN_REACHPORTEntity entity, string type)
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
                    scientity.SHIP_STATUE = "3";
                    PublicRule.Update(scientity);

                    TRAN_REACHPORT_BAKEntity entityBak = new TRAN_REACHPORT_BAKEntity();
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
        public string Insert(TRAN_REACHPORTEntity entity,string type)
        {
            string returnValue = "";
            try
            {
                DBUtil.BeginTrans();
                entity.R_STATUE = type;
                string scid = queryScNo(entity.SHIP_NO);
                entity.SCHEDULE_ID = scid;
                if (PublicRule.Insert(entity) > 0)
                {
                    returnValue = "true";
                }
                if (type.Equals("1"))
                {
                    TRAN_SCHEDULE_INFOEntity scientity = new TRAN_SCHEDULE_INFOEntity();
                    scientity.SCHEDULE_ID = entity.SCHEDULE_ID;
                    scientity.SHIP_NAME = entity.SHIP_NAME;
                    scientity.SHIP_NO = entity.SHIP_NO;
                    scientity.IMO = entity.IMO;
                    scientity.BERTH_CODE = entity.BERTH_CODE;
                    scientity.SHIP_STATUE = "3";
                    PublicRule.Update(scientity);

                    TRAN_REACHPORT_BAKEntity entityBak = new TRAN_REACHPORT_BAKEntity();
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
            string sql = string.Format(@"delete from TRAN_REACHPORT where SCHEDULE_ID in({0})", strID);
            DBUtil.Fill(sql);
        }

        public string queryScNo(string ship_no)
        {
            string tbNo = "";
            string strSql = " SELECT SCHEDULE_ID FROM  TRAN_SCHEDULE_INFO  WHERE SHIP_NO='" + ship_no + "' AND SHIP_STATUE='2' ";
            DataTable dt = DBUtil.Fill(strSql);
            if (dt.Rows.Count > 0)
            {
                tbNo = dt.Rows[0][0].ToString();
            }
            return tbNo;
        }

    }
}
