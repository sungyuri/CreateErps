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
   public class CommonFun
    {
       public CommonFun()
       {

       }

       // 获取附件
       public dynamic GetFiles()
       {
           string strGuid = HttpContext.Current.Request.QueryString["GroupGuid"];
           if (!string.IsNullOrEmpty(strGuid))
           {
               string strSql = string.Format("SELECT FILEGUID AS [GUID],[FILENAME],FILEPATH+[FILENAME] AS FILEPATH FROM SysFileList WHERE GROUPID='{0}' ", strGuid);
               DataTable dt = DBUtil.Fill(strSql);
               return dt;
           }
           else
               return "";
       }

       public string DeleteFile(string strGuid)
       {
           if (!string.IsNullOrEmpty(strGuid))
           {
               string sql = string.Format("DELETE FROM SysFileList WHERE FILEGUID='{0}'", strGuid);

               return DBUtil.ExecuteNonQuery(sql) > 0 ? "1" : "0";
           }
           else
               return "0";
       }

       public bool InsertFileInfo(string fileGuid, DateTime upTime, string fileName, int fileSize, string fileType, string groupGuid, string filePath)
       {
          // string userCode = HttpContext.Current.Session["UserCode"].ToString();
          // string userName = HttpContext.Current.Session["UserName"].ToString();
           string userCode = "";
           string userName = "";
           string strSql = @" INSERT INTO [SysFileList]
                               ([FILEGUID]
                               ,[FILENAME]
                               ,[FILETYPE]
                               ,[FILESIZE]
                               ,[GROUPID]
                               ,[FILEUPLOADTIME]
                               ,[UPUSERCODE]
                               ,[UPUSERNAME]
                               ,[FILEPATH])
                         VALUES
                              ('" + fileGuid + "','" + fileName + "','" + fileType + "'," + fileSize.ToString() + ",'" + groupGuid + "','" + upTime.ToString() + "','" + userCode + "','" + userName + "','" + filePath + "')";

           return DBUtil.ExecuteNonQuery(strSql) > 0 ? true : false;
       }

       public bool isAppUserForConstract(string loginUserCode, string strFlowCdode)
       {
           string strPCode = HttpContext.Current.Session["PositionCode"].ToString();
           string strDCode = HttpContext.Current.Session["DepartCode"].ToString();
           bool bIsAppUser = false;
           string appUserSql = @"   SELECT FirstUser+','+ManyUser+','+LastUser  FROM SysFlowMany  WHERE FlowCdode='" + strFlowCdode + "' ";
           string[] strAppUserArray= DBUtil.ExecuteScalar(appUserSql).ToString().Split(',');
           for(int i=0;i<strAppUserArray.Length;i++)
           {
               if(strAppUserArray[i]==loginUserCode)
               {
                   bIsAppUser = true;
                   break;
               }
           }
           if (strFlowCdode == "SC")
           {
               if (strPCode == "2" && strDCode == "2")
               {
                   bIsAppUser = true;
               }
           }
           return bIsAppUser;
       }

       public string isAppUserForPay(string loginUserCode, string strFlowCdode)
       {
           string bIsAppUser = "";
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
                                      WHERE  FlowCdode='" + strFlowCdode + "' ORDER BY StepNo ";
           DataTable flowDt = DBUtil.Fill(flowQuery);

           for (int j = 0; j < flowDt.Rows.Count; j++)
           {
               //if (flowDt.Rows[j]["DepartCode"].ToString() == "-1")
               //{
               //    string strdeptCode = HttpContext.Current.Session["DepartCode"].ToString();
               //    string strSqlQueryCurren = @"     SELECT UserCode,UserName FROM SysUser WHERE DepartCode=" + strdeptCode + " AND PositionCode=" + flowDt.Rows[j]["PositionCode"].ToString() + " ";
               //    DataTable dtInfo = DBUtil.Fill(strSqlQueryCurren);
               //    if (dtInfo.Rows.Count > 0)
               //    {
               //        if (loginUserCode == dtInfo.Rows[0]["UserCode"].ToString())
               //        {
               //            bIsAppUser = true;
               //            break;
               //        }
               //    }
               //}

               if (flowDt.Rows[j]["UserCode"].ToString() == loginUserCode)
               {
                   bIsAppUser = "true";
                   break;
               }

           }
           if (bIsAppUser == "")
           {
               string strdeptCode = HttpContext.Current.Session["DepartCode"].ToString();
               string strPosCode = HttpContext.Current.Session["PositionCode"].ToString();
               if (strPosCode == "4")
               {
                   string strSqlQueryCurren = @"     SELECT UserCode FROM SysUser WHERE DepartCode=" + strdeptCode ;
                   DataTable dtInfo = DBUtil.Fill(strSqlQueryCurren);
                   if (dtInfo.Rows.Count > 0)
                   {
                       for(int k=0;k<dtInfo.Rows.Count;k++)
                       {
                           bIsAppUser += "'" + dtInfo.Rows[k][0].ToString() + "',";
                       }
                       bIsAppUser = bIsAppUser.Trim().TrimEnd(',');
                   }
               }
               else
               {
                   bIsAppUser = "'" + loginUserCode + "'";
               }
           }
           return bIsAppUser;

       }

    }
}
