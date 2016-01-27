Ext.define('TCEPORT.SearchBoxNoWindow', {
    extend: 'Ext.window.Window',
    title: '请选择:',
    alias: 'widget.SearchBoxNoWindow',
    modal: true,
    config: {
        displayField: null,
        valueField: null
    },
    constructor: function (cfg) {
        var config = {};
        Ext.apply(config, cfg);
        if (config.store) {
            var storeCfg = { autoLoad: true };
            if ((!cfg.firstLoad) && (cfg.firstLoad != null)) {
                var storeCfg = {};
            }
            else {
                var storeCfg = {};
            }
            if (config.store.pageSize != null) {
                storeCfg.pageSize = config.store.pageSize;
            }
            if (config.store.url != null) {
                storeCfg.url = config.store.url;
            }
            if (config.store.model != null) {
                storeCfg.fields = config.store.model.getFields();
            }

            this.store = Ext.create('TCEPORT.Store', storeCfg);

            if (cfg.extraParams != null) {
                this.store.load({
                    params: cfg.extraParams
                });
            }
            else {
                this.store.load();
            }
            delete config.store;
        }
        config.items = this.buildItems();
        this.callParent([config]);
        this.initConfig(config);
    },
    initComponent: function () {
        var me = this;
        me.callParent();
    },
    buildItems: function () {
        var me = this;
        var trackGrid = Ext.create('TCEPORT.DataGrid', {
            border: false,
            id: 'TCEPORT.SearchBoxNoWindow.grid.id',
            height: 330,
            store: this.store,
            forceFit: true,
            columns: me.buildColumns(),
            viewConfig: {
                listeners: {
                    itemkeydown: function (view, record, item, index, e) {
                        if (e.getKey() == 13) {
                            me.windowSelectItemAction(null, record);
                        }
                        var pagingToolBar = view.up('grid').query('pagingtoolbar');
                        if (pagingToolBar != null && pagingToolBar.length > 0) {
                            pagingToolBar = pagingToolBar[0];
                        }
                        if (e.getKey() == e.LEFT) {
                            pagingToolBar.movePrevious();
                        }

                        if (e.getKey() == e.RIGHT) {
                            pagingToolBar.moveNext();
                        }
                        view.focus(false, 500);
                    }
                }
            },
            listeners: {
                'itemclick': function (sender, record, html, index, e, opt) {
                    me.windowSelectItemAction(sender, record, html, index, e, opt);
                }
            }
        });


        var panel = {
            xtype: 'panel',
            layout: 'vbox',
            border: false,
            items: [{
                layout: 'hbox',
                border: false,
                items: [{
                    xtype: 'textfield',
                    margin: '10 20 10 10',
                    labelWidth: 120,
                    width: 350,
                    fieldLabel: '输入相关条件过滤',
                    name: '__searchText',
                    listeners: {
                        afterrender: function (sender) {
                            this.focus(false, 1000);
                        },
                        change: function (sender, newValue, oldValue, obj) {
                            me.store.load({ params: {
                                name: newValue
                            }
                            });
                        },
                        specialkey: function (sender, e, obj) {
                            this.focus(false, 1000);
                            var grid = me.down('grid');
                            var currentKey = e.getKey();
                            var index = -1;

                            var record = grid.getSelectionModel().getSelection();
                            if (record == null || record.length == 0) {
                                record = null;
                            }
                            else {
                                record = record[0];
                            }

                            if (record != null) {
                                index = me.store.indexOf(record);
                            }

                            if (currentKey == e.DOWN) {
                                index++;
                                if (index >= me.store.getCount()) {
                                    return;
                                }
                                grid.getSelectionModel().select(index);
                            }
                        }
                    }
                }, {
                    xtype: 'button',
                    text: '查询',
                    margin: '10 10 10 10',
                    width: 80,
                    handler: function () {
                        var newValue = me.down('textfield[name="__searchText"]').getValue();
                        me.store.load({ params: { name: newValue} });
                    },
                    scope: me
                }]
            }, {
                border: false,
                width: 560,
                items: [trackGrid]
            }]
        };
        return panel;
    },

    buildColumns: function () {
        var columnArray = [];
        var fields = this.store.model.getFields();
        var column;
        for (var i = 0; i < fields.length - 1; i++) {
            column = {};
            column.dataIndex = fields[i].name;
            if (fields[i].displayInGrid)
                column.text = fields[i].displayInGrid;
            if (fields[i].hidden && fields[i].hidden == true) {
                column.hidden = true;
            }
            if (fields[i].flex) {
                column.flex = fields[i].flex;
            }
            if (fields[i].hidden) {
                column.hidden = fields[i].hidden;
            }
            columnArray.push(column);
        }

        return columnArray;
    },

    buildButtons: function () {
        if (!config.buttons) {
            var buttons = [{
                text: "确认",
                name: "confirm",
                handler: this.confirm,
                scope: this
            }, {
                text: "取消",
                name: "cancel",
                handler: this.cancel,
                scope: this
            }];
            return buttons;
        }
        else {
            delete config.buttons;
            return config.buttons;
        }
    },

    cancel: function () {
        this.close();
    },

    confirm: function () {
        var me = this;
        var selModel = this.query('grid')[0].getSelectionModel();
        me.selectItemAction('', selModel);
    },

    windowSelectItemAction: function (sender, record, html, index, e, opt) {
        var selectedRecord = record;
        if (selectedRecord == null) {
            Ext.Msg.alert('提示', '请选择一条记录!');
            return;
        }
        if (!this.searchField) {
            this.fireEvent('gridItemClick', selectedRecord);
        } else {
            this.searchField.fireEvent('gridItemClick', selectedRecord);
        }

        var displayField = this.getDisplayField();
        var valueField = this.getValueField();

        var displayValue = null;
        if (Ext.typeOf(displayField) == "string") {
            displayValue = selectedRecord.get(displayField);
        }

        var valueFieldValue = "";
        if (Ext.typeOf(valueField) == "string") {
            valueFieldValue = selectedRecord.get(valueField);
        }
        if (this.searchField) {
            this.searchField.setbyWindow = true;
            if (this.needBrackets != null) {
                if (!this.needBrackets)
                    this.searchField.setValue(displayValue);
            }
            else {
                this.searchField.setValue(displayValue);
            }
            this.searchField.setHiddenValue(valueFieldValue);       
        }
        this.searchField.focus();
        this.cancel();

    }
});