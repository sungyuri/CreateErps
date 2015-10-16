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
  public  class PurchasePay_BLL
    {
      /// <summary>
      /// 获取审批成功采购合同
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchaseContractDone(int start, int limit, string strOrderBy, dynamic data)
      {

          string strSql = @" SELECT * FROM SysPurchaseContract WHERE  IsAppEnd='Y' AND IsPayoff='N' ";

          if (data != null)
          {
              if (data.SupplierName != null && data.SupplierName != "")
              {
                  strSql += string.Format(@" and SupplierName like '%{0}%'", data.SupplierName);
              }
          }
          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 采购付款查询 合同查询
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchaseContractQuery(int start, int limit, string strOrderBy, dynamic data)
      {
          string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
          string strSql = @" SELECT * FROM SysPurchaseContract WHERE  IsAppEnd='Y'  ";

          if (data != null)
          {
              if (data.SupplierName != null && data.SupplierName != "")
              {
                  strSql += string.Format(@" and SupplierName like '%{0}%'", data.SupplierName);
              }
          }
          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }


      /// <summary>
      /// 采购付款单审批记录
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchasePayAppLog(int start, int limit, string strOrderBy, dynamic data)
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
                              FROM [CreateErp].[dbo].[SysFlowStep] WHERE 1=1  ";


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
    /// 付款申请审批提交
    /// </summary>
    /// <param name="billNo"></param>
    /// <param name="stepNo"></param>
    /// <param name="appnote"></param>
    /// <param name="type"></param>
    /// <returns></returns>
      public string UpdatePurchasePayAppInfo(string billNo, string stepNo, string appnote, string type)
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
                  updateContractSql = @" UPDATE SysPurchasePay SET StepNo=0,AppUserCode='',CreateDate='',StepName='退回'  WHERE BillNo='" + billNo + "' ";
              }
              else//通过审批
              {
                  string strQueryMaxStepSql = @"  SELECT MAX(StepNo) AS MaxStepNo FROM SysFlowStep WHERE BillNo='" + billNo + "'   ";
                  int MaxStepNo = int.Parse(DBUtil.Fill(strQueryMaxStepSql).Rows[0][0].ToString());
                  int iNowStepNo = int.Parse(stepNo);
                  if (iNowStepNo< MaxStepNo)
                  {
                      DataTable dtAppUser = DBUtil.Fill(@"  SELECT  StepName,AppUserCode,AppUserName   FROM SysFlowStep WHERE BillNo='" + billNo + "' AND StepNo="+(iNowStepNo+1).ToString()+"  ");
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
                      updateContractSql = @" UPDATE SysPurchasePay SET StepNo=" + (iNowStepNo + 1).ToString() + ",AppUserName='" + strAppUserName + "',AppUserCode='" + strAppUser + "',StepName='" + strStepName + "'  WHERE BillNo='" + billNo + "' ";
                  }
                  else//审定，结束审批流程
                  {
                      updateLogSql = @" UPDATE SysFlowStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y'  WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                      updateContractSql = @" UPDATE SysPurchasePay SET AppUserCode='',AppUserName='',IsAppEnd='Y',StepNo=99,StepName='已付款'  WHERE BillNo='" + billNo + "' ";
                      string strSelPCNO = @" SELECT PurBillNo,TotalAmount,PayAmount,PaidAmount FROM SysPurchasePay WHERE BillNo='"+billNo+"'   ";
                      DataTable dtIsPayOver = DBUtil.Fill(strSelPCNO);
                      if (dtIsPayOver.Rows.Count>0)
                      {
                          string strPurBillNo = dtIsPayOver.Rows[0]["PurBillNo"].ToString();
                          decimal decTotalAmount = decimal.Parse(dtIsPayOver.Rows[0]["TotalAmount"].ToString());
                          decimal decPayAmount = decimal.Parse(dtIsPayOver.Rows[0]["PayAmount"].ToString());
                          decimal decPaidAmount = decimal.Parse(dtIsPayOver.Rows[0]["PaidAmount"].ToString());
                          if((decPayAmount+decPaidAmount)>=decTotalAmount)
                          {
                              updatePurchaseContractSql = @" UPDATE SysPurchaseContract SET PaidAmount=PaidAmount+" + decPayAmount.ToString() + ",IsPayoff='Y'  WHERE BillNo='" + strPurBillNo + "'   ";
                          }
                          else{
                              updatePurchaseContractSql = @" UPDATE SysPurchaseContract SET PaidAmount=PaidAmount+" + decPayAmount.ToString() + "  WHERE BillNo='" + strPurBillNo + "'   ";
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


      /// <summary>
      /// 获取采购付款审批单据
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchasePayAppInfo(int start, int limit, string strOrderBy, dynamic data)
      {
          string UserCode = HttpContext.Current.Session["UserCode"].ToString();
          string strSql = @" SELECT [BillNo]
                              ,[CreateDate]
                              ,[PurBillNo]
                              ,[ContractCode]
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
                          FROM [CreateErp].[dbo].[SysPurchasePay] WHERE AppUserCode ='" + UserCode + "' AND IsAppEnd='N' ";

          if (data != null)
          {
              if (data.SupplierName != null && data.SupplierName != "")
              {
                  strSql += string.Format(@" and ReceiveName like '%{0}%' ", data.SupplierName);
              }
          }
         
          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 获取采购付款审批单据 查询页面
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchasePayAppInfoQuery(int start, int limit, string strOrderBy, dynamic data)
      {
          //todo 暂时查询所有
          string UserCode = HttpContext.Current.Session["UserCode"].ToString();
          string strSql = @" SELECT [BillNo]
                              ,[CreateDate]
                              ,[PurBillNo]
                              ,[ContractCode]
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
                          FROM [CreateErp].[dbo].[SysPurchasePay] WHERE 1=1 ";

          CommonFun cf = new CommonFun();
          string isAppUser = cf.isAppUserForPay(UserCode, "PP");
          if (isAppUser == "true")
          {

          }
          else
          {
              strSql += string.Format(@" and PayUserCode IN({0}) ", isAppUser);
          }

          if (data != null)
          {
              if (data.SupplierName != null && data.SupplierName != "")
              {
                  strSql += string.Format(@" and ReceiveName like '%{0}%' ", data.SupplierName);
              }
          }

          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 采购付款申请单列表
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetPurchasePayInfo(int start, int limit, string strOrderBy, dynamic data)
      {
         // string UserCode = HttpContext.Current.Session["UserCode"].ToString();
           string strSql="";
           if (data != null)
           {
               strSql = @" SELECT '' as [BillNo]
                              ,'' as [CreateDate]
                              ,[PurBillNo]
                              ,[ContractCode]
                              ,[ReceiveName]
                              ,'' as [PayReason]
                              ,[TotalAmount]
                              , 0 as [PayAmount]
                              ,'' as[PayAmountBig]
                              ,[PaidAmount]
                              ,[BANK]
                              ,[BANKNO]
                              ,'' as [Remarks]
                              ,'' as [PayUserCode]
                              ,'' as [PayUserName]
                              ,0 as [StepNo]
                              ,'' as [StepName]
                              ,'' as [AppUserCode]
                              ,'' as [AppUserName]
                              ,'' as [IsPayoff]
                              ,'' as [IsAppEnd]                              
                              FROM  dbo.ViewPurchasePayAddInfo WHERE 1=1  ";
               if (data.BillNo != null && data.BillNo != "")
               {
                   strSql += string.Format(@" and PurBillNo='{0}'", data.BillNo);
               }
           }
           else
           {
                strSql = @" SELECT [BillNo]
                              ,[CreateDate]
                              ,[PurBillNo]
                              ,[ContractCode]
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
                          FROM [CreateErp].[dbo].[SysPurchasePay] WHERE StepNo=0  ";
           }
          strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 新增采购付款单
      /// </summary>
      /// <param name="entity"></param>
      /// <param name="type"></param>
      /// <returns></returns>
      public string InsertPurchasePayInfo(SysPurchasePay_Entity entity, string type)
      {
          string returnValue = "";
          try
          {
              DBUtil.BeginTrans();

              string billNo = new SqlHelper().getTableNo("SysPurchasePay", "BillNo", "PP");
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
                                      WHERE  FlowCdode='PP' ORDER BY StepNo ";
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
              if(returnValue=="true")
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

      
      public string DeletePurchasePayInfo(string billNo)
      {
          string strRetun = "";
          string strSql = " UPDATE dbo.SysPurchasePay SET StepNo=98,StepName='删除' WHERE BillNo='" + billNo + "'  ";
          strRetun = DBUtil.ExecuteNonQuery(strSql).ToString();
          return strRetun;
      }

      /// <summary>
      /// 修改采购付款单
      /// </summary>
      /// <param name="entity"></param>
      /// <param name="type"></param>
      /// <returns></returns>
      public string UpdatePurchasePayInfo(SysPurchasePay_Entity entity, string type)
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

      public string getBigMoney(string smallMoney)
      {
          if (smallMoney != "")
          {
              decimal sm = decimal.Parse(smallMoney);
              return new SqlHelper().GetChinaMoney(sm);
          }
          else
          {
              return "";
          }
      }


    }
}
