Ext.define('TCSYS.maincontent.IndexPanel', {
    extend: 'Ext.panel.Panel',
    alias: "widget.indexpanel",
    itemId: 'indexPanelItemId',
    plain: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyStyle: {
        //background: '#ffc',  
        //  background: 'url(../../resources/themes/appImage/bgALL.jpg) no-repeat #00FFFF',
      //  padding: '10px'
    },
   // title: "主要",
    border: false,
    name: 'indexpanel',
    //html: '<img src="../../resources/themes/appImage/indexIcon.png"></img>',
    items: [],
    initComponent: function () {

        this.callParent(arguments);
        this.init();
      
    },
    init: function () {
        var p = Ext.create("TCSYS.maincontent.IndexLeft", {
           // flex: 2
        });
        this.items.add(p);
        //var p1 = Ext.create("TCSYS.maincontent.IndexRight", {

        //    flex: 1
        //});
        //this.items.add(p1);
    }
});