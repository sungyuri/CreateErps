using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web
{
    public partial class preview_pdf : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string filePath = Request.QueryString["filePath"];
            PDFCtrl1.ServerPage = Request.ApplicationPath + "pageoffice/server.aspx";
            PDFCtrl1.JsFunction_AfterDocumentOpened = "AfterDocumentOpened";
            PDFCtrl1.Caption = filePath.Substring(filePath.LastIndexOf('/') + 1);
            PDFCtrl1.WebOpen(Server.MapPath(filePath));
        }
    }
}