Ext.define("TCEPORT.buttons.UpdateButton", {
    extend: "Ext.button.Button",
    alias: "widget.updatebutton",
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            text: "修改",
            name:'updateButton',
            iconCls: "icon-edit"
        });
        this.callParent([config]);
    }
});