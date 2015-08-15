<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="saleContractPrintView.aspx.cs" Inherits="Web.saleContractPrintView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
            <title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
       <script src="js/CreateControl.js" type="text/javascript"></script>

     <script type="text/javascript">
         CreateReport("Report");
         //在网页初始加载时向报表提供数据
          
         function window_onload() {
             //   var salebillNo=<%=salebillNo%>;
             var Request = new Object();
             Request = GetRequest();
             var salebillNo = '';
             salebillNo = Request["saleBillNo"];
             alert(salebillNo);
             Report.LoadFromURL("print/printTemplate/create_xsht.grf");
             Report.LoadDataFromURL("print/printTemplate/saleContractData.aspx?billNo="+salebillNo);
             Report.PrintPreview(true);
         }

         function GetRequest() {
             var url = location.search; //获取url中"?"符后的字串 
             var theRequest = new Object();
             if (url.indexOf("?") != -1) {
                 var str = url.substr(1);
                 strs = str.split("&");
                 for (var i = 0; i < strs.length; i++) {
                     theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                 }
             }
             return theRequest;
         }

         function btnPreview_onclick() {
          
            Report.LoadFromURL("grfData/create_xsht.grf");
            Report.LoadDataFromURL("_data/xmldate.aspx?id="+id+"&bh="+bh+"");
            Report.PrintPreview(true);
        }

        function btnPrint_onclick() {

            Report.LoadFromURL("grfData/create_xsht_sp.grf");
            Report.LoadDataFromURL("_data/xmldate.aspx?id="+id+"&bh="+bh+"");
            Report.PrintPreview(true);
            //        document.body.innerHTML=document.getElementById('xshtP').innerHTML;
            //        window.print();
            //  Report.LoadDataFromURL("_data/xmldate.aspx?id="+id+"&bh="+bh+"");
            //   Report.PrintPreview(true);
            // Report.LoadDataFromURL("_data/xmldate.aspx");

            //Report.Print(true);
        }

         function btnExportXls1_onclick() {
             Report.LoadDataFromURL("_data/xmldate.aspx");

             //要改变导出默认选项参数，响应IGridppReport.ExportBegin 事件，在事件函数中设置选项参数属性，具体参考例子03.Export
             Report.ExportDirect(4, "MyReport.doc", true, true); //gretXLS = 1, 
         }
    </script>
        <style type="text/css">
html,body {
  margin:0;
  height:100%;
}
</style>

</head>
<body onload="window_onload()">
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
