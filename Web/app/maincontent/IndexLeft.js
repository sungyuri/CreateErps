Ext.define('TCSYS.maincontent.IndexLeft', {
    extend: 'Ext.panel.Panel',
    alias: "widget.indexleft",
    itemId: 'indexLeftItemId',
    plain: true,
    //layout: {
    //    type: 'vbox',
    //    align: 'stretch'
    //},
    layout: 'fit',
  //  title: "左边",
    border: false,
    name: 'indexleft',
    items: [{
        xtype: 'panel',
        border: false,
        layout:'fit',
        html: [
             '<div class="indexDiv">',
            '<div class="indexPanel">',
            '<div class="indexYsgj"></div>',
             '<div class="indexYsgjIcon1" id="divCB" >',
            '<div><img src="resources/themes/appImage/indexImage/ship.png" /></div>',
            '<span>船舶</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divHGC">',
            '<div><img src="resources/themes/appImage/indexImage/hgc.png" /></div>',
            '<span>货港船</span>',
            '</div>',
             '<div class="indexYsgjIcon1" id="divJKYH">',
            '<div><img src="resources/themes/appImage/indexImage/jkyh.png" /></div>',
            '<span>集卡优惠</span>',
            '</div>',
            '</div>',

           '<div class="indexPanel">',
             '<div class="indexHwjg"></div>',
            '<div class="indexYsgjIcon1" id="divSGY" >',
            '<div><img src="resources/themes/appImage/indexImage/sgy.png" /></div>',
            '<span class="indexYsgjSpan">三个一</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divQSB">',
            '<div><img src="resources/themes/appImage/indexImage/qsb.png" /></div>',
            '<span>全申报</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divWSJY">',
            '<div><img src="resources/themes/appImage/indexImage/wsjy.png" /></div>',
            '<span>卫生检疫</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divWXP">',
            '<div><img src="resources/themes/appImage/indexImage/wxp.png" /></div>',
            '<span>危险品</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divWLGJ">',
            '<div><img src="resources/themes/appImage/indexImage/wlgj.png" /></div>',
            '<span>物流工具</span>',
            '</div>',
             '</div>',

               '<div class="indexPanel">',
              '<div class="indexWlpt"></div>',
            '<div class="indexYsgjIcon1" id="divHDPT" >',
            '<div><img src="resources/themes/appImage/indexImage/hdpt.png" /></div>',
            '<span>货代平台</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divWLXZ">',
            '<div><img src="resources/themes/appImage/indexImage/wlxz.png" /></div>',
            '<span>物流协作</span>',
            '</div>',

             '<div class="indexYsgjIcon1" id="divWSG">',
            '<div><img src="resources/themes/appImage/indexImage/wsg.png" /></div>',
            '<span>无水港</span>',
            '</div>',
            '</div>',

               '<div class="indexPanel">',
              '<div class="indexInfoq"></div>',
            '<div class="indexYsgjIcon1" id="divCbwz" >',
            '<div><img src="resources/themes/appImage/indexImage/shipLocation.png" /></div>',
            '<span>船舶位置</span>',
            '</div>',

              '<div class="indexYsgjIcon1" id="divTGCX">',
            '<div><img src="resources/themes/appImage/indexImage/tgcx.png" /></div>',
            '<span>通关查询</span>',
            '</div>',       
            '</div>',

                 '</div>'

        ],
         listeners: {
             afterrender: function () {

                 var elementWLXZ = Ext.get('divWLXZ');
                 var purlWLXZ = "http://www.tceport.com.cn:8001/login.aspx?BackURL=http://www.tceport.com.cn:8100/Default.aspx";
                 elementWLXZ.on('click', function () {
                     window.open(purlWLXZ);
                 });

                 var elementWSG = Ext.get('divWSG');
                 var purlWSG = "http://wsg.tceport.com.cn";
                 elementWSG.on('click', function () {
                     window.open(purlWSG);
                 });
              //  var indexL = Ext.ComponentQuery.query('[name="indexleft"]')[0];
                var elementWSJY = Ext.get('divWSJY');
                elementWSJY.on('click', function () {
                    var firstUrlWSJY = "&surl=/main?action=webbuilder/application/tceport/workAna.xwl";
                    setOnclickDiv('WSJY', '卫生检疫', firstUrlWSJY);
                });

                var elementWXP = Ext.get('divWXP');
                elementWXP.on('click', function () {
                  //  var firstUrlWXP = "";
                    setOnclickDivNew('APP_WXPZY', '危险品');
                });

                var elementSGY = Ext.get('divSGY');
                elementSGY.on('click', function () {
                    //  var firstUrlWXP = "";
                    setOnclickDivNew('APP_SGY', '三个一');
                });

                var elementCB = Ext.get('divCB');
                elementCB.on('click', function () {
                  var  firstUrlCB = "&surl=/main?action=webbuilder/application/tcgship/workAna.xwl";
                  setOnclickDiv('CBGL', '船舶管理', firstUrlCB);
                });

                var elementJK = Ext.get('divJKYH');
                elementJK.on('click', function () {
                    var firstUrlJK = "&surl=/main?action=webbuilder/application/widget/weather.xwl";
                    setOnclickDiv('JKYH', '集卡优惠', firstUrlJK);
                });

                var elementTG = Ext.get('divTGCX');
                 //  var purl = "http://www.tceport.com.cn:8089/frame/Main.aspx";
                var purlTG = "http://www.tceport.com.cn:8089/frame/Main.aspx";
                var addWindow = new Ext.Window({
                    title: '通关查询',
                    width: '90%',
                    height: '88%',
                    resizable: false,
                    closeAction: 'hide',
                    constrainHeader: true,
                    modal: true,
                    plain: true,
                    html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + purlTG + '"></iframe>'
                });
                elementTG.on('click', function () {
                    addWindow.show();
                });
                var elementCBWZ = Ext.get('divCbwz');
                var purlCBWZ = "http://www.shipxy.com/Monitor";
                elementCBWZ.on('click', function () {
                    window.open(purlCBWZ);
                });


                var elementQSB = Ext.get('divQSB');
                elementQSB.on('click', function () {
                    setOnclickDivNew('TGSB', '通关申报');
                   
                });
            
            }
        }
    }
    //{
    //    xtype: 'panel',
    //    border: false,
    //    html: [
    //        '<div class="indexHwjg"></div>',
    //        '<div class="indexYsgjIcon1" id="cbwz" >',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span class="indexYsgjSpan">三个一</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>全申报</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>卫生检疫</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>危险品</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>物流工具</span>',
    //        '</div>'
    //    ]
    //},
    //{
    //    xtype: 'panel',
    //    border: false,
    //    html: [
    //        '<div class="indexWlpt"></div>',
    //        '<div class="indexYsgjIcon1" id="cbwz" >',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>货代平台</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>物流协作</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>无水港</span>',
    //        '</div>'
    //    ]
    //},
    //{
    //    xtype: 'panel',
    //    border: false,
    //    html: [
    //        '<div class="indexMyxk"></div>',
    //        '<div class="indexYsgjIcon1" id="cbwz" >',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>进口许可</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>出口许可</span>',
    //        '</div>'
    //    ]
    //},
    //{
    //    xtype: 'panel',
    //    border: false,
    //    html: [
    //        '<div class="indexQyzz"></div>',
    //          '<div class="indexYsgjIcon1" id="cbwz" >',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>对外贸易</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>货物</span>',
    //        '</div>'
    //    ]
    //},
    //{
    //    xtype: 'panel',
    //    border: false,
    //    html: [
    //        '<div class="indexZmzq"></div>',
    //          '<div class="indexYsgjIcon1" id="cbwz" >',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>进境</span>',
    //        '</div>',

    //         '<div class="indexYsgjIcon1" id="tgQuery">',
    //        '<div><img src="resources/themes/appImage/indexIcon.png" /></div>',
    //        '<span>出境</span>',
    //        '</div>'
    //    ]
    // //   flex: 1
    //}
    ],
    initComponent: function () {

        this.callParent(arguments);
    },
    setOnclickDivbak: function (eName,cName,surlF,surlIndex) {
        var west = Ext.ComponentQuery.query('[name="maincontent_west"]')[0];
        west.funGroup = null;
        west.init(eName);
        west.setTitle(cName);
     
        west.hidden = false;
        var centerPanel = Ext.ComponentQuery.query('[name="tabCenterPanel"]')[0];


        var length = centerPanel.items.length;
        if (length == 1) {
            for (var i = length; i > 0; i--) {
                centerPanel.remove(i);
            }
            var sPanel = Ext.create("TCSYS.maincontent.FirstPage", {
                listeners: {
                    activate: function (panel, b) {
                        if (eName != undefined) {
                            var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
                            //homePage.getStore().removeAll();
                            homePage.getStore().load({ params: { type: eName } });
                        }
                    }
                }
            });
            centerPanel.add(sPanel);
        }
        else {
            var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
            homePage.getStore().removeAll();
            homePage.getStore().load({ params: { type: eName } });
            for (var i = length; i > 1; i--) {
                centerPanel.remove(i);
            }
        }

        callapi("SYSTEM_TMODULEQuery/getToken", null, function (token) {
            var aa = token.split(',');
            var surl;
            if (aa[1] != null) {
                   surl = aa[1];
            }
            var p = Ext.create("Ext.panel.Panel", {
                title: eName,
                name: eName,
                autoScroll: true,
                layout: 'fit',
                hidden: true,
                items: [{
                    html: '<iframe id="iframe1" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + surl + '"></iframe>'
                }],
                closable: true,//标签上出现关闭按钮
                id: eName,
                listeners: {                   // 添加监听器，点击此页面的tab时候要重新加载（刷新功能）  
                    activate: function () {
                        centerPanel.setActiveTab(0);
                    },
                    afterrender: function () {

                    }
                }
            });
            centerPanel.add(p);
            centerPanel.setActiveTab(p);
            centerPanel.setActiveTab(0);
            centerPanel.setActiveTab(p);
        }, this);
        callapi("SYSTEM_TMODULEQuery/getToken", null, function (token) {
            var aa = token.split(',');
            var suuu = aa[2] + "/slogin?Token=" + aa[0] + surlIndex;
            var p1 = Ext.create("Ext.panel.Panel", {
                title: '首页',
                name: '首页',
                autoScroll: true,
                layout: 'fit',
                hidden: false,
                items: [{
                    html: '<iframe id="iframe1" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + suuu + '"></iframe>'
                }],
                closable: true,//标签上出现关闭按钮
                id: 'firsthtml',
                listeners: {                   // 添加监听器，点击此页面的tab时候要重新加载（刷新功能）  
                    activate: function () {
                    },
                    afterrender: function () {

                    }
                }
            });
            centerPanel.add(p1);
            centerPanel.setActiveTab(p1);
        }, this);

    }
});