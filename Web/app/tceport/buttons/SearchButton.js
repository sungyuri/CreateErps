Ext.define("TCEPORT.buttons.SearchButton", {
    extend: "Ext.button.Button",
    alias: "widget.searchbutton",
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        Ext.applyIf(config, {
            text: "查询",
            name: 'addButton',
            iconCls: "icon-search",
            listeners: {
                'click': {
                    fn: this.search,
                    scope: this
                }
            }
        });
        this.store = config.store;
        this.callParent([config]);
    },
    initComponent: function () {
        this.callParent(arguments);
    },
    search: function () {
        this.form = this.up().up().up().down('form').getForm();
        this.store = this.up().up().up().down('form').store;
        if (!this.form.isValid()) {
            return;
        }
        var value = this.form.getValues();
        this.store.proxy.extraParams = null;
        this.store.currentPage = 1;
        this.store.load({ params: value });
    }
});