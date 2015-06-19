Ext.define('TCSYS.ciq.chaYanLianXiMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "chaYanLianXiMgr",
    title: '查验联系单',
    closable: true,
    autoScroll: true,
    //html: '<iframe id="frame_main" src="http://58.210.24.169:8080/webdecl/declList/impGoodsListAction.action" width="100%" height="650" frameborder="0"></iframe>',
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/NoticeManage/CheckNotice_List.aspx?Token=' + $USER.token+ '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});