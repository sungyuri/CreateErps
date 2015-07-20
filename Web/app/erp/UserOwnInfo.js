//个人信息维护
Ext.define('TCSYS.erp.UserOwnInfo', {
    extend: 'Ext.panel.Panel',
    title: '客户资料',
    name: 'SaleCustomer',
    alias: "widget.UserOwnInfo",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
    }
});