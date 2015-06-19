/// <reference path="../app-base.js" />
/// <reference path="../../resources/ext-all-debug.js" />
/// <reference path="../../resources/ext-all-dev.js" />
Ext.define("TCSYS.maincontent.Center", {
    extend: 'Ext.tab.Panel',
    plain: true,
//    cls: 'my-accordion',
    alias: "widget.maincontent_center",
    //  requires: ["TCSYS.maincontent.FirstPage","TCSYS.maincontent.IndexPage"],
    requires: ["TCSYS.maincontent.IndexPage"],
    region: 'center',
    frame:true,
    activeTab: 0,
    name: 'tabCenterPanel',
    items: [
        {
            itemId: 'indexPageItemId',
            xtype: 'maincontent_indexPage',
           // hidden: true,
           // autoDestroy: false,
            listeners: {
                activate: function(panel, b) {

                    if (_usertype != undefined) {
                     
                    }
                }
                //remove: function(tp, c) {
                //   // c.hide();
                //}
            }
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