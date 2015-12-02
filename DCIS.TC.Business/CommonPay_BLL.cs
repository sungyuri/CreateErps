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
                                  FROM [SysCommonPayItem]
                                  WHERE CreateUserCode='" + loginUserCode + "' AND IsDel='N'  ";

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
                                      ,0 AS [PayWayCode]
                                      ,'' AS [PayWayText]
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
                   else
                   {
                       if (data.ReceiveName != null && data.ReceiveName != "")
                       {
                           strSql = @" SELECT [BillNo]
                                  ,[CreateDate]
                                  ,[CommonPayNo]
                                  ,[ReceiveName]
                                  ,[PayReason]
                                  ,[PayWayCode]
                                  ,[PayWayText]
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
                              FROM [SysCommonPay]
                                  WHERE PayUserCode='" + loginUserCode + "' AND  StepNo=0 ";
                           strSql += string.Format(@" and ReceiveName like '%{0}%'  ", data.ReceiveName);
                       }
                   }                  
           }
           else
           {
               strSql = @" SELECT [BillNo]
                                  ,[CreateDate]
                                  ,[CommonPayNo]
                                  ,[ReceiveName]
                                  ,[PayReason]
                                  ,[PayWayCode]
                                  ,[PayWayText]
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
                              FROM [SysCommonPay]
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
               string sqlStr = string.Format(@" INSERT INTO [SysCommonPayItem]
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
       /// 更新一般付款项目
       /// </summary>
       /// <param name="entity"></param>
       /// <returns></returns>
       public string UpdateCommonPayItemInfo(SysCommonPayItem_Entity entity)
       {
           string returnValue = "";
           string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
           string loginUserName = HttpContext.Current.Session["UserName"].ToString();
           string strSql = " SELECT COUNT(1) FROM dbo.SysCommonPay WHERE CommonPayNo=" + entity.CommonPayNo + " AND StepNo NOT IN(98) ";
           int iChild = int.Parse(DBUtil.Fill(strSql).Rows[0][0].ToString());
           if (iChild > 0)
           {
               returnValue = "no";
               return returnValue;
           }
           try
           {
               PublicRule.Update(entity);
               returnValue = "true";
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
                                      FROM [ViewPurchasePayApproval]
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


       public string DeleteCommonPayItemInfo(string CommonPayNo)
       {
            string strRetun = "";
           string strSql = " SELECT COUNT(1) FROM dbo.SysCommonPay WHERE CommonPayNo=" + CommonPayNo + " AND StepNo NOT IN(98) ";
           int iChild = int.Parse(DBUtil.Fill(strSql).Rows[0][0].ToString());
           if(iChild>0)
           {
               strRetun = "no";
           }
           else
           {
               strSql = " UPDATE dbo.SysCommonPayItem SET IsDel='Y' WHERE CommonPayNo=" + CommonPayNo + "  ";
               if(DBUtil.ExecuteNonQuery(strSql)>0)
               {
                   strRetun = "yes";
               }
           }
           return strRetun;
       }

       /// <summary>
       /// 删除未生效其他付款单
       /// </summary>
       /// <param name="billNo"></param>
       /// <returns></returns>
       public string DeleteCommonPayInfo(string billNo)
       {
           string strRetun = "";
           string strSql = " UPDATE dbo.SysCommonPay SET StepNo=98,StepName='删除' WHERE BillNo='" + billNo + "'  ";
           strRetun = DBUtil.ExecuteNonQuery(strSql).ToString();
           return strRetun;
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
                   if (entity.StepName == "退回")
                   {
                       entity.StepNo = 0;
                       entity.StepName = "退回";
                       entity.AppUserCode = "";
                       entity.AppUserName = "";
                   }
                   else
                   {
                       entity.StepNo = 0;
                       entity.StepName = "制单";
                       entity.AppUserCode = "";
                       entity.AppUserName = "";
                   }
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

       /// <summary>
       /// 其他付款单查询
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetCommonPayQueryInfo(int start, int limit, string strOrderBy, dynamic data)
       {
           string UserCode = HttpContext.Current.Session["UserCode"].ToString();
           string strSql = @" SELECT [BillNo]
                                      ,[CreateDate]
                                      ,[CommonPayNo]
                                      ,[ReceiveName]
                                      ,[PayReason]
                                      ,[PayWayCode]
                                      ,[PayWayText]
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
                                  FROM [SysCommonPay] WHERE 1=1  ";

           CommonFun cf = new CommonFun();
           string isAppUser = cf.isAppUserForPay(UserCode, "OP");
           if (isAppUser=="true")
           {

           }
           else
           {
               strSql += string.Format(@" and PayUserCode IN({0}) ", isAppUser);
           }

           if (data != null)
           {
               if (data.ReceiveName != null && data.ReceiveName != "")
               {
                   strSql += string.Format(@" and ReceiveName like '%{0}%' ", data.ReceiveName);
               }
           }

           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       //审批函数

       /// <summary>
       /// 获取其他付款待审核单据
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetCommonPayAppInfo(int start, int limit, string strOrderBy, dynamic data)
       {
           string UserCode = HttpContext.Current.Session["UserCode"].ToString();
           string strSql = @" SELECT [BillNo]
                                      ,[CreateDate]
                                      ,[CommonPayNo]
                                      ,[ReceiveName]
                                      ,[PayReason]
                                      ,[PayWayCode]
                                      ,[PayWayText]
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
                                  FROM [SysCommonPay] WHERE AppUserCode ='" + UserCode + "' AND IsAppEnd='N' ";

           if (data != null)
           {
               if (data.SupplierName != null && data.SupplierName != "")
               {
                   strSql += string.Format(@" and ReceiveName like '%{0}%' ", data.SupplierName);
               }
           }

           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       /// <summary>
       /// 其他付款审批记录
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <param name="strOrderBy"></param>
       /// <param name="data"></param>
       /// <returns></returns>
       public dynamic GetCommonPayAppLog(int start, int limit, string strOrderBy, dynamic data)
       {
           string strSql = @" SELECT [BillNo]
                                  ,[StepNo]
                                  ,[StepName]
                                  ,[FlowId]
                                  ,[AppUserCode]
                                  ,[AppUserName]
                                  ,[AppStep]
                                  ,[AppState]
                                  ,[AppNote1]
                                  ,[AppNote2]
                                  ,[AppNote3]
                                  ,[AppNote4]
                                  ,[AppNote5]
                                  ,[AppDataFirst]
                                  ,[AppDataLast]
                                  ,[AppPrescription]
                              FROM [SysFlowStep] WHERE 1=1  ";


           if (data != null)
           {
               if (data.BillNo != null && data.BillNo != "")
               {
                   strSql += string.Format(@" and BillNo ='{0}'", data.BillNo);
               }
           }
           strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

      /// <summary>
      /// 更新其他付款审批
      /// </summary>
      /// <param name="billNo"></param>
      /// <param name="stepNo"></param>
      /// <param name="appnote"></param>
      /// <param name="type"></param>
      /// <returns></returns>
       public string UpdateCommonPayAppInfo(string billNo, string stepNo, string appnote, string type)
       {
           string returnValue = "";
           string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
           string updateLogSql = "";
           string updateLogSqlBack = "";
           string updateContractSql = "";
           string updatePurchaseContractSql = "";
           try
           {
               DBUtil.BeginTrans();
               //审批批次
               string strAppStep = DBUtil.Fill(@" SELECT AppStep FROM SysFlowStep WHERE BillNo='" + billNo + "' ").Rows[0][0].ToString();
               string colNoteName = "AppNote" + strAppStep;//审核意见当前存储字段
               if (type == "back")//退回
               {
                   updateLogSql = @" UPDATE SysFlowStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE() WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                   updateLogSqlBack = @" UPDATE SysFlowStep SET AppState='N',AppStep=AppStep+1  WHERE BillNo='" + billNo + "' ";
                   updateContractSql = @" UPDATE SysCommonPay SET StepNo=0,AppUserCode='',CreateDate='',StepName='退回'  WHERE BillNo='" + billNo + "' ";
               }
               else//通过审批
               {
                   string strQueryMaxStepSql = @"  SELECT MAX(StepNo) AS MaxStepNo FROM SysFlowStep WHERE BillNo='" + billNo + "'   ";
                   int MaxStepNo = int.Parse(DBUtil.Fill(strQueryMaxStepSql).Rows[0][0].ToString());
                   int iNowStepNo = int.Parse(stepNo);
                   if (iNowStepNo < MaxStepNo)
                   {
                       DataTable dtAppUser = DBUtil.Fill(@"  SELECT  StepName,AppUserCode,AppUserName   FROM SysFlowStep WHERE BillNo='" + billNo + "' AND StepNo=" + (iNowStepNo + 1).ToString() + "  ");
                       string strAppUser = "";
                       string strStepName = "";
                       string strAppUserName = "";
                       if (dtAppUser.Rows.Count > 0)
                       {
                           strAppUser = dtAppUser.Rows[0]["AppUserCode"].ToString();
                           strStepName = dtAppUser.Rows[0]["StepName"].ToString();
                           strAppUserName = dtAppUser.Rows[0]["AppUserName"].ToString();
                       }
                       updateLogSql = @" UPDATE SysFlowStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y' WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                       updateContractSql = @" UPDATE SysCommonPay SET StepNo=" + (iNowStepNo + 1).ToString() + ",AppUserName='" + strAppUserName + "',AppUserCode='" + strAppUser + "',StepName='" + strStepName + "'  WHERE BillNo='" + billNo + "' ";
                   }
                   else//审定，结束审批流程
                   {
                       updateLogSql = @" UPDATE SysFlowStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y'  WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                       updateContractSql = @" UPDATE SysCommonPay SET AppUserCode='',AppUserName='',IsAppEnd='Y',StepNo=99,StepName='已付款'  WHERE BillNo='" + billNo + "' ";
                       string strSelPCNO = @" SELECT CommonPayNo,TotalAmount,PayAmount,PaidAmount FROM SysCommonPay WHERE BillNo='" + billNo + "'   ";
                       DataTable dtIsPayOver = DBUtil.Fill(strSelPCNO);
                       if (dtIsPayOver.Rows.Count > 0)
                       {
                           string strPurBillNo = dtIsPayOver.Rows[0]["CommonPayNo"].ToString();
                           decimal decTotalAmount = decimal.Parse(dtIsPayOver.Rows[0]["TotalAmount"].ToString());
                           decimal decPayAmount = decimal.Parse(dtIsPayOver.Rows[0]["PayAmount"].ToString());
                           decimal decPaidAmount = decimal.Parse(dtIsPayOver.Rows[0]["PaidAmount"].ToString());
                           if ((decPayAmount + decPaidAmount) >= decTotalAmount)
                           {
                               updatePurchaseContractSql = @" UPDATE SysCommonPayItem SET PaidAmount=PaidAmount+" + decPayAmount.ToString() + ",IsPayoff='Y'  WHERE CommonPayNo='" + strPurBillNo + "'   ";
                           }
                           else
                           {
                               updatePurchaseContractSql = @" UPDATE SysCommonPayItem SET PaidAmount=PaidAmount+" + decPayAmount.ToString() + "  WHERE CommonPayNo='" + strPurBillNo + "'   ";
                           }
                       }
                   }
               }

               //执行SQL
               if (DBUtil.ExecuteNonQuery(updateLogSql) > 0)
               {
                   returnValue = "true";
               }
               else
               {
                   returnValue = "操作失败";
                   DBUtil.Rollback();
                   return returnValue;
               }
               if (updateLogSqlBack != "")
               {
                   if (DBUtil.ExecuteNonQuery(updateLogSqlBack) > 0)
                   {
                       returnValue = "true";
                   }
                   else
                   {
                       returnValue = "操作失败";
                       DBUtil.Rollback();
                       return returnValue;
                   }
               }
               if (DBUtil.ExecuteNonQuery(updateContractSql) > 0)
               {
                   returnValue = "true";
               }
               else
               {
                   returnValue = "操作失败";
                   DBUtil.Rollback();
                   return returnValue;
               }
               //updatePurchaseContractSql
               if (updatePurchaseContractSql != "")
               {
                   if (DBUtil.ExecuteNonQuery(updatePurchaseContractSql) > 0)
                   {
                       returnValue = "true";
                   }
                   else
                   {
                       returnValue = "操作失败";
                       DBUtil.Rollback();
                       return returnValue;
                   }
               }
               if (returnValue == "true")
               {
                   DBUtil.Commit();
               }
           }
           catch (Exception ex)
           {
               DBUtil.Rollback();
               returnValue = "出错信息：" + ex.ToString();
           }

           return returnValue;

       }


    }
}
