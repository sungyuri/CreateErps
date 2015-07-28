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

      public dynamic GetPurchasePayInfo(int start, int limit, string strOrderBy, dynamic data)
      {

          string strSql = @" SSELECT [BillNo]
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
  FROM [CreateErp].[dbo].[SysPurchasePay] ";

          if (data != null)
          {
              if (data.SupplierName != null && data.SupplierName != "")
              {
                  strSql += string.Format(@" and SupplierName like '%{0}%'", data.SupplierName);
              }
          }
        //  strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
         // string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(strSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }


    }
}
