//数据维护
Ext.define('TCSYS.erp.UpholdData', {
    extend: 'Ext.panel.Panel',
    title: '类型维护',
    name: 'UpholdData',
    alias: "widget.UpholdData",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        var rec = null;

        var store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'WarehouseGoods_BLL/GetGoods',
            addUrl: 'WarehouseGoods_BLL/InsertGoodsType',
            updateUrl: 'WarehouseGoods_BLL/UpdateGoodsType',
            deleteUrl: 'WarehouseGoods_BLL/DeleteGoodsType',
            fields: ['Code', 'Name']
        });


        var storeUpholdItems = new Ext.data.ArrayStore({
            fields: ['key', 'value'],
            data: [['货物类型', 'SysGoodsType'], ['客户区域', 'SysArea'],['部门维护','SysDepart'],['职位维护','SysPosition']]
        });

        var window = {
            xtype: 'datawindow',
            title: '类型',
            store: store,
            id: 'mW',
            items: [{
                xtype: 'toolbar',
                border: false,
                items: [{
                    text: '保存',
                    name: 'btnSave',
                    id: 'btnSave',
                    iconCls: 'icon-Save',
                    xtype: 'button',
                    handler: function () {
                        var currentWindow = this.up('window');
                        var userInfoWindow = Ext.getCmp('formId').getForm();
                        var type = Ext.getCmp('selectedItem').value;
                        if (!userInfoWindow.isValid) { return; } else {
                            var formValues = userInfoWindow.getValues();//{Code: "", Name: ""}
                            if (currentWindow.operationType == 'add') {
                                store[currentWindow.operationType + 'Data']({ entity: formValues, type: type }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                                        var form = object.getForm();
                                        var obj = form.getValues();
                                        store.load({ params: obj });
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            } else {
                                store['updateData']({ entity: formValues, type: type }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                                        var form = object.getForm();
                                        var obj = form.getValues();
                                        store.load({ params: obj });
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            }
                        }
                    }
                }]
            }, {
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 600,
                height: 80,
                autoScroll: true,
                id: 'formId',
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '用户信息',
                    items: [{
                        columnWidth: .5,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'Code',
                            margin: '5 0 5 0',
                            fieldLabel: '代码',
                            id: 'userC',
                            readOnly: true
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'Name',
                            itemId: 'ship_no_textfield',
                            margin: '5 0 5 0',
                            fieldLabel: '名称',
                            id: 'userN'
                        }]
                    }]
                }]
            }]
        }


        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'searchGoodsType',
            title: '查询条件',
            collapsible: true,
            layout: {
                type: 'vbox'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'panel',
                border: false,
                margin: "5 0 5 0",
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    width: '20%'
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: '维护项目',
                    name: 'selectedItem',
                    forceSelection: true,
                    editable: false,
                    allowBlank: false,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '请选择一项后进行维护',
                    emptyText: '请选择...',
                    store: storeUpholdItems,
                    valueField: 'value',
                    displayField: 'key',
                    id: 'selectedItem',
                    //selectOnFocus: true,//文本全选
                    listeners: {
                        select: function (combo, records) {
                            var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                            var form = object.getForm();
                            //form.reset();
                            var obj = form.getValues();
                            store.load({ params: obj });
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'Code',
                    id: 'code',
                    fieldLabel: '代码',
                    listeners: {
                        change: function () {
                            var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                            var form = object.getForm();
                            var obj = form.getValues();
                            store.load({ params: obj });
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'Name',
                    id: 'name',
                    fieldLabel: '名称',
                    listeners: {
                        change: function () {
                            var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                            var form = object.getForm();
                            var obj = form.getValues();
                            store.load({ params: obj });
                        }
                    }
                }]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store: store,
            forceFit: false,
            tbar: [{
                text: '查询',
                xtype: 'button',
                iconCls: 'icon-Search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({ params: obj });
                }
            }, {
                text: '新增',
                xtype: 'button',
                iconCls: 'icon-Add',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(window);
                    addWindow.setOperationType('add');
                    addWindow.show(this);
                    store.load();
                }
            }],
            columns: [{
                xtype: 'linkColumn',
                text: '操作',
                width: 120,
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        rec = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(window);
                        updateWindow.setOperationType('view');
                        updateWindow.callerComp = sender;
                        updateWindow.down('toolbar').down('button').disabled = true;
                        updateWindow.down('form').loadRecord(rec);
                        me.BasicInfoPK = rec.get('GoodsTypeCode');
                        updateWindow.show(this);
                    }
                }, {
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        rec = grid.getStore().getAt(rowIndex);
                        var MWindow = Ext.ComponentMgr.create(window);
                        MWindow.setOperationType('update');
                        MWindow.down('form').loadRecord(rec);
                        MWindow.show(this);
                    }
                }, {
                    linkText: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                        var records = grid.getStore().getAt(rowIndex);
                        var type = Ext.getCmp('selectedItem').value;
                        if (records != null) {
                            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                                if (check == "yes") {
                                    var array = [];
                                    Ext.Array.each(records, function (item) {
                                        array.push(item.get('Code'));
                                    });
                                    store.deleteData({ strCode: array.join(','), type: type }, function () {
                                        Ext.shortAlert('操作成功');
                                        var object = Ext.ComponentQuery.query('[itemId="searchGoodsType"]')[0];
                                        var form = object.getForm();
                                        var obj = form.getValues();
                                        store.load({ params: obj });
                                    });
                                }
                            });
                        } else {
                            Ext.Msg.alert('提示', '请先选中一条信息！');
                        }
                    }
                }]
            }, {
                dataIndex: 'Code',
                text: '类型代码',
                readOnly: true,
                align: 'center'
            }, {
                dataIndex: 'Name',
                text: '类型名称',
                align: 'center'
            }]
        });
    }
});