Ext.define('TCSYS.ciq.inCiqMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "inCiqMgr",
    title: '入境报检',
    closable: true,
    autoScroll: true,
    //http://58.210.24.172:8080/webdecl
    //http://192.168.0.3:8888/webdecl_tc
    //html: '<iframe id="frame_main" src="http://58.210.24.172:8080/webdecl/declList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    //html: '<iframe id="frame_main" src="http://192.168.118.29:8888/webdecl_tc/declList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.169:8080/webdecl/declList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});