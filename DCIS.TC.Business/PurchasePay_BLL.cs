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


      public void InsertPurchasePayInfo()
      {

      }

      public void UpdatePurchasePayInfo()
      {

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
