Ext.define('TCSYS.maincontent.FirstPage', {
    extend: 'Ext.panel.Panel',
    alias: "widget.maincontent_firstpage",
    itemId: 'firstPageItemId',
    title: '菜单',
    plain: true,
    hidden:false,
    layout: 'border',
    border: false,
    name: "firstpage",
    requires: ['TCSYS.maincontent.HomePageDataView','TCSYS.maincontent.Animated'],
    //requires: ['TCSYS.maincontent.HomePageDataView'],
    initComponent: function () {
        this.callParent(arguments);
        this.add({
            xtype: 'panel',
            region: 'center',
            border: false,
            autoScroll: true,
            items: [{
                xtype: 'homepagedataview'
            }
            ]
        });
    }
});