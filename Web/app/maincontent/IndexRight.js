Ext.define('TCSYS.maincontent.IndexRight', {
    extend: 'Ext.panel.Panel',
    alias: "widget.maincontent_indexRight",
    itemId: 'indexRightItemId',
    plain: true,
    layout: {
        type: 'vbox',
        align: 'center'
    },
  //  title: "右边",
   // layout: 'fit',
    border: false,
    name: 'maincontent_indexRight',
   // requires: ['TCSYS.maincontent.FirstPage'],
    items: [
    {
        xtype: 'panel',
        border:false,
        html: [
            '<div class="infoQuery"></div>'
        ]
    },
    {
        xtype: 'panel',
        border: false,
        html: [
            '<div class="infoQueryIcon1" id="cbwz" >',
            '<div><img src="resources/themes/appImage/indexImage/shipLocation.png" /></div>',
            '<span>船舶位置</span>',
            '</div>',

             '<div class="infoQueryIcon2" id="tgQuery">',
            '<div><img src="resources/themes/appImage/indexImage/tgcx.png" /></div>',
            '<span>通关查询</span>',
            '</div>'
        ],
        listeners: {
            afterrender: function () {
                var center = Ext.ComponentQuery.query("maincontent_center")[0];
                var element = Ext.get('tgQuery');
               //  var purl = "http://www.tceport.com.cn:8089/frame/Main.aspx";
                var purl = "http://www.tceport.com.cn:8089/frame/Main.aspx";
                var addWindow = new Ext.Window({
                    title: '通关查询',
                    width: '90%',
                    height:'88%',
                    resizable: false,
                    closeAction: 'hide',
                    constrainHeader: true,
                    modal: true,
                    plain: true,
                    html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + purl + '"></iframe>'     
                });
                element.on('click', function () {
                    addWindow.show();
                });
                var element1 = Ext.get('cbwz');
                var purl1 = "http://www.shipxy.com/Monitor";
                element1.on('click', function () {
                    window.open(purl1);
                });
            }
        }
    }
    ],
    listeners: 
    {
        afterrender: function () {

        }
    },
    initComponent: function () {

        this.callParent(arguments);
        //this.add({
        //    xtype: 'panel',
        //    region: 'center',
        //    border: false,
        //    autoScroll: true,
        //    items: [{
        //        xtype: 'firstpage'
        //    }
        //    ]
        //});

        //var p1 = Ext.create("TCSYS.maincontent.HomePageDataView1", {
        //    flex: 1
        //});
        //this.items.add(p1);
        //var me = this;
        //this.add({
        //    border: false,
        //    xtype: 'panel',
        //    tbar: [{
        //        text: "查询",
        //        xtype: 'panle'
        //    }]

        //    });
    }
});