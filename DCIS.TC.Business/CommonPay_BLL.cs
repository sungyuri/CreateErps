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
   public class CommonPay_BLL
    {
       /// <summary>
       /// 获取付款项目清单
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetCommonPayItemList(int start, int limit, string strOrderBy, dynamic data)
       {
           string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
           string strSql = @" SELECT [CommonPayNo]
                                      ,[ReceiveName]
                                      ,[PayReason]
                                      ,[TotalAmount]
                                      ,[PaidAmount]
                                      ,[BANK]
                                      ,[BANKNO]
                                      ,[Remarks]
                                      ,[CreateUserCode]
                                      ,[CreateUserName]
                                      ,[IsPayoff]
                                      ,[CreateTime]
                                      ,[LastUpdateTime]
                                  FROM [CreateErp].[dbo].[SysCommonPayItem]
                                  WHERE CreateUserCode='"+loginUserCode+"'  ";

           if (data != null)
           {
               if (data.ReceiveName != null && data.ReceiveName != "")
               {
                   strSql += string.Format(@" and ReceiveName like '%{0}%'", data.ReceiveName);
               }
           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.CommonPayNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 获取其他付款单列表
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetCommonPayInfo(int start, int limit, string strOrderBy, dynamic data)
       {
           string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
           string strSql = "";
           if (data != null)
           {
                   strSql = @" SELECT  '' AS [BillNo]
                                      ,'' AS [CreateDate]
                                      ,[CommonPayNo]
                                      ,[ReceiveName]
                                      ,[PayReason]
                                      ,[TotalAmount]
                                      ,0 AS [PayAmount]
                                      ,'' AS [PayAmountBig]
                                      ,[PaidAmount]
                                      ,[BANK]
                                      ,[BANKNO]
                                      ,[Remarks]
                                      ,CreateUserCode AS [PayUserCode]
                                      ,CreateUserName AS [PayUserName]
                                      ,0 AS [StepNo]
                                      ,'' AS [StepName]
                                      ,'' AS [AppUserCode]
                                      ,'' AS [AppUserName]
                                      ,'N' AS [IsPayoff]
                                      ,'N' AS [IsAppEnd]
                                  FROM  SysCommonPayItem

                                  WHERE 1=1  ";
                   if (data.CommonPayNo != null && data.CommonPayNo != "")
                   {
                       strSql += string.Format(@" and CommonPayNo={0}  ", data.CommonPayNo);
                   }
           }
           else
           {
               strSql = @" SELECT [BillNo]
                                  ,[CreateDate]
                                  ,[CommonPayNo]
                                  ,[ReceiveName]
                                  ,[PayReason]
                                  ,[TotalAmount]
                                  ,[PayAmount]
                                  ,[PayAmountBig]
                                  ,[PaidAmount]
                                  ,[BANK]
                                  ,[BANKNO]
                                  ,[Remarks]
                                  ,[PayUserCode]
                                  ,[PayUserName]
                                  ,[StepNo]
                                  ,[StepName]
                                  ,[AppUserCode]
                                  ,[AppUserName]
                                  ,[IsPayoff]
                                  ,[IsAppEnd]
                              FROM [CreateErp].[dbo].[SysCommonPay]
                                  WHERE PayUserCode='" + loginUserCode + "' AND  StepNo=0 ";
           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 新增付款项目
       /// </summary>
       /// <param name="entity"></param>
       /// <returns></returns>
       public string InsertCommonPayItemInfo(SysCommonPayItem_Entity entity)
       {
           string returnValue = "";
           string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
           string loginUserName = HttpContext.Current.Session["UserName"].ToString();
           try
           {
               string sqlStr = string.Format(@" INSERT INTO [CreateErp].[dbo].[SysCommonPayItem]
                                                   ([ReceiveName]
                                                   ,[PayReason]
                                                   ,[TotalAmount]
                                                   ,[PaidAmount]
                                                   ,[BANK]
                                                   ,[BANKNO]
                                                   ,[Remarks]
                                                   ,[CreateUserCode]
                                                   ,[CreateUserName])
             VALUES('{0}','{1}',{2},{3},'{4}','{5}','{6}','{7}','{8}') ", entity.ReceiveName, entity.PayReason, entity.TotalAmount,
                         entity.PaidAmount, entity.BANK, entity.BANKNO, entity.Remarks, loginUserCode, loginUserName);

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
       /// 新增其他付款单
       /// </summary>
       /// <param name="entity"></param>
       /// <param name="type"></param>
       /// <returns></returns>
       public string InsertCommonPayInfo(SysCommonPay_Entity entity, string type)
       {
           string returnValue = "";
           try
           {
               DBUtil.BeginTrans();
               string billNo = new SqlHelper().getTableNo("SysCommonPay", "BillNo", "OP");
               entity.BillNo = billNo;

               #region 生成付款单审批步骤
               string flowQuery = @" SELECT [FlowId]
                                          ,[StepNo]
                                          ,[StepName]
                                          ,[DepartCode]
                                          ,[PositionCode]
                                          ,[ApproveType]
                                          ,[Remarks]
                                          ,[FlowCdode]
                                          ,[FlowName]
                                          ,[UserCode]
                                          ,[UserName]
                                      FROM [CreateErp].[dbo].[ViewPurchasePayApproval]
                                      WHERE  FlowCdode='OP' ORDER BY StepNo ";
               DataTable flowDt = DBUtil.Fill(flowQuery);
               string flowStep = @"   INSERT INTO  SysFlowStep
                                       (BillNo, StepNo, StepName, FlowId, AppUserCode,AppUserName)
                                       VALUES
                                        ";

               string strAppUserCode = "";
               string strAppUserName = "";
               string strAppUserCode1 = "";//第一步骤审核人
               string strAppUserName1 = "";//第一步骤审核人
               string strAppStepName1 = "";//第一步骤名
               for (int j = 0; j < flowDt.Rows.Count; j++)
               {
                   if (flowDt.Rows[j]["DepartCode"].ToString() == "-1")
                   {
                       string strdeptCode = HttpContext.Current.Session["DepartCode"].ToString();
                       string strSqlQueryCurren = @"     SELECT UserCode,UserName FROM SysUser WHERE DepartCode=" + strdeptCode + " AND PositionCode=" + flowDt.Rows[j]["PositionCode"].ToString() + " ";
                       DataTable dtInfo = DBUtil.Fill(strSqlQueryCurren);
                       if (dtInfo.Rows.Count > 0)
                       {
                           strAppUserCode = dtInfo.Rows[0]["UserCode"].ToString();
                           strAppUserName = dtInfo.Rows[0]["UserName"].ToString();
                           if (flowDt.Rows[j]["StepNo"].ToString() == "1")
                           {
                               strAppUserCode1 = strAppUserCode;
                               strAppUserName1 = strAppUserName;
                               strAppStepName1 = flowDt.Rows[j]["StepName"].ToString();
                           }
                       }
                   }
                   else
                   {
                       strAppUserCode = flowDt.Rows[j]["UserCode"].ToString();
                       strAppUserName = flowDt.Rows[j]["UserName"].ToString();
                       if (flowDt.Rows[j]["StepNo"].ToString() == "1")
                       {
                           strAppUserCode1 = strAppUserCode;
                           strAppUserName1 = strAppUserName;
                           strAppStepName1 = flowDt.Rows[j]["StepName"].ToString();
                       }
                   }
                   flowStep += string.Format(@"  ('{0}',{1},'{2}',{3},'{4}','{5}'),  ", billNo, flowDt.Rows[j]["StepNo"].ToString(),
                                                 flowDt.Rows[j]["StepName"].ToString(), flowDt.Rows[j]["FlowId"].ToString(),
                                               strAppUserCode, strAppUserName);
               }
               flowStep = flowStep.Trim().TrimEnd(',');
               if (DBUtil.ExecuteNonQuery(flowStep) > 0)
               {
                   returnValue = "true";
               }
               else
               {
                   DBUtil.Rollback();
                   return "false";
               }
               #endregion

               entity.PayUserCode = HttpContext.Current.Session["UserCode"].ToString();
               entity.PayUserName = HttpContext.Current.Session["UserName"].ToString();
               if (type == "save")
               {
                   entity.StepNo = 0;
                   entity.StepName = "制单";
                   entity.AppUserCode = "";
                   entity.AppUserName = "";
               }
               else
               {
                   entity.StepNo = 1;
                   entity.StepName = strAppStepName1;
                   entity.AppUserCode = strAppUserCode1;
                   entity.AppUserName = strAppUserName1;
               }
               entity.IsAppEnd = "N";
               entity.IsPayoff = "N";
               if (PublicRule.Insert(entity) > 0)
               {
                   returnValue = "true";
               }
               else
               {
                   DBUtil.Rollback();
                   return "false";
               }
               if (returnValue == "true")
               {
                   DBUtil.Commit();
               }
               else
               {
                   DBUtil.Rollback();
               }

           }
           catch (Exception ex)
           {
               // returnValue = "出错信息：" + ex.ToString();
               returnValue = "出错信息：" + ex.ToString();
               DBUtil.Rollback();
           }
           return returnValue;
       }

       /// <summary>
       /// 其他付款单修改
       /// </summary>
       /// <param name="entity"></param>
       /// <param name="type"></param>
       /// <returns></returns>
       public string UpdateCommonPayInfo(SysCommonPay_Entity entity, string type)
       {
           string returnValue = "";
           try
           {
               DBUtil.BeginTrans();

               string billNo = entity.BillNo;
               if (type == "save")
               {
                   entity.StepNo = 0;
                   entity.StepName = "制单";
                   entity.AppUserCode = "";
                   entity.AppUserName = "";
               }
               else
               {
                   string flowStep = @" SELECT  StepName,AppUserCode,AppUserName   FROM SysFlowStep WHERE BillNo='" + billNo + "' AND StepNo=1  ";
                   DataTable flowDt = DBUtil.Fill(flowStep);
                   entity.StepNo = 1;
                   entity.AppUserCode = flowDt.Rows[0]["AppUserCode"].ToString();
                   entity.StepName = "初审";

                   entity.StepNo = 1;
                   entity.StepName = flowDt.Rows[0]["StepName"].ToString();
                   entity.AppUserCode = flowDt.Rows[0]["AppUserCode"].ToString();
                   entity.AppUserName = flowDt.Rows[0]["AppUserName"].ToString();
               }

               entity.PayUserCode = HttpContext.Current.Session["UserCode"].ToString();
               entity.PayUserName = HttpContext.Current.Session["UserName"].ToString();
               entity.IsAppEnd = "N";
               entity.IsPayoff = "N";
               PublicRule.Update(entity);
               DBUtil.Commit();
               returnValue = "true";
           }
           catch (Exception ex)
           {
               // returnValue = "出错信息：" + ex.ToString();
               returnValue = "出错信息：" + ex.ToString();
               DBUtil.Rollback();
           }
           return returnValue;
       }



    }
}
