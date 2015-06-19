Ext.define('TCSYS.ciq.bjxx', {
    extend: 'Ext.panel.Panel',
    xtype: "bjxx",
    title: '报检信息管理',
    closable: true,
    autoScroll: true,
    //html: '<iframe id="frame_main" src="http://192.168.118.77:8080/Projects/ZJGEportGuoJian/DaiLi/Delivery_Order_List.aspx" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/Delivery_Order_List.aspx?Token=' + $USER.token + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});