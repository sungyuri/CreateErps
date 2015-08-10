<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="TCEPORT.TC.Business" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title></title>
    <style type="text/css">
        #defaultLoading
        {
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top: -70px;
        }
        #defaultLoading .title
        {
            font-family: "Exo" ,sans-serif;
            font-size: 24px;
            color: gray;
            text-align: center;
            white-space: nowrap;
            display: block;
        }
        #defaultLoading .logo
        {
            background: url("resources/themes/appImage/loading.gif") no-repeat center;
            display: block;
            height: 120px;
        }
    </style>
    <link href="resources/ext-theme-classic/ext-theme-classic-all.css" rel="stylesheet"
        type="text/css" />
    <%-- <link href="resources/css/ext-all-neptune.css" rel="stylesheet" type="text/css" />--%>
    <link href="resources/css/icon.css" rel="stylesheet" type="text/css" />
    <link href="resources/css/app.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="resources/css/firstPage.css" />
    <!-- GC -->
    <script src="resources/ext-all-debug.js" type="text/javascript"></script>
    <script src="resources/ext-lang-zh_CN.js" type="text/javascript"></script>
    <!-- App.js contains Ext.App, a simple, re-usable Application component -->
    <script src="app/app-base.js" type="text/javascript"></script>
    <script src="app/app-all.js" type="text/javascript"></script>

   
</head>
<body>
    <div id="defaultLoading">
        <span class="title"><span id="defaultLoading-msg">读取样式和图片中...</span> </span><span
            class="logo"></span>
    </div>
    <div id="viewport">
    </div>
    <script type="text/javascript">
        document.getElementById('defaultLoading-msg').innerHTML = '正在加载核心模块...';</script>
    <script type="text/javascript">
        document.getElementById('defaultLoading-msg').innerHTML = '初始化应用程序...';</script>

</body>
</html>
<script type="text/javascript">
    window.baseUrl = "<%="HTTP://"+Request.Url.Authority + (Request.ApplicationPath == "/" ? "" : Request.ApplicationPath) %>";
    var $USER = {
        userId: '<%=Session["UserCode"]%>',
        realName: '<%=Session["UserName"]%>',
        PositionDesc: '<%=Session["PositionDesc"]%>'
    };

</script>

 <script type="text/javascript">
     function keepsession() {
         //document.all["Back"].src = "SessionKeep.html?RandStr=" + Math.random();
         ////这里的RandStr=Math.random只是为了让每次back.src的值不同，防止同一地址刷新无效的情况   
         callapi('PublicDictionary/backMethod', {}, function (result) {

         });
         //alert(Math.random())
         window.setTimeout("keepsession()", 300000); //每隔5分钟调用一下本身   
     }
     keepsession();
    </script>


<script runat="server" type="text/C#">
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

            //string WSUrl = System.Web.Configuration.WebConfigurationManager.AppSettings["WSUrl"].ToString(); //登录地址
          //  string SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings["first"].ToString(); //系统标识
        //    string BackUrl = WSUrl + "Defal"; //需要加入系统标识
            //string BackUrl = WSUrl + Request.Url.AbsoluteUri; //需要加入系统标识
          //  if (string.IsNullOrEmpty(Convert.ToString(Request.QueryString["Token"])))
            if (Session["UserCode"] == null)
            {
                //调用单点登录页面
                Response.Redirect("Login.aspx");
            }
            else
            {
            
            }
        }
    }
</script>
