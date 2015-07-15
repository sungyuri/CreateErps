/// <reference path="../app-base.js" />
var _usertype = null;
Ext.define("TCSYS.maincontent.North", {
    extend: "Ext.panel.Panel",
    alias: "widget.maincontent_north",
    height: 100,
    bodyCls: "north",
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    region: "north",
    html: [
        '<div class="titleJpg"></div>',
        '<div class="userName" style="text-align: right">',
        '<span>欢迎：</span><span name="userName">管理员</span>&nbsp;&nbsp;',
         '<input id="btnLogout" type="button" class="icon-blank" value="注销" onclick="return logout()"/>',
        '</div>'
    ],
    listeners: {
        afterrender: function() {
            document.getElementById('defaultLoading').style.display = 'none';
            var me = this;
            var userSpan = me.getEl().select('.userName>span[name="userName"]');
            userSpan.update($USER.realName + '(' + $USER.PositionDesc + ')');
            //var timeSpan = me.getEl().select('.userName>span[name="ltime"]');
            //var time = Ext.Date.format(curDate, 'Y-m-d');
            //timeSpan.update(time);
            //获取用户信息
//            callapi('SYSTEM_TMODULEQuery/GetCurrentUserInfo', {}, function (value) {
//                var userSpan = me.getEl().select('.userName>span[name="userName"]');
//                userSpan.update(value);
            //            });
        }
    },
    bbar: [
        {
            itemId: 'hddItemId',
            text: "ERP系统",
            xtype: 'button',
            hidden:false,
            //style:'border: 3px solid #ccc;background-color:#99CCCC',
            iconCls: 'icon_hdd',
            handler: function() {
               // document.getElementById('defaultLoading').style.display = 'inline';
               // var firstUrlCB = "&surl=/main?action=webbuilder/application/tcgship/workAna.xwl";
                //setOnclickDiv('CBGL', '船舶管理', firstUrlCB);
                setOnclickDivNew('ERP', 'ERP系统');

            }
        }, {
        itemId: 'bgdItemId',
        text: "卫生检疫",
        xtype: 'button',
        iconCls: 'icon_bgd',
        hidden: true,
        handler: function () {

            var firstUrlWSJY = "&surl=/main?action=webbuilder/application/tceport/workAna.xwl";
            setOnclickDiv('WSJY', '卫生检疫', firstUrlWSJY);
        }
        },
         {
             itemId: 'wxpItemId',
             text: "危险品",
             xtype: 'button',
             iconCls: 'icon_ycsb',
             hidden: true,
             handler: function () {

                 setOnclickDivNew('APP_WXPZY', '危险品',"wxp");                
             }
         },
    {
        itemId:'bjdItemId',
        text: "集卡优惠",
        xtype: 'button',
        iconCls: 'icon_bjd',
        hidden: true,
        handler: function () {

            var firstUrlJK = "&surl=/main?action=webbuilder/application/widget/weather.xwl";
            setOnclickDiv('JKYH', '集卡优惠', firstUrlJK);

        }
    },
     {
         itemId: 'sgyItemId',
         text: "三个一",
         xtype: 'button',
         iconCls: 'icon_bgd',
         hidden: true,
         handler: function () {

             setOnclickDivNew('APP_SGY', '三个一');

         }
     },
    {
        itemId: 'tgsbItemId',
        text: "通关申报",
        xtype: 'button',
        iconCls: 'icon_ycsb',
        hidden: true,
        handler: function () {

            setOnclickDivNew('TGSB', '通关申报');        

        }
    },
    {
        itemId:'ycsbItemId',
            text: "通关审批",
            xtype: 'button',
            iconCls: 'icon_ycsb',
            hidden: true,
            handler: function() {

                setOnclickDivNew('APP_JZXTG', '通关审批');
           
            }
    },
     {
         itemId: 'ysgjItemId',
         text: "运输工具",
         xtype: 'button',
         hidden: true,
         //style:'border: 3px solid #ccc;background-color:#99CCCC',
         iconCls: 'icon_hdd',
         handler: function () {

             setOnclickDivNew('transport', '运输工具');

             }
         }
        
    ]
});