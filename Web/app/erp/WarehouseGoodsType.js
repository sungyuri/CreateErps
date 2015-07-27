//货物类型
Ext.define('TCSYS.erp.WarehouseGoodsType', {
    extend: 'Ext.panel.Panel',
    title: '货物类型管理',
    name: 'WarehouseGoodsType',
    alias: "widget.WarehouseGoodsType",
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
            fields: ['GoodsTypeCode','GoodsTypeName']
        });

        var window = {
            xtype: 'datawindow',
            title: '货物类型',
            store: store,
            id:'mW',
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
                        if (!userInfoWindow.isValid) { return; } else {
                            var formValues = userInfoWindow.getValues();
                            if (currentWindow.operationType == 'add') {
                                store[currentWindow.operationType + 'Data']({ entity: formValues }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        store.load();
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            } else {
                                store['updateData']({ entity: formValues }, function (value) {
                                    if (value != '-1') {
                                        Ext.shortAlert('操作成功！');
                                        store.load();
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
                height:80,
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
                            name: 'GoodsTypeCode',
                            margin: '5 0 5 0',
                            fieldLabel: '类型代码',
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
                            name: 'GoodsTypeName',
                            itemId: 'ship_no_textfield',
                            margin: '5 0 5 0',
                            fieldLabel: '类型名称',
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
                    xtype: 'textfield',
                    name: 'GoodsTypeCode',
                    fieldLabel: '货物代码'
                }, {
                    xtype: 'textfield',
                    name: 'GoodsTypeName',
                    fieldLabel: '货物名称'
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
                    store.load({params:obj});
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
                        if (records != null) {
                            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                                if (check == "yes") {
                                    var array = [];
                                    Ext.Array.each(records, function (item) {
                                        array.push(item.get('GoodsTypeCode'));
                                    });
                                    store.deleteData({ strCode: array.join(',') }, function () {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                    });
                                }
                            });
                        } else {
                            Ext.Msg.alert('提示', '请先选中一条信息！');
                        }
                    }
                }]
            }, {
                dataIndex: 'GoodsTypeCode',
                text: '类型代码',
                readOnly: true,
                align:'center'
            }, {
                dataIndex: 'GoodsTypeName',
                text: '类型名称',
                align: 'center'
            }]
        });
    }
});