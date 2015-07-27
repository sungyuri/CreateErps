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
  public  class WarehouseGoods_BLL
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
            string strSql = @" SELECT 
                               [GoodsCode]
                              ,[GoodsVersion]
                              ,[GoodsNo]
                              ,[GoodsName]
                              ,[GoodsCount]
                              ,[GoodsUnit]
                              ,[Manufacturer]
                              ,[GoodsTypeCode]
                              ,[GoodsTypeName]
                              ,[WarehouseCode]
                              ,[WarehouseName]
                              ,[GoodsNote]
                          FROM [CreateErp].[dbo].[ViewGoods]
                                WHERE 1=1  ";
            if (data != null)
            {
                if (data.GoodsVersion != null && data.GoodsVersion != "")
                {
                    strSql += string.Format(@" and GoodsVersion like '%{0}%'", data.GoodsVersion);
                }
                if (data.GoodsName != null && data.GoodsName != "")
                {
                    strSql += string.Format(@" and GoodsName like '%{0}%'", data.GoodsName);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.GoodsCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }
      /// <summary>
      /// 获取货物类型表数据
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
        public dynamic GetGoods(int start, int limit, string strOrderBy, dynamic data)
        {
            string strSql = @" SELECT 
                              [GoodsTypeCode]
                              ,[GoodsTypeName]
                          FROM [CreateErp].[dbo].[SysGoodsType]
                                WHERE 1=1  ";
            if (data != null)
            {
                if (data.GoodsTypeCode != null && data.GoodsTypeCode != "")
                {
                    strSql += string.Format(@" and GoodsTypeCode like '%{0}%'", data.GoodsTypeCode);
                }
                if (data.GoodsTypeName != null && data.GoodsTypeName != "")
                {
                    strSql += string.Format(@" and GoodsTypeName like '%{0}%'", data.GoodsTypeName);
                }
            }
            //strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.GoodsCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            //string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(strSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public string Update(SysGoods_Entity entity)
        {
            try
            {
                PublicRule.Update(entity);
            }
            catch (Exception)
            {
                entity.GoodsCode = -1;
            }
            return entity.GoodsCode.ToString();
        }

        public string UpdateGoodsType(SysGoodsType_Entity entity)
        {
            try
            {
                PublicRule.Update(entity);
            }
            catch (Exception ex)
            {

                entity.GoodsTypeCode = -1;
            }
            return entity.GoodsTypeCode.ToString();

        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public string Insert(SysGoods_Entity entity)
        {
            string returnValue = "";
            try
            {
                string sqlStr = string.Format(@" INSERT INTO [CreateErp].[dbo].[SysGoods]
                                               ([GoodsVersion]
                                               ,[GoodsNo]
                                               ,[GoodsName]
                                               ,[GoodsCount]
                                               ,[GoodsUnit]
                                               ,[Manufacturer]
                                               ,[GoodsTypeCode]
                                               ,[WarehouseCode]
                                               ,[GoodsNote])
             VALUES('{0}','{1}','{2}',{3},'{4}','{5}',{6},{7},'{8}') ", entity.GoodsVersion, entity.GoodsNo,
                      entity.GoodsName, entity.GoodsCount, entity.GoodsUnit, entity.Manufacturer, entity.GoodsTypeCode,
                      entity.WarehouseCode, entity.GoodsNote);
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
      /// 货物类型新增
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
        public string InsertGoodsType(SysGoodsType_Entity entity)
        {
            string returnValue = "";
            try
            {
                string sqlStr = string.Format(@" INSERT INTO [CreateErp].[dbo].[SysGoodsType]
                                               ([GoodsTypeName])
             VALUES('{0}') ",  entity.GoodsTypeName);
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
        public string Delete(string strID)
        {
            string returnInfo = "";
            try
            {
                string sql = string.Format(@"delete from SysGoods where GoodsCode={0} ", strID);
                DBUtil.Fill(sql);
                returnInfo = "true";
            }
            catch (Exception ex)
            {

                returnInfo = ex.Message.ToString();
            }
            return returnInfo;
        }

      /// <summary>
      /// 删除货物类型
      /// </summary>
      /// <param name="strCode"></param>
      /// <returns></returns>
        public string DeleteGoodsType(string strCode)
        {
            string returnInfo = "";
            try
            {
                string sql = string.Format(@"delete from SysGoodsType where GoodsTypeCode={0}", strCode);
                DBUtil.Fill(sql);
                returnInfo = "true";
            }
            catch (Exception ex)
            {

                returnInfo = ex.Message.ToString();
            }
            return returnInfo;
        }

    }
}
