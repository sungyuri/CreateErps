//供应商
Ext.define('TCSYS.erp.PurchaseSupplier', {
    extend: 'Ext.panel.Panel',
    title: '供应商资料',
    name: 'PurchaseSupplier',
    alias: "widget.PurchaseSupplier",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        var record = null;

        var store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'PurchaseSupplier_BLL/Get',
            addUrl: 'PurchaseSupplier_BLL/Insert',
            updateUrl: 'PurchaseSupplier_BLL/Update',
            deleteUrl: 'PurchaseSupplier_BLL/Delete',
            fields: [
                'SupplierNo',//not null
                'SupplierName',
                'CPerson',
                'CPhone',
                'CTelPhone',
                'CFAX',
                'ADRESS',
                'AreaCode',
                'Email',
                'Tariff',
                'BANK',
                'BANKNO',
                'Remarks'
            ]
        });

        //var qqq = {xtype:'datawindow',title:'XXXX',width:100};

        var PSupplierWindow = {
            xtype: 'datawindow',
            title: '供应商资料',
            store: store,
            resizable: false,
            items: [{
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 700,
                defaults: {
                    xtype: 'textfield'
                },
                items: [{ xtype: 'textfield', name: 'SupplierNo', hidden: true }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '基本信息',
                    items: [{
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'SupplierName',
                            margin: '5 0 5 0',
                            fieldLabel: '客户名称',
                            xtype: 'textfield',
                            maxLength: 50,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'CPerson',
                            margin: '5 0 5 0',
                            fieldLabel: '联系人',
                            xtype: 'textfield',
                            maxLength: 35,
                            colspan: 2,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'Email',
                            margin: '5 0 5 0',
                            fieldLabel: 'Email',
                            xtype: 'textfield',
                            maxLength: 30,
                            labelWidth: 50,
                            vtype:'email'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'CPhone',
                            margin: '5 0 5 0',
                            fieldLabel: '手机',
                            xtype: 'textfield',
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'CTelPhone',
                            margin: '5 0 5 0',
                            fieldLabel: '固定电话',
                            xtype: 'textfield',
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'CFAX',
                            margin: '5 0 5 0',
                            fieldLabel: '传真',
                            xtype: 'textfield',
                            maxLength: 20,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'ADRESS',
                            margin: '5 0 5 0',
                            fieldLabel: '地址',
                            xtype: 'textfield',
                            maxLength: 100,
                            labelWidth: 50
                        }]
                    },  {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'Tariff',
                            margin: '5 0 5 0',
                            fieldLabel: '税号',
                            xtype: 'textfield',
                            maxLength: 30,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'BANK',
                            margin: '5 0 5 0',
                            fieldLabel: '开户行',
                            xtype: 'textfield',
                            maxLength: 14,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'BANKNO',
                            margin: '5 0 5 0',
                            fieldLabel: '银行账号',
                            xtype: 'textfield',
                          //  regex: /^\d{19}?$/,
                          //  regwxText: '请输入19位银行账号',
                            maxLength: 30,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'Remarks',
                            margin: '5 0 5 0',
                            fieldLabel: '备注',
                            xtype: 'textarea',
                            maxLength: 100,
                            labelWidth: 50
                        }]
                    }]
                }//‘基本信息’fieldset结束

                ]
            }],
            buttons: [{
                xtype: 'tbfill'
            }, {
                text: '保存',
                name: 'btnSave',
                id: 'btnSave',
                handler: function () {
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    if (!form.isValid()) {
                        return;
                    }
                    else {
                        var formValues = form.getValues();
                        formValues.SupplierNo = me.BasicInfoPK;
                        if (this.up('window').operationType == "add") {
                            if (me.BasicInfoPK == null) {
                                store[currentWindow.operationType + "Data"]({ entity: formValues }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                });
                            }
                            else {
                                store["updateData"]({ entity: formValues }, function (value) {
                                    me.BasicInfoPK = value;
                                    if (value != '-1') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                });
                            }
                        }
                        else {
                            store["updateData"]({ entity: formValues }, function (value) {
                                me.BasicInfoPK = value;
                                if (value != '-1') {
                                    Ext.shortAlert('操作成功');
                                    store.load();
                                    currentWindow.close();
                                } else {
                                    Ext.shortAlert('操作失败');
                                };
                            });
                        }
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    this.up('window').close();
                }
            }]
        };


        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'supplierSelect',
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
                    name: 'SupplierName',
                    fieldLabel: '供应商名称',
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
                iconCls: 'icon-search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="supplierSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                iconCls: "icon-add",
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(PSupplierWindow);
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    record = null;
                    addWindow.show(this);
                    me.BasicInfoPK = null;
                }
            }
            ],
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 120,
                itemId: 'lc',
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(PSupplierWindow);
                        updateWindow.setOperationType('view');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SupplierNo');
                        Ext.getCmp('btnSave').hidden = true;
                        updateWindow.show(this);
                    }

                }, {
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(PSupplierWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SupplierNo');
                        updateWindow.show(this);
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
                                        array.push(item.get('SupplierNo'));
                                    });
                                    store.deleteData({ strID: array.join(',') }, function () {
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
                dataIndex: 'SupplierName',
                width: 180,
                text: '客户名称'
            }, {
                dataIndex: 'CPerson',
                text: '联系人'
            }, {
                text: '联系电话',
                dataIndex: 'CPhone'
            }, {
                text: '传真',
                dataIndex: 'CFAX'
            }, {
                text: '电子邮件',
                dataIndex: 'Email'
            }, {
                text: '税号',
                width: 120,
                dataIndex: 'Tariff'
            }, {
                text: '开户行',
                dataIndex: 'BANK'
            }, {
                text: '银行账号',
                width: 120,
                dataIndex: 'BANKNO'
            }, {
                text: '地址',
                width: 200,
                dataIndex: 'ADRESS'
            }]
        });
    }
});