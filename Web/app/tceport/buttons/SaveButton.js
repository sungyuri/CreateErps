Ext.define("TCEPORT.buttons.SaveButton", {
    extend: "Ext.button.Button",
    alias: "widget.savebutton",
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            text: "保存",
            name: 'saveButton',
            iconCls: "icon-save"
        });
        this.callParent([config]);
    }
});