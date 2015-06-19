Ext.define('TCSYS.ciq.PeiTongRenYuanMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "PeiTongRenYuanMgr",
    title: '陪同人员维护',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/Person_List.aspx" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});