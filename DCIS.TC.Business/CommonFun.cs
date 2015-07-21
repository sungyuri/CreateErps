using System;
using System.Data;
using System.Diagnostics;
using System.Dynamic;
using DCIS.Persistence;
using TCEPORT.TC.Business.Common;
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
           string userCode = HttpContext.Current.Session["UserCode"].ToString();
           string userName = HttpContext.Current.Session["UserName"].ToString();
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

    }
}
