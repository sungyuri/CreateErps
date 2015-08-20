<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Web.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>太仓创造电子有限公司ERP系统</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css" />    
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/jquery.flip.min.js"></script>
<script type="text/javascript" src="js/script.js"></script>

    <style type="text/css">
        .inputtxt
        {
            border: 1px solid #5A8BA5;
            font-size: 9pt;
            color: #4F8395;
            vertical-align: middle;
            height: 18px;
            padding: 2px;
            /*background: url(images/input_bg.jpg);*/
        }
        body
        {
            margin: 0 auto;
            text-align: center;
            overflow: hidden;
            width: 100%;
            background-color: #f1f1f1;
        }
        .topDiv
        {
            /*background: url(images/login_files/login_bg0.jpg) no-repeat;*/
            font-size: 16px;
            width: 100%;
            text-align: left;
            left: 0;
            top: 0;
            height: 550px;
            position: absolute;
        }
        .userDiv
        {
            margin-top: 80px;
            margin-left: 30px;
            position: relative;
        }
        .userDiv span
        {
            color: #666;
            vertical-align: middle;
        }
        .userDiv input
        {
            width: 200px;
        }
        .pswDiv
        {
            margin-top: 20px;
            margin-left: 30px;
            position: relative;
        }
        .pswDiv span
        {
            color: #666;
            vertical-align: middle;
        }
        .remmberPwd
        {
            margin-left:70px;
        }
        /*.pswDiv input
        {
            width: 200px;
        }*/
        .yzDiv
        {
            margin-top: 20px;
            margin-left: 30px;
            position: relative;
        }
        .yzSpan
        {
            color: #666;
            vertical-align: middle;
        }
        .yzDiv #txtCode
        {
            width: 100px;
        }
        .codeSpan
        {
            color: Red;
            /*background-color: #CCC;*/
            margin-left: 10px;
            vertical-align: middle;
        }
        .pswCheckDiv
        {
            margin-top: 10px;
            margin-left: 30px;
            color: #555;
            font-size: 12px;
            position: relative;
        }
        .pswCheckDiv a
        {
            text-decoration: underline;
            color: #555;
        }
        .btnDiv
        {
            margin-top: 20px;
            margin-left: 30px;
            width:330px;
            height: 40px;
            position: relative;
        }
        .btnDiv span
        {
            color: Red;
            height: 34px;
            line-height: 34px;
            vertical-align: top;
            font-size: 12px;
        }
        .bottomDiv
        {
            margin-top: 180px;
            left: 0px;
            position: relative;
            text-align: center;
            width: 960px;
        }
        #Imagebutton1
        {
            background:linear-gradient(#37aaea,#117ed2);
            background:-moz-linear-gradient(#37aaea,#117ed2);
            -wbkit-border-radius:4px;
            border-radius:4px;
            border:1px solid #1992d9;
            -wbkit-box-shadow:inset 0 1px 0 rgba(255,155,155,0.2);
            -moz-box-shadow:inset 0 1px 0 rgba(255,155,155,0.2);
            box-shadow:inset 0 1px 0 rgba(255,155,155,0.2);
            font:13px/1.5 "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
            height:37px;
            cursor:pointer;
            color:White;
            position:relative;
        }
                
        #txtUserName,#txtPwd
        {
            -wbkit-border-radius:5px;
            -wbkit-box-shadow:inset 0 1px 4px #aaa;
            -moz-border-radius:5px;
            -moz-box-shadow:inset 0 1px 4px #aaa;
            border-radius:5px;
            box-shadow:inset 0 1px 4px #aaa;
            border:1px solid #d6d6d6;
            font-size:16px;
            font-style:italic;
            width:327px;
            height:21px;
            line-height:24px;
            padding:7px 2px 7px 10px;
            color:#ccc;
        }
        #txtCode
        {
            -wbkit-border-radius:5px;
            -wbkit-box-shadow:inset 0 1px 4px #aaa;
            -moz-border-radius:5px;
            -moz-box-shadow:inset 0 1px 4px #aaa;
            border-radius:5px;
            box-shadow:inset 0 1px 4px #aaa;
            border:1px solid #d6d6d6;
            font-size:16px;
            font-style:italic;
            width:120px;
            height:21px;
            line-height:24px;
            padding:7px 2px 7px 10px;
            color:#ccc;
        }
    </style>
</head>
<body scroll="no">
    <form id="form1" runat="server">
    <h1></h1>
    <div id="oDiv" class="topDiv">
    <div id="main">
	
	<div class="sponsorListHolder">


    </div>

<div class="login_container">
	<div class="userDiv">
            <h2 style="font-size:18px;white-space:normal;color:#000;font-weight:bold;top:-30px;left:0px;right:140px;">输入您的用户名和密码：</h2>
            <asp:TextBox ID="txtUserName" runat="server" TabIndex="1" CssClass="inputtxt" Text="用户名*"></asp:TextBox></div>
        <div class="pswDiv">
            <%--<span>密&nbsp;&nbsp;码： </span>--%>
            <asp:TextBox ID="txtPwd" runat="server" TabIndex="2" TextMode="Password" CssClass="inputtxt" Text="密码*"></asp:TextBox>
        </div>
        <div class="yzDiv">
            <%--<span class="yzSpan">验&nbsp;&nbsp;证： </span>--%>
            <asp:TextBox ID="txtCode" runat="server" TabIndex="3" CssClass="inputtxt"></asp:TextBox><span
                class="codeSpan" id="spanCode" runat="server" oncontextmenu="window.event.returnValue=false"
                onselectstart="return false;" onselect="document.selection.empty();"></span>
                <asp:CheckBox runat="server" ID="chkRem" Text="记住密码" CssClass="remmberPwd" TabIndex="5"/>
        </div>
        <div class="pswCheckDiv">
            
        </div>
        <div class="btnDiv">
            <div style="display:inline-block;float:left;position:relative;"><span><%=ViewState["ErrInfo"]%></span></div>
            <div id="loginButton" style="display:inline-block;float:right;position:relative;"><asp:Button ID="Imagebutton1" runat="server" Text="登录"
                Width="80px" OnClick="Imagebutton1_Click" TabIndex="4" BackColor="#117ED2" /></div>
        </div>
            
</div>

</div>

        <div class="bottom">
            <span style="color: #333; font-size: 12px;">太仓创造电子有限公司版权所有@2015</span>
        </div>
<%--<script type="text/javascript">
    function randomAct() {
        var randomNum = "#" + parseInt(Math.random() * (6 - 1 + 1) + 1);
        //alert(randomNum);
        var elem = $(randomNum).children(".sponsorFlip");
        if (elem.data('flipped') == true) {
            elem.revertFlip();
            elem.data('flipped', false);
        }
        else {
            elem.flip({
                direction: 'lr',
                speed: 200,
                onBefore: function () {
                    elem.html(elem.siblings('.sponsorData').html());
                }
            });
            elem.data('flipped', true);
        }
        //alert(elem.data('flipped'));
    };
    var sh = setInterval("randomAct();", 4000);
    $('.sponsorListHolder').hover(function () {
        clearInterval(sh);
    }, function () {
        sh = setInterval("randomAct();", 4000);
    });
</script>--%>
 
    </div>
    <script type="text/javascript">
        var docHeight = document.documentElement.clientHeight;
        var docWidth = document.documentElement.clientWidth;
        document.getElementById("oDiv").style.marginTop = ((docHeight - 500) / 2) + "px";
        //document.getElementById("oDiv").style.marginLeft = ((docWidth - 960) / 2) + "px";
    </script>
    <script type="text/javascript">
        $(function () {
            $("#txtUserName").val("用户名*");
            $("#txtPwd").val("密码*");
            $("#txtCode").val("验证码*");
            $("#txtUserName").focus(function () {
                $("#txtUserName").css({ "color": "#333", "font-style": "normal" });
                $("#txtUserName").val("");
            });
            $("#txtPwd").focus(function () {
                $("#txtPwd").css({ "color": "#333", "font-style": "normal" });
                $("#txtPwd").val("");
            });
            $("#txtCode").focus(function () {
                $("#txtCode").css({ "color": "#333", "font-style": "normal" });
                $("#txtCode").val("");
            });
        });
    </script>
    </form>
</body>
</html>
