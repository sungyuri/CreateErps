Ext.define('TCSYS.ciq.hwmtdy', {
    extend: 'Ext.panel.Panel',
    xtype: "hwmtdy",
    title: '货物码头维护',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/DaiLi/Declare_Dock.aspx?Token=' + $USER.token + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});