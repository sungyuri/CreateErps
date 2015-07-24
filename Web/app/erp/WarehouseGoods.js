//库存
Ext.define('TCSYS.erp.WarehouseGoods', {
    extend: 'Ext.panel.Panel',
    title: '客户资料',
    name: 'WarehouseGoods',
    alias: "widget.WarehouseGoods",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        var rec = null;

        var storeWarehouseGoods = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'WarehouseGoods_BLL/Get',
            addUrl: 'WarehouseGoods_BLL/Insert',
            updateUrl: 'WarehouseGoods_BLL/Update',
            deleteUrl:'WarehouseGoods_BLL/Delete',
            fields: [
                'GoodsCode',
                'GoodsVersion',
                'GoodsNo',
                'GoodsName',
                'GoodsCount',
                'GoodsUnit',
                'Manufacturer',
                'GoodsTypeCode',
                'GoodsTypeName',
                'WarehouseCode',
                'WarehouseName',
                'GoodsNote'
            ]
        });
                

        var modifyWindow = {
            xtype: 'datawindow',
            title: '修改',
            store: storeWarehouseGoods,
            resizeable: false,
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
                                storeWarehouseGoods[currentWindow.operationType + 'Data']({ entity: formValues }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        storeWarehouseGoods.load();
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            } else {
                                storeWarehouseGoods['updateData']({ entity: formValues, type: null }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        storeWarehouseGoods.load();
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
                height:160,
                autoScroll: true,
                id: 'formId',
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '库存信息',
                    items: [{
                        columnWidth: 1,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsCode',
                            margin: '5 0 5 0',
                            fieldLabel: 'GoodsCode',
                            id: 'goodsC',
                            hidden: true
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsVersion',
                            margin: '5 0 5 0',
                            fieldLabel: '货物型号',
                            readOnly: true,
                            id:'goodsV'
                            //labelWidth: 80
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: '',
                            displayField: '',
                            valueField: '',
                            //xtype: 'textfield',
                            name: 'GoodsTypeCode',
                            margin: '5 0 5 0',
                            fieldLabel: '货物类型代码',
//                            allowBlank: false,
//                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
//                            blankText: '该输入项为必输项',
                            editable: false,
                            //labelWidth: 85,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record = this.up('window').wrecord;
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get(''));
                                            tigger.setValue(rec.get(''));
                                        }
                                    }
                            }
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: '',
                            displayField: '',
                            valueField: '',
                            name: 'WarehouseCode',
                            margin: '5 0 5 0',
                            fieldLabel: '仓库代码',
//                            allowBlank: false,
//                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
//                            blankText: '该输入项为必输项',
                            editable: false,
                            labelWidth: 80,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record=this.up('window').wrecord
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get(''));
                                            tigger.setValue(rec.get(''));
                                        }
                                    }
                            }
                        }]
                    },  {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsNo',
                            margin: '5 0 5 0',
                            fieldLabel: '货物编号'
                        }]
                    },
                    {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'datefield',
                            name: 'GoodsName',
                            margin: '5 0 5 0',
                            fieldLabel: '货物名称'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'numberfield',
                            name: 'GoodsCount',
                            margin: '5 0 5 0',
                            fieldLabel: '货物数量',
                            labelWidth: 80
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsUnit',
                            margin: '5 0 5 0',
                            fieldLabel: '货物单位',
                            vtype:'email'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'Manufacturer',
                            margin: '5 0 5 0',
                            fieldLabel: '生产厂家',
                            maxLength:11
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textarea',
                            name: 'GoodsNote',
                            editable:false,
                            margin: '5 0 5 0',
                            labelWidth: 80,
                            fieldLabel: '备注'
                        }]
                    }]
                }]}]
            
        };


        this.add({
            border: false,
            store: storeWarehouseGoods,
            xtype: 'form',
            itemId: 'searchGoods',
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
                    name: 'GoodsCode',
                    fieldLabel: '货物代码'
                }]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store:storeWarehouseGoods,
            forceFit: false,
            tbar: [{
                text: '查询',
                xtype: 'button',
                iconCls: 'icon-Search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="searchGoods"]')[0];
                    var form = object.getForm();
                    var obj = form.getValues();
                    storeWarehouseGoods.load({ params: obj });
                }
            }, {
                text: '新增',
                xtype: 'button',
                iconCls: 'icon-Add',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(modifyWindow);
                    addWindow.setOperationType('add');
                    addWindow.show(this);
                    storeWarehouseGoods.load();
                }
            }],
            columns: [{
                xtype: 'linkColumn',
                text: '操作',
                width: 120,
                items: [
//                {
//                    linkText: '权限',
//                    handler: function (grid, rowIndex, colIndex, sender) {
//                        var UC = grid.getStore().getAt(rowIndex);
//                        var AWindow = Ext.ComponentMgr.create(Ext.create('TCSYS.maincontent.MoreMenu', {
//                            title: '功能菜单',
//                            usercode: UC.get('UserCode')
//                        }));
//                        //AWindow.usercode = UC.get('UserCode');
//                        AWindow.show(this);
//                    }
//                },
                 {
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        rec = grid.getStore().getAt(rowIndex);
                        var MWindow = Ext.ComponentMgr.create(modifyWindow);
                        //modifyWindow.wrecord = null;
                        modifyWindow.wrecord = rec;
                        MWindow.setOperationType('update');
                        MWindow.down('form').loadRecord(rec);
                        MWindow.show(this);
                    }
                }]
            }, {
                dataIndex: 'GoodsCode',
                text: 'GoodsCode',
                hidden:true
            }, {
                dataIndex: 'GoodsVersion',
                text: '货物型号',
                align: 'center'
            }, {
                dataIndex: 'GoodsNo',
                text: '货物编号',
                align: 'center'
            }, {
                dataIndex: 'GoodsName',
                text: '货物名称',
                align: 'center',
                width:150
            }, {
                dataIndex: 'GoodsCount',
                text: '货物数量',
                align: 'center',
                width: 150
            }, {
                dataIndex: 'GoodsUnit',
                text: '货物单位',
                align: 'center'
            }, {
                dataIndex: 'Manufacturer',
                text: '生产厂家',
                align: 'center'
            }, {
                dataIndex: 'GoodsTypeCode',
                text: '货物类型代码',
                align:'center'
            }, {
                dataIndex: 'WarehouseCode',
                text: '仓库类型代码',
                align:'center'
            }, {
                dataIndex: 'GoodsNote',
                text: '备注',
                align:'center'
            }]
        });
    }
});