﻿using System;
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
   public class SaleCustomer_BLL
    {
       public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
       {
           string strSql = @" SELECT  [CustomerNo]
                                      ,[CustomerName]
                                      ,[CPerson]
                                      ,[CPhone]
                                      ,[CTelPhone]
                                      ,[CFAX]
                                      ,[ADRESS]
                                      ,[AreaCode]
                                      ,[AreaName]
                                      ,[Email]
                                      ,[Tariff]
                                      ,[BANK]
                                      ,[BANKNO]
                                      ,[Remarks]
                                  FROM [ViewCustomer]

                                WHERE 1=1  ";
           if (data != null)
           {
               if (data.CustomerName != null && data.CustomerName != "")
               {
                   strSql += string.Format(@" and CustomerName like '%{0}%'", data.CustomerName);
               }

               if (data.AreaName != null && data.AreaName != "")
               {
                   strSql += string.Format(@" and AreaName like '%{0}%'  ", data.AreaName);
               }
           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.CustomerNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
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
       public string Update(SysCustomer_Entity entity)
       {
           try
           {
               PublicRule.Update(entity);
           }
           catch (Exception)
           {
               entity.CustomerNo = -1;
           }
           return entity.CustomerNo.ToString();
       }

       /// <summary>
       /// 新增
       /// </summary>
       /// <param name="entity"></param>
       /// <returns></returns>
       public string Insert(SysCustomer_Entity entity)
       {
           string returnValue = "";
           try
           {
               if (PublicRule.Insert(entity) > 0)
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
           string sql = string.Format(@"delete from SysCustomer where CustomerNo in({0}) )", strID);
           DBUtil.Fill(sql);
       }


    }
}
