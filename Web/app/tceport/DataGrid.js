Ext.define("TCEPORT.DataGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.datagrid",
    columnLines: true,
    margin: "0 0 0 0",
    bodyStyle: { "border": "1  0  0  0 " },
    bodyBorder: false,
    flex: 1,
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            showPaging: true
        });
        this.store = config.store;
        if (config.store && config.showPaging == true) {
            this.bbar = [{ xtype: 'tbfill' }, {
                xtype: "pagingtoolbar",
                displayInfo: true,
                isShowRefresh: cfg.isShowRefresh != null ? cfg.isShowRefresh : true,
                store: config.store,
                border: false
            }, { xtype: 'tbfill'}];
        };
        this.callParent([config]);
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});