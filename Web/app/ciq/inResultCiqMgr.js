Ext.define('TCSYS.ciq.inResultCiqMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "inResultCiqMgr",
    title: '入境回执',
    closable: true,
    autoScroll:true,
    //html: '<iframe id="frame_main" src="http://58.210.24.172:8080/webdecl/responseList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.169:8080/webdecl/responseList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    //html: '<iframe id="frame_main" src="http://10.35.2.74:8888/webdecl_tc/responseList/impGoodsListAction.action?userid=' + $USER.userId + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});