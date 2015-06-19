Ext.define('TCSYS.ciq.cdgl', {
    extend: 'Ext.panel.Panel',
    xtype: "cdgl",
    title: '车单关联',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/ETOLL/EcardToBill.aspx" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});