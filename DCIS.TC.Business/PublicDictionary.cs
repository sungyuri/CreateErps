using System;
using System.Data;
using System.Diagnostics;
using System.Dynamic;
using DCIS.Persistence;
using TCEPORT.TC.Business.Common;
using System.Web;


namespace TCEPORT.TC.Business
{
   public class PublicDictionary
    {

       public dynamic GetComboData(int start, int limit, string strOrderBy, dynamic data)
       {
           string type = HttpContext.Current.Request.QueryString["type"].ToString();
           string strSql = " ";
           if (type.Equals("PortCode"))
           {
               strSql = @" select KEY_VALUE,KEY_TEXT,KEY_TEXT_EN from TRAN_PORT_CODE  where 1=1  ";
               if (data != null)
               {
                   if (data.name != null && data.name != "")
                   {
                       strSql += string.Format(@" and  KEY_VALUE like '%{0}%' OR KEY_TEXT like '%{0}%' OR KEY_TEXT_EN like '%{0}%' ", data.name);
                   }
               }
               strSql += string.Format(@" and key_type like '{0}'", type);
               strSql += @"  ORDER BY key_order ";
           }
           else
           {
               //SELECT A.KEY_VALUE,A.KEY_TEXT,A.KEY_TEXT_EN FROM (SELECT KEY_VALUE,KEY_TEXT,KEY_TEXT_EN  FROM TRAN_KEY  WHERE KEY_TYPE LIKE 'Nationality' AND DEL_FLAG='0') A  WHERE 1=1 
               strSql = string.Format(@" SELECT A.KEY_VALUE,A.KEY_TEXT,A.KEY_TEXT_EN FROM (SELECT KEY_VALUE,KEY_TEXT,KEY_TEXT_EN  FROM TRAN_KEY  WHERE KEY_TYPE LIKE '{0}' AND DEL_FLAG='0' ORDER BY key_order) A  WHERE 1=1  ", type);
               if (data != null)
               {
                   if (data.name != null && data.name != "")
                   {
                       strSql += string.Format(@" and A.KEY_VALUE like '%{0}%'  OR A.KEY_TEXT like '%{0}%'  OR A.KEY_TEXT_EN like '%{0}%' ", data.name);
                   }
               }
           }
         

           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }
       /// <summary>
       /// 仓库
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetWarehouseType(int start, int limit, dynamic data)
       {
           string strSql = "SELECT * FROM SysWarehouseType where 1=1 ";
           if (data != null)
           {   
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and  WarehouseName like '%{0}%' ", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.WarehouseCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 货物类型
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetGoodsType(int start, int limit, dynamic data)
       {
           string strSql = "SELECT * FROM SysGoodsType where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and GoodsTypeName like '%{0}%'  ", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.GoodsTypeCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }


       /// <summary>
       /// 区域
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetSysArea(int start, int limit, dynamic data)
       {
           //AreaCode, AreaName
           string strSql = "SELECT * FROM SysArea where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and AreaName like '%{0}%' ", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.AreaCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 职位
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetSysPosition(int start, int limit, dynamic data)
       {
           //PositionCode, PositionName
           string strSql = "SELECT * FROM SysPosition where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and PositionName like '%{0}%' ", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.PositionCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 部门
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetSysDepart(int start, int limit, dynamic data)
       {
           //DepartCode, DepartName
           string strSql = "SELECT * FROM SysDepart where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and DepartName like '%{0}%' ", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.DepartCode asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 用户
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetViewUser(int start, int limit, dynamic data)
       {
           //UserCode, UserName, PositionName, DepartName, PositionDesc
           string strSql = " SELECT * FROM ViewUser where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and (UserCode like '%{0}%' OR UserName like '%{0}%' OR DepartName like '%{0}%')", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.DepartName asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 货物
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetSysGoods(int start, int limit, dynamic data)
       {
           
           string strSql = " SELECT GoodsCode, GoodsVersion, GoodsNo, GoodsName, GoodsCount, GoodsUnit, Manufacturer  FROM SysGoods  where 1=1 ";
           if (data != null)
           {
               if (data.name != null && data.name != "")
                   strSql += string.Format(@" and (GoodsVersion like '%{0}%' OR GoodsNo like '%{0}%' OR GoodsName like '%{0}%' OR Manufacturer like '%{0}%')", data.name.Value.Trim());

           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.Manufacturer asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }


       public void backMethod()
       {
           //
       }

    }
}
