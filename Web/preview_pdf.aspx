<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="preview_pdf.aspx.cs" Inherits="Web.preview_pdf" %>
<%@ Register Assembly="PageOffice, Version=2.0.0.1, Culture=neutral, PublicKeyToken=1d75ee5788809228"
    Namespace="PageOffice" TagPrefix="po" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script language="javascript" type="text/javascript">
        function AfterDocumentOpened() {
            document.getElementById("PDFCtrl1").BookmarksVisible = false;//隐藏标签
            document.getElementById("PDFCtrl1").SetPageFit(3);//适合宽度
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div style="width:100%; height:550px;">
        <po:PDFCtrl ID="PDFCtrl1" runat="server"  Theme="Office2010" Menubar="false" CustomToolbar="false">
        </po:PDFCtrl>
    </div>
    </form>
</body>
</html>
