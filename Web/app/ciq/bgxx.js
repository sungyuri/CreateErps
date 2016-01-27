Ext.define('TCSYS.ciq.bgxx', {
    extend: 'Ext.panel.Panel',
    xtype: "bgxx",
    title: '报关信息管理',
    closable: true,
    autoScroll: true,
    //html: '<iframe id="frame_main" src="http://192.168.118.77:8080/Projects/ZJGEportGuoJian/DaiLi/Delivery_HGOrder_List.aspx" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/Delivery_HGOrder_List.aspx?Token=' + $USER.token + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});