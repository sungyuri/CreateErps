using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web
{
    public partial class preview_office : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string filePath = Request.QueryString["filePath"];
            string type = Request.QueryString["type"];
            PageOfficeCtrl1.ServerPage = Request.ApplicationPath + "pageoffice/server.aspx";
            PageOfficeCtrl1.Caption = filePath.Substring(filePath.LastIndexOf('/') + 1);
            PageOfficeCtrl1.AllowCopy = false;
            // 打开文件
            if (type == "doc" || type == "docx")
                PageOfficeCtrl1.WebOpen(Server.MapPath(filePath), PageOffice.OpenModeType.docReadOnly, "tceport");
            else if (type == "xls" || type == "xlsx")
                PageOfficeCtrl1.WebOpen(Server.MapPath(filePath), PageOffice.OpenModeType.xlsReadOnly, "tceport");
            else
                PageOfficeCtrl1.WebOpen(Server.MapPath(filePath), PageOffice.OpenModeType.pptReadOnly, "tceport");
        }
    }
}