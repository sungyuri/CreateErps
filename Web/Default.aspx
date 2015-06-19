<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="TCEPORT.TC.Business" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>太仓港国际贸易单一窗口</title>
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
        userId: '<%=Session["UserName"]%>',
        realName: '<%=Session["RealName"]%>',
        companyName: '<%=Session["CompanyName"]%>',
        token: '<%=Session["Token"]%>'
    };

</script>

 <script type="text/javascript">
     function keepsession() {
         //document.all["Back"].src = "SessionKeep.html?RandStr=" + Math.random();
         ////这里的RandStr=Math.random只是为了让每次back.src的值不同，防止同一地址刷新无效的情况   
         //callapi('PublicDictionary/backMethod', {}, function (result) {
         //});
         //alert(Math.random())
         //window.setTimeout("keepsession()",1); //每隔300秒调用一下本身   
     }
     keepsession();
    </script>


<script runat="server" type="text/C#">
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

            string WSUrl = System.Web.Configuration.WebConfigurationManager.AppSettings["WSUrl"].ToString(); //单点登录地址
            string SysFlag = System.Web.Configuration.WebConfigurationManager.AppSettings["first"].ToString(); //系统标识
            string BackUrl = WSUrl + Request.Url.AbsoluteUri; //需要加入系统标识

            if (string.IsNullOrEmpty(Convert.ToString(Request.QueryString["Token"])))
            {

                //调用单点登录页面
                Response.Redirect(BackUrl);

            }
            else
            {
                try
                {
                   
                    Web.tceport.TokenService SsoService = new Web.tceport.TokenService();
                    string TokenVal = Convert.ToString(Request.QueryString["Token"]);
                    string XmlStr = SsoService.GetToken(TokenVal, SysFlag);

                    if (string.IsNullOrEmpty(XmlStr)) //如果为空，则重定向到单点登录页面
                    {
                        Response.Redirect(BackUrl);
                        return;
                    }

                    System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                    xmldoc.Load(new System.IO.MemoryStream(System.Text.Encoding.GetEncoding("utf-8").GetBytes(XmlStr)));
                    System.Xml.XmlNodeReader reader = new System.Xml.XmlNodeReader(xmldoc);
                    System.Data.DataSet ds = new System.Data.DataSet();
                    ds.ReadXml(reader);
                    reader.Close();
                    Session["XML"] = XmlStr;

                    if (ds.Tables.Count > 0)
                    {

                        Page.ClientScript.RegisterClientScriptBlock(Page.GetType(), Guid.NewGuid().ToString(), "window.baseUrl =33;", true);

                        //获取xml中的信息，保存到Session中
                        Session["UserID"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                        Session["UserGuid"] = ds.Tables["BASE_USERS"].Rows[0]["USER_GUID"].ToString();
                        Session["UserName"] = ds.Tables["BASE_USERS"].Rows[0]["LOGIN_NAME"].ToString();
                        Session["RealName"] = TCEPORT.TC.Business.Common.Users.REALNAME = ds.Tables["BASE_USERS"].Rows[0]["NAME"].ToString();
                       // Session["DeptName"] = ds.Tables["BASE_USERS"].Rows[0]["DEPT_NAME"].ToString();
                        Session["CMP_GUID"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_GUID"].ToString();       //企业GUID
                        Session["CompanyName"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_NAME_SHORT"].ToString();  //企业简称
                       // Session["CompanyFullName"] = ds.Tables["BASE_USERS"].Rows[0]["CMP_NAME_FULL"].ToString();
                       // Session["EPORT_CODE"] = ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString().Length >= 4 ? ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString().Substring(0, 4) : "";
                      //  Session["ID_NO"] = ds.Tables["BASE_USERS"].Rows[0]["IDCARD_NO"].ToString();
                        Session["EPORTID"] = TCEPORT.TC.Business.Common.Users.CMP_GUID = ds.Tables["BASE_USERS"].Rows[0]["EPORT_CODE"].ToString();//企业ID
                      //  Session["DeptID"] = ds.Tables["BASE_USERS"].Rows[0]["DEPT_GUID"].ToString();
                        Session["Token"] = Request.QueryString["Token"];
                        Session["SysFlag"] = SysFlag;
                        //string rolelist = "";

                        //foreach (System.Data.DataRow row in ds.Tables[2].Rows)
                        //{
                        //    rolelist += row["M_URL"].ToString() + ",";
                        //}

                        //Session["rolelist"] = rolelist.TrimEnd(new char[] { ',' });

                        // SYSTEM_TMODULEQuery sys_query = new SYSTEM_TMODULEQuery();
                        //Session["isHdd"] = sys_query.Get_CurrentRight("1");
                        //Session["isBgd"] = sys_query.Get_CurrentRight("2");
                        //Session["isBjd"] = sys_query.Get_CurrentRight("3");
                        //Session["isYcsb"] = sys_query.Get_CurrentRight("4");
                        //Session["isHdd"] = "1";
                        //Session["isBgd"] = "1";
                        //Session["isBjd"] = "1";
                        //Session["isYcsb"] = "1";
                        //Response.Redirect("http://58.210.24.163:9090/sanitationwb/webAdmin/index.jsp");
                        // Response.Redirect("www.baidu.com");
                        // Response.Redirect("Default.aspx");

                    }
                }
                catch (Exception EX)
                {
                    //调用单点登录页面
                    Response.Redirect(BackUrl);
                }
                return;
            }
        }
    }
</script>
