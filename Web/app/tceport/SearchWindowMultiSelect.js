Ext.define('TCEPORT.SearchWindowMultiSelect', {
    extend: 'Ext.window.Window',
    title: '请选择:',
    alias: 'widget.searchwindowmultiselect',
    resizable: false,
    matchFieldWidth: false,
    modal: true,
    store: null,
    width: 770,
    updateStore: null,
    pageSize: null,
    constructor: function (cfg) {
        var me = this;
        var config = {};
        Ext.apply(config, cfg);
        if (config.multiSelect != null) {
            this.multiSelect = config.multiSelect;
        }
        if (config.store) {
            this.store = config.store;
            var storeCfg = {};
            if (cfg.pageSize != null) {
                storeCfg.pageSize = cfg.pageSize;
            }
            if (cfg.pageSize != null) {
                this.store.pageSize = cfg.pageSize;
            }
            this.store = config.store;
            this.store.load({
                params: cfg.extraParams
            });
            delete config.store;
        }

        //创建updateStore
        config.updateStore.removeAll();
        if (config.updateStore) {
            this.updateStore = config.updateStore;
            var storeCfg = {

        };
        this.updateStore = config.updateStore;
        if (cfg.value != undefined) {
            this.updateStore.load({
                params: { data: cfg.value }
            });
        }
    }
    delete config.updateStore;

    config.items = this.buildItems();
    config.buttons = this.buildButtons(config);
    this.callParent([config]);
},
buildItems: function () {
    var me = this;
    var panel = {
        xtype: 'panel',
        border: false,
        height: 350,
        layout: 'hbox',
        bodyStyle: {
            'background': 'transparent'
        },
        items: [{
            border: false,
            bodyStyle: {
                'background': 'transparent'
            },
            items: [{
                xtype: 'textfield',
                margin: '10 0 10 10',
                labelWidth: 120,
                width: 300,
                fieldLabel: '输入相关条件过滤',
                name: '__searchText',
                listeners: {
                    render: function () {
                        this.focus(false, 500);
                    },
                    change: function (sender, newValue, oldValue, obj) {
                        var param = me.extraParams;
                        param.name = newValue;
                        me.store.load({ params: param });
                    },
                    specialkey: function (sender, e, obj) {
                        var grid = me.down('datagrid');
                        var currentKey = e.getKey();
                        var index = -1;
                        if (currentKey != e.UP && currentKey != e.DOWN && currentKey != e.ENTER && currentKey != e.PAGE_UP && currentKey != e.PAGE_DOWN) {
                            return;
                        }

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

                        else if (currentKey == e.UP) {
                            index--;
                            if (index <= 0) {
                                index = 0;
                            }
                            grid.getSelectionModel().select(index);
                        }
                        if (currentKey == e.ENTER) {
                            var onlyOne = grid.store.getCount();
                            var finalRecord;
                            if (onlyOne == 1) {
                                record = grid.store.getAt(0);
                                grid.getSelectionModel().select(0);
                            }
                            me.selectItemAction('', record);
                        }

                        var pagingToolBar = grid.query('pagingtoolbar');
                        if (pagingToolBar != null && pagingToolBar.length > 0) {
                            pagingToolBar = pagingToolBar[0];
                        }
                        if (currentKey == e.PAGE_UP) {
                            pagingToolBar.movePrevious();
                        }

                        if (currentKey == e.PAGE_DOWN) {
                            pagingToolBar.moveNext();
                        }

                    }
                }
            }, {
                border: false,
                bodyStyle: {
                    'background': 'transparent'
                },
                items: [{
                    xtype: 'datagrid',
                    height: 300,
                    name: 'originalGrid',
                    margin: '0 10 10 10',
                    width: 300,
                    store: me.store,
                    forceFit: true,
                    columns: me.buildColumns(),
                    listeners: {
                        'itemclick': function (sender, record, html, index, e, opt) {
                            var actualData = record.data;
                            var appendButton = me.down('button[name="append"]');
                            appendButton.setDisabled(false);
                            for (var i = 0; i < me.updateStore.getCount(); i++) {
                                if (me.updateStore.data.items[i].get(me.valueField) == actualData[me.valueField]) {
                                    appendButton.setDisabled(true);
                                    break;
                                }
                                else {
                                    appendButton.setDisabled(false);
                                }
                            }
                        },
                        itemdblclick: function (sender, record, html, index, e, opt) {
                            var appendBtnState = me.down('button[name="append"]').disabled;
                            if (appendBtnState) {
                                return;
                            }
                            else {
                                me.addRecord();
                            }
                        }
                    }
                }]
            }]
        }, {
            layout: 'vbox',
            padding: '0',
            border: false,
            width: 120,
            bodyStyle: {
                'background': 'transparent'
            },
            items: [{
                xtype: 'button',
                text: '添加 >',
                name: 'append',
                margin: '60 35 60 35',
                width: 60,
                handler: me.addRecord,
                scope: me
            }, {
                xtype: 'button',
                text: '< 删除',
                name: 'remove',
                margin: '60 35 60 35',
                width: 60,
                handler: me.removeRecord,
                scope: me
            }],
            rowspan: 2
        }, {
            layout: 'vbox',
            padding: '0',
            border: false,
            bodyStyle: {
                'background': 'transparent'
            },
            items: [{
                html: '已选择:',
                margin: '10 10 5 10',
                bodyStyle: {
                    'background': 'transparent'
                },
                border: false
            }, {
                border: false,
                bodyStyle: {
                    'background': 'transparent'
                },
                items: [{
                    xtype: 'datagrid',
                    margin: '10 10 10 10',
                    name: 'copyGrid',
                    width: 300,
                    height: 300,
                    store: this.updateStore,
                    columns: me.buildColumns(),
                    forceFit: true,
                    listeners: {
                        'itemdblclick': function (sender, record, html, index, e, opt) {
                            me.removeRecord();
                        }
                    }
                }]

            }],
            rowspan: 2
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
        columnArray.push(column);
    }

    return columnArray;
},

buildButtons: function (config) {
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
    //提交格式 中文逗号隔开
    var displayFieldValue = [];
    var valueFieldValue = [];
    var paramsFieldValue = [];

    this.updateStore.each(function (value) {
        displayFieldValue.push(value.get(me.displayField));
        valueFieldValue.push(value.get(me.valueField));
        paramsFieldValue.push(value.get('type'));
    });

    this.searchField.setValue(displayFieldValue.join(','));
    this.searchField.setHiddenValue(valueFieldValue.join(','));
    if (typeof (paramsFieldValue[0]) != 'undefined') {
        this.searchField.paramsValue = paramsFieldValue.join(',');
    }

    this.searchField.focus(false, 500);
    this.cancel();
},

addRecord: function () {
    var me = this;
    var selModel = this.down('datagrid[name="originalGrid"]').getSelectionModel();
    var selectRecord = selModel.getSelection()[0];

    var actualData = selectRecord.data;
    var appendButton = me.down('button[name="append"]');

    if (selModel.isSelected(selectRecord)) {
        var model = selectRecord.copy();
        this.updateStore.insert(0, model);
        this.updateStore.commitChanges();

        for (var i = 0; i < me.updateStore.getCount(); i++) {
            if (me.updateStore.data.items[i].get(me.valueField) == actualData[me.valueField]) {
                appendButton.setDisabled(true);
                break;
            }
            else {
                appendButton.setDisabled(false);
            }
        }
    }


},

removeRecord: function () {
    var selModel = this.down('datagrid[name="copyGrid"]').getSelectionModel();
    var selectRecord = selModel.getSelection()[0];
    if (selModel.isSelected(selectRecord)) {
        var model = selectRecord;
        this.updateStore.remove(model);
        this.updateStore.commitChanges();
    }
},

originalClick: function (sender, record, html, index, e, opt) {
    var actualData = record.data;
    var appendButton = this.down('button[name="append"]');
    if (this.updateStore.find(this.valueField, actualData[valuefield])) {
        appendButton.setDisabled(true);
    }
    else {
        appendButton.setDisabled(false);
    }
}
});