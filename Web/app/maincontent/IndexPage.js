Ext.define('TCSYS.maincontent.IndexPage', {
    extend: 'Ext.panel.Panel',
    alias: "widget.maincontent_indexPage",
    itemId: 'indexPageItemId',
    title: '主页',
    plain: true,
    layout: 'border',
    border: false,
    name: 'maincontent_indexPage',
    requires: ['TCSYS.maincontent.IndexPanel'],
    initComponent: function () {
        this.callParent(arguments);
        this.add({
            xtype: 'panel',
            region: 'center',
            layout:'fit',
            border: false,
            autoScroll: true,
           
            items: [{
                xtype: 'indexpanel',
                bodyStyle: {
                }
            }]

        });
    }
});