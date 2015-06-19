Ext.define('TCSYS.ciq.zongDanChaXunMgr', {
    extend: 'Ext.panel.Panel',
    xtype: "zongDanChaXunMgr",
    title: '总单查询',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/TG_All_List.aspx?Token=' + $USER.token + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});