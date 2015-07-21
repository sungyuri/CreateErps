using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Data;
using TCEPORT.TC.Business;
using System.Configuration;

namespace Web
{
    /// <summary>
    /// uploadfile 的摘要说明
    /// </summary>
    public class uploadfile : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                HttpPostedFile upFile = context.Request.Files[0];
                string localPath = ConfigurationManager.AppSettings["FilePath"];
                string groupGuid = context.Request.Params["GroupGuid"];
                string uploadPath = context.Server.MapPath(context.Request.ApplicationPath + localPath + groupGuid + "/");
                System.IO.Directory.CreateDirectory(uploadPath);
                if (upFile.ContentLength > 0)
                {
                    try
                    {
                        string fileName = upFile.FileName;
                        if (upFile.FileName.IndexOf(":\\") == 1)//IE6上传文件名包含具体路径
                            fileName = fileName.Substring(fileName.LastIndexOf('\\') + 1);
                        string fileType = fileName.Substring(fileName.LastIndexOf('.')).ToLower();
                        bool flag = new CommonFun().InsertFileInfo(Guid.NewGuid().ToString(), DateTime.Now, fileName, upFile.ContentLength, fileType, groupGuid, localPath + groupGuid + "/");
                        context.Response.Clear();
                        if (flag)
                        {
                            upFile.SaveAs(Path.Combine(uploadPath, fileName));
                            context.Response.Write("{success:true,msg:'文件上传成功'}");
                        }
                        else
                            context.Response.Write("{success:true,msg:'文件上传失败'}");
                        context.Response.End();
                    }
                    catch (Exception e)
                    {
                    }
                }
                else
                {
                    context.Response.Write("{success:true,msg:'文件上传失败'}");
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}