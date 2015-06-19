Ext.define('TCSYS.ciq.cyjh', {
    extend: 'Ext.panel.Panel',
    xtype: "cyjh",
    title: '查验计划',
    closable: true,
    autoScroll:true,
    html: '<iframe id="frame_main" src="http://58.210.24.165/Projects/ZJGEportGuoJian/HaiGuan/BillHandle/BillToControl.aspx" width="100%" height="650" frameborder="0"></iframe>',
    initComponent: function () {
        this.callParent(arguments);
    }
});