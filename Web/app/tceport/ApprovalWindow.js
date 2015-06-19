//审批窗口

Ext.define("TCEPORT.ApprovalWindow", {
    extend: "Ext.window.Window",
    xtype: "approvalwindow",
    layout: 'fit',
    resizable: false,
    modal: true,
    constructor: function (cfg) {
        var config = Ext.apply({}, cfg);
        this.store = config.store;
        this.callParent([config]);
    },
    initComponent: function () {
        this.callParent(arguments);
    },
    setOperationType: function (type) {
        if (type == "approval") {
            this.setTitle("审批" + this.title);
            this.operationType = "approval";
        }
    }
});