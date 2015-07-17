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
    public class SaleContract_BLL
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

    }
}
