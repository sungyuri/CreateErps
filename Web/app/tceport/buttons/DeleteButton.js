Ext.define("TCEPORT.buttons.DeleteButton", {
    extend: "Ext.button.Button",
    alias: "widget.deletebutton",
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            text: "删除",
            name:'deleteButton',
            iconCls: "icon-remove"
        });
        this.callParent([config]);
    }
});