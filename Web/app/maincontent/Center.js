/// <reference path="../app-base.js" />
/// <reference path="../../resources/ext-all-debug.js" />
/// <reference path="../../resources/ext-all-dev.js" />
Ext.define("TCSYS.maincontent.Center", {
    extend: 'Ext.tab.Panel',
    plain: true,
//    cls: 'my-accordion',
    alias: "widget.maincontent_center",
    //  requires: ["TCSYS.maincontent.FirstPage","TCSYS.maincontent.IndexPage"],
    requires: ["TCSYS.maincontent.FirstPage"],
    region: 'center',
  //  frame:true,
    activeTab: 0,
    name: 'tabCenterPanel',
    items: [
        {
            itemId: 'firstPageItemId',
            xtype: 'maincontent_firstpage',
            listeners: {
                activate: function(panel, b) {
                    //callapi("SYSTEM_TMODULEQuery/getSysFlag", null, function (strSysFlag) {
                    //    var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
                    //    homePage.getStore().removeAll();
                    //    homePage.getStore().load({ params: { type: strSysFlag } });
                    //}, this);
                }
            }
           // hidden: true,
           // autoDestroy: false,
        }

    ],

    initComponent: function () {
        this.callParent(arguments);

        this.on("afterrender", function () {
            this.initUserEnvironment();
        });

    },
    initUserEnvironment: function (user) {

        
    },
//    tabBar: {
//        defaults: {
//            height: 29 //sets the default height of the actual tab
//        },
//        height: 29,  //sets the height of the tabBar component
//        listeners: {
//            afterrender: function(cmp) {
//                cmp.body.setHeight(cmp.getHeight());
//            }
//        }
//    },
    plugins: Ext.create('TCEPORT.TabCloseMenu')
});