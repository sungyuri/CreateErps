Ext.define('TCSYS.ciq.chuJingMoRenMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "chuJingMoRenMgr",
    title: '出境默认信息',
    closable: true,
    autoScroll: true,
    //html: '<iframe id="frame_main" src="http://58.210.24.169:8080/webdecl/declList/impGoodsListAction.action" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.169:8080/webdecl/decl/iqDefaultInit!iQOutDefault.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});