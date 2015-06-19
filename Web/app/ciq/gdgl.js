Ext.define('TCSYS.ciq.gdgl', {
    extend: 'Ext.panel.Panel',
    xtype: "gdgl",
    title: '改单管理',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/HaiGuan/Assiant/SpcialMod.aspx?Token=' + $USER.token + '" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});