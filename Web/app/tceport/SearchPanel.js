Ext.define("TCEPORT.SearchPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.searchpanel",
    //        bodyPadding: "10 0 0 10",
    //        margin: '0 0 5 0',
    title: '检索条件',
    titleCollapse: true,
    border: false,
    collapsible: this.collapsible || true,
    collapsed: this.collapsed || true,
    constructor: function (cfg) {
        var config = Ext.apply({}, cfg);
        Ext.applyIf(config, {
            layout: {
                type: "vbox"
                //                                ,
                //                                align: "center"
            }
        });
        this.store = config.store;
        config.defaults = config.defaults != undefined ? config.defaults : null;
        config.items = this.buildFormPanel(config);
        this.callParent([config]);
    },
    initComponent: function () {
        this.callParent(arguments);
        this.form = this.down('form').getForm();
    },

    buildFormPanel: function (config) {
        var me = this;
        var formpanel = {
            xtype: "form",
            border: false,
            margin: "5 0 0 0",
            baseCls: 'x-plain',
            layout: {
                type: "table",
                columns: config.columns == null ? 1 : config.columns,
                tdAttrs: {
                    style: {
                    //                        "padding-right": "2px"
                }
            }
        }
    };
    if (config.items) {
        formpanel.items = config.items;
        delete config.items;
    };
    if (!config.bbar) {
        formpanel.buttons = me.buildButtonPanel();
        delete config.bbar;
    };
    return formpanel;
},
buildButtonPanel: function () {
    var me = this;
    var buttons = [{ xtype: 'tbfill' }, {
        xtype: "button",
        text: "查询",
        width: 100,
        name: 'search',
        margin: '0 40 0 0',
        iconCls: 'icon-search',
        scope: me,
        listeners: {
            'click': {
                fn: this.search,
                scope: this
            }
        }
    }, {
        xtype: "button",
        text: "重置",
        iconCls: 'icon-no',
        width: 100,
        handler: me.searchCancel,
        scope: me
    }, { xtype: 'tbfill'}];
    return buttons;
},

search: function () {
    if (!this.form.isValid()) {
        return;
    }
    var value = this.form.getValues();
    this.store.proxy.extraParams = null;
    this.store.currentPage = 1;
    this.store.load({ params: value });
},
searchCancel: function () {
    this.form.reset();
}

});