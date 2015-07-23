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
   public class PurchaseSupplier_BLL
    {
       /// <summary>
       /// 获取grid列表
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
        public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
        {
            string strSql = @" SELECT [SupplierNo]
                                      ,[SupplierName]
                                      ,[CPerson]
                                      ,[CPhone]
                                      ,[CTelPhone]
                                      ,[CFAX]
                                      ,[ADRESS]
                                      ,[Email]
                                      ,[Tariff]
                                      ,[BANK]
                                      ,[BANKNO]
                                      ,[Remarks]
                                  FROM  [SysSupplier]

                                WHERE 1=1  ";
            if (data != null)
            {
                if (data.SupplierName != null && data.SupplierName != "")
                {
                    strSql += string.Format(@" and SupplierName like '%{0}%'", data.CustomerName);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.SupplierNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public string Update(SysSupplier_Entity entity)
        {
            try
            {
                PublicRule.Update(entity);
            }
            catch (Exception)
            {
                entity.SupplierNo = -1;
            }
            return entity.SupplierNo.ToString();
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public string Insert(SysSupplier_Entity entity)
        {
            string returnValue = "";
            try
            {
                string sqlStr = string.Format(@" INSERT INTO [CreateErp].[dbo].[SysSupplier]
                                               ([SupplierName]
                                               ,[CPerson]
                                               ,[CPhone]
                                               ,[CTelPhone]
                                               ,[CFAX]
                                               ,[ADRESS]
                                               ,[Email]
                                               ,[Tariff]
                                               ,[BANK]
                                               ,[BANKNO]
                                               ,[Remarks])
             VALUES('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}') ", entity.SupplierName, entity.CPerson, entity.CPhone,
                          entity.CTelPhone, entity.CFAX, entity.ADRESS, entity.Email, entity.Tariff, entity.BANK, entity.BANKNO, entity.Remarks);

                if (DBUtil.ExecuteNonQuery(sqlStr) > 0)
                {
                    returnValue = "true";
                }
            }

            catch (Exception ex)
            {
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
            string sql = string.Format(@"delete from SysSupplier where SupplierNo={0} ", strID);
            DBUtil.Fill(sql);
        }


    }
}
