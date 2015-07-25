Ext.define("TCEPORT.DataWindow", {
    extend: "Ext.window.Window",
    xtype: "datawindow",
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
    
    getOperationType: function () {
        return this.operationType;
    },
    setOperationType: function (type) {
        var me = this;
        if (type == "add") {
            this.setTitle("新增" + this.title);
            this.operationType = "add";
        }

        if (type == "update") {
            this.setTitle("修改" + this.title);
            this.operationType = "update";
        }
        //add by zhangxh 添加明细
        if (type == "addDetail") {
            this.setTitle("新增" + this.title + "明细");
            this.operationType = "addDetail";
        }

        //add by zhangxh 修改明细
        if (type == "updateDetail") {
            this.setTitle("修改" + this.title + "明细");
            this.operationType = "updateDetail";
        }

        if (type == "approval") {
            this.setTitle(this.title);
            this.operationType = "approval";
            var forms = me.query('form');
            for (var i = 0; i < forms.length; i++) {
                var fields = forms[i].getForm().getFields();
                for (var i in fields.items) {
                    fields.items[i].setReadOnly(true);
                }
            }
        }

        if (type == "view") {
            this.setTitle("查看" + this.title);
            this.operationType = "view";
            var forms = me.query('form');
            for (var i = 0; i < forms.length; i++) {
                var fields = forms[i].getForm().getFields();
                for (var i in fields.items) {
                    fields.items[i].setReadOnly(true);
                }
            }
        }
    }
});