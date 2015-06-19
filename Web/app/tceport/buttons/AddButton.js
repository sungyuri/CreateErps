Ext.define("TCEPORT.buttons.AddButton", {
    extend: "Ext.button.Button",
    alias: "widget.addbutton",
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            text: "新增",
            name:'addButton',
            iconCls: "icon-add"
        });
        this.callParent([config]);
    }
});