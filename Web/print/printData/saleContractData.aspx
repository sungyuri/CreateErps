<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="saleContractData.aspx.cs" Inherits="Web.print.printData.saleContractData" %>
<%@ Import Namespace="TCEPORT.TC.Business" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
    
<script runat="server"> 
    protected void Page_Load(object sender, EventArgs e)
    {
        //★特别提示★：
        //第三个参数为false，表示不压缩数据，在实际项目中应改为true，对数据进行压缩。这里设为false主要是为了
        //测试报表数据网页运行的正确性，以便查看浏览响应的原文件时能看到xml形式的文本数据。
       // OledbReportData.GenNodeXmlData(this, "select * from Customers order by Region,City", false);

           string billNo = Request.QueryString["billNo"].ToString();
           string RecordsetQuerySQL = "  SELECT * FROM dbo.ViewSaleContractDetail WHERE SaleBillNo='"+billNo+"'  ";
           string ParameterQuerySQL = " SELECT * FROM  SysSaleContract  WHERE BillNo='"+billNo+"'  ";
           SqlReportData.GenEntireReportData(this, RecordsetQuerySQL, ParameterQuerySQL, false);
        // GenEntireReportData(this,RecordsetQuerySQL,ParameterQuerySQL,true);
    }
</script>
