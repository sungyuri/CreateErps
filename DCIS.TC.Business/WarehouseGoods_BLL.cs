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
using System.Web.Script.Serialization;

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
                          FROM  [ViewGoods]
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
      /// 获取维护数据
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
        public dynamic GetGoods(int start, int limit, string strOrderBy, dynamic data)
        {
            string colName = "";
            string tableName = "";
            if (data.selectedItem == "SysGoodsType") { tableName = data.selectedItem; colName = "[GoodsTypeCode] as Code,[GoodsTypeName] as Name"; }
            else if (data.selectedItem == "SysArea") { tableName = data.selectedItem; colName = "[AreaCode] as Code,[AreaName] as Name"; }
            else if (data.selectedItem == "SysDepart") { tableName = data.selectedItem; colName = "[DepartCode] as Code,[DepartName] as Name"; }
            else if (data.selectedItem == "SysPosition") { tableName = data.selectedItem; colName = "[PositionCode] as Code,[PositionName] as Name"; }
            string strSql = @" SELECT "+colName+" FROM  [dbo]."+tableName+"  WHERE 1=1  ";
            if (data != null)
            {
                if (tableName == "SysGoodsType")
                {
                    if (data.Code != null && data.Code != "")
                    {
                        strSql += string.Format(@" and GoodsTypeCode like '%{0}%'", data.Code);
                    }
                    if (data.Name != null && data.Name != "")
                    {
                        strSql += string.Format(@" and GoodsTypeName like '%{0}%'", data.Name);
                    }
                }
                if (tableName == "SysArea")
                {
                    if (data.Code != null && data.Code != "")
                    {
                        strSql += string.Format(@" and AreaCode like '%{0}%'", data.Code);
                    }
                    if (data.Name != null && data.Name != "")
                    {
                        strSql += string.Format(@" and AreaName like '%{0}%'", data.Name);
                    }
                }
                if (tableName == "SysDepart")
                {
                    if (data.Code != null && data.Code != "")
                    {
                        strSql += string.Format(@" and DepartCode like '%{0}%'", data.Code);
                    }
                    if (data.Name != null && data.Name != "")
                    {
                        strSql += string.Format(@" and DepartName like '%{0}%'", data.Name);
                    }
                }
                if (tableName == "SysPosition")
                {
                    if (data.Code != null && data.Code != "")
                    {
                        strSql += string.Format(@" and PositionCode like '%{0}%'", data.Code);
                    }
                    if (data.Name != null && data.Name != "")
                    {
                        strSql += string.Format(@" and PositionName like '%{0}%'", data.Name);
                    }
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

        public string UpdateGoodsType(dynamic entity,string type)
        {
            string returnValue = "";
            string sqlStr = "";
            try
            {
                if (type == "SysGoodsType")
                {
                    sqlStr = string.Format(@" update  [SysGoodsType] set [GoodsTypeName]='"+entity.Name+"' where [GoodsTypeCode]="+entity.Code+" ");
                }
                else if (type == "SysArea")
                {
                    sqlStr = string.Format(@" update  [SysArea] set [AreaName]='" + entity.Name + "' where [AreaCode]=" + entity.Code + " ");
                }
                else if (type == "SysDepart")
                {
                    sqlStr = string.Format(@" update  [SysDepart] set [DepartName]='" + entity.Name + "' where [DepartCode]=" + entity.Code + " ");
                }
                else if (type == "SysPosition")
                {
                    sqlStr = string.Format(@" update  [SysPosition] set [PositionName]='" + entity.Name + "' where [PositionCode]=" + entity.Code + " ");
                }


                if (DBUtil.ExecuteNonQuery(sqlStr) > 0)
                {
                    returnValue = "true";
                }
            }
            catch (Exception ex)
            {

                returnValue = "出错信息：" + ex.Message.ToString();
            }




            return returnValue;

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
                string sqlStr = string.Format(@" INSERT INTO  [SysGoods]
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
        public string InsertGoodsType(dynamic entity,string type)
        {
            string returnValue = "";
            string sqlStr = "";
            try
            {
                if (type == "SysGoodsType")
                {
                    sqlStr = string.Format(@" INSERT INTO [SysGoodsType]
                                               ([GoodsTypeName])
             VALUES('{0}') ", entity.Name);
                }
                else if (type == "SysArea")
                {
                    sqlStr = string.Format(@" INSERT INTO  [SysArea]([AreaName]) VALUES('{0}') ", entity.Name);
                }
                else if (type == "SysDepart")
                {
                    sqlStr = string.Format(@" INSERT INTO  [SysDepart]([DepartName]) VALUES('{0}') ", entity.Name);
                }
                else if (type == "SysPosition")
                {
                    sqlStr = string.Format(@" INSERT INTO  [SysPosition]([PositionName]) VALUES('{0}') ", entity.Name);
                }


                if (DBUtil.ExecuteNonQuery(sqlStr) > 0)
                {
                    returnValue = "true";
                }
            }
            catch (Exception ex)
            {

                returnValue = "出错信息：" + ex.Message.ToString();
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
      /// 删除项目类型
      /// </summary>
      /// <param name="strCode"></param>
      /// <returns></returns>
        public string DeleteGoodsType(string strCode,string type)
        {
            string returnInfo = "";
            string sql = "";
            try
            {
                if (type == "SysGoodsType") { sql = string.Format(@"delete from SysGoodsType where GoodsTypeCode={0}", strCode); }
                else if (type == "SysArea") { sql = string.Format(@"delete from SysArea where AreaCode={0}", strCode); }
                else if (type == "SysDepart") { sql = string.Format(@"delete from SysDepart where DepartCode={0}", strCode); }
                else if (type == "SysPosition") { sql = string.Format(@"delete from SysPosition where PositionCode={0}", strCode); }
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
