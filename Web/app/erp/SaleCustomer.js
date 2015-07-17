//客户
Ext.define('TCSYS.erp.SaleCustomer', {
    extend: 'Ext.panel.Panel',
    title: '客户资料',
    name: 'SaleCustomer',
    alias: "widget.SaleCustomer",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        var store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'SaleCustomer_BLL/Get',
            addUrl: 'SaleCustomer_BLL/Insert',
            updateUrl: 'SaleCustomer_BLL/Update',
            deleteUrl: 'SaleCustomer_BLL/Delete',
            fields: [
                'CustomerNo',//not null
                'CustomerName',
                'CPerson',
                'CPhone',
                'CTelPhone',
                'CFAX',
                'ADRESS',
                'AreaCode',
                'AreaName',
                'Email',
                'Tariff',
                'BANK',
                'BANKNO',
                'Remarks'
            ]
        });
        var record = null;


        //新增窗口
        var complexMgrWindow = {
            xtype: 'datawindow',
            title: '客户资料',
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
                items: [{ xtype: 'textfield', name: 'CustomerNo', hidden: true }, {
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '基本信息',
                    items: [{
                        columnWidth: .45,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'CustomerName',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
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
                         //   allowBlank: false,
                         //   fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                         //   blankText: '该输入项为必输项',
                            colspan: 2,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'AreaCode',
                            xtype: 'searchfield',
                            store: 'SysAreaStore',
                            displayField: 'AreaName',
                            valueField: 'AreaCode',
                            margin: '5 0 5 0',
                            fieldLabel: '区域',
                            allowBlank: false,
                            blankText: '该输入项为必输项',
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            labelWidth: 50,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('AreaCode'));
                                            tigger.setValue(record.get('AreaName'));
                                        }
                                    }
                            }
                        }]
                    }, , {
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
                        columnWidth: .35,
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
                        columnWidth: .3,
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
                    }, {
                        columnWidth: .4,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'Email',
                            margin: '5 0 5 0',
                         //   allowBlank: false,
                            //fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                          //  blankText: '该输入项为必输项',
                            fieldLabel: 'Email',
                            xtype: 'textfield',
                            maxLength: 30,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .6,
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
                        columnWidth: .4,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'BANK',
                            margin: '5 0 5 0',
                            fieldLabel: '开户行',
                            xtype: 'textfield',
                          //  regex: /^\d+(\.\d{1,2})?$/,
                           // regwxText: '位数超出限制',
                            maxLength: 14,
                            labelWidth: 50
                        }]
                    }, {
                        columnWidth: .6,
                        layout: 'form',
                        border: false,
                        baseCls: 'x-plain',
                        items: [{
                            name: 'BANKNO',
                            margin: '5 0 5 0',
                            fieldLabel: '银行账号',
                            xtype: 'textfield',
                         //   regex: /^\d+(\.\d{1,2})?$/,
                       //     regwxText: '位数超出限制',
                            maxLength: 30,
                            labelWidth: 50
                        }]
                    },   {
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
                            labelWidth: 90
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
                        //alert(formValues);
                        formValues.CustomerNo = me.BasicInfoPK;
                        if (this.up('window').operationType == "add") {
                            if (me.BasicInfoPK == null) {
                                store[currentWindow.operationType + "Data"]({ entity: formValues }, function (value) {
                                    //me.BasicInfoPK = value;
                                    //alert(formValues);
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
            itemId: 'saleCustomerSelect',
            //title: '查询条件',
            //collapsible: true,
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
                    name: 'CustomerName',
                    fieldLabel: '客户名称'
                }, {
                    xtype: 'textfield',
                    name: 'AreaName',
                    fieldLabel: '区域'
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
                    var object = Ext.ComponentQuery.query('[itemId="saleCustomerSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    //alert(obj);
                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                iconCls: "icon-add",
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(complexMgrWindow);
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    //store.removeAll();
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
               // linkFileName: 'R_STATUE',
                //linkValue: '1',
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(complexMgrWindow);
                        updateWindow.setOperationType('view');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('CustomerNo');
                        Ext.getCmp('btnSave').hidden = true;
                        updateWindow.show(this);
                    }

                }, {
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(complexMgrWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('CustomerNo');
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
                                        array.push(item.get('CustomerNo'));
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
                dataIndex: 'CustomerName',
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
                text: '区域',
                dataIndex: 'AreaName'
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
})