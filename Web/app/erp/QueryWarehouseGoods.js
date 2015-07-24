//库存查询
Ext.define('TCSYS.erp.QueryWarehouseGoods', {
    extend: 'Ext.panel.Panel',
    title: '库存查询',
    name: 'QueryWarehouseGoods',
    alias: "widget.QueryWarehouseGoods",
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
            //addUrl: 'WarehouseGoods_BLL/Insert',
            //updateUrl: 'WarehouseGoods_BLL/Update',
            //deleteUrl: 'WarehouseGoods_BLL/Delete',
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
            title: '详细信息',
            store: storeWarehouseGoods,
            resizeable: false,
            id: 'mW',
            items: [{
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 600,
                //height: 160,
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
                            labelWidth: 80,
                            fieldLabel: '货物代码',
                            id: 'goodsC',
                            regex: /^\d+$/,
                            regexText: '只能是数字',
                            hidden: true
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsName',
                            margin: '5 0 5 0',
                            labelWidth: 80,
                            readOnly: true,
                            fieldLabel: '货物名称'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'GoodsNo',
                            margin: '5 0 5 0',
                            labelWidth: 80,
                            readOnly: true,
                            fieldLabel: '货物编号'
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
                            labelWidth: 80
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'GoodsTypeStore',
                            displayField: 'GoodsTypeName',
                            valueField: 'GoodsTypeCode',
                            name: 'GoodsTypeCode',
                            hideTrigger: true,
                            selectOnFocus: false,
                            readOnly:true,
                            margin: '5 0 5 0',
                            fieldLabel: '货物类型代码',
                            labelWidth: 80,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record = this.up('window').wrecord;
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get('GoodsTypeCode'));
                                            tigger.setValue(rec.get('GoodsTypeName'));
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
                            store: 'WarehouseTypeStore',
                            displayField: 'WarehouseName',
                            valueField: 'WarehouseCode',
                            name: 'WarehouseCode',
                            hideTrigger: true,
                            selectOnFocus: false,
                            margin: '5 0 5 0',
                            fieldLabel: '仓库代码',
                            readOnly:true,
                            labelWidth: 80,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record=this.up('window').wrecord
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get('WarehouseCode'));
                                            tigger.setValue(rec.get('WarehouseName'));
                                        }
                                    }
                            }
                        }]
                    },
                     {
                         columnWidth: .3,
                         layout: 'form',
                         baseCls: 'x-plain',
                         border: false,
                         items: [{
                             xtype: 'numberfield',
                             name: 'GoodsCount',
                             margin: '5 0 5 0',
                             fieldLabel: '货物数量',
                             readOnly:true,
                             labelWidth: 80
                         }]
                     }, {
                         columnWidth: .35,
                         layout: 'form',
                         baseCls: 'x-plain',
                         border: false,
                         items: [{
                             xtype: 'textfield',
                             name: 'GoodsUnit',
                             margin: '5 0 5 0',
                             fieldLabel: '货物单位',
                             labelWidth: 80,
                             readOnly: true
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
                             labelWidth: 80,
                             maxLength: 11,
                             readOnly: true
                         }]
                     }, {
                         columnWidth: 1,
                         layout: 'form',
                         baseCls: 'x-plain',
                         border: false,
                         items: [{
                             xtype: 'textfield',
                             name: 'GoodsNote',
                             editable: false,
                             margin: '5 0 5 0',
                             labelWidth: 80,
                             fieldLabel: '备注',
                             readOnly:true
                         }]
                     }]
                }]
            }]

        };


        this.add({
            border: false,
            store: storeWarehouseGoods,
            xtype: 'form',
            itemId: 'searchGoods',
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
                    name: 'GoodsName',
                    fieldLabel: '货物名称'
                }]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store: storeWarehouseGoods,
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
            }],
            columns: [{
                xtype: 'linkColumn',
                text: '操作',
                width: 120,
                items: [
                 {
                     linkText: '查看',
                     handler: function (grid, rowIndex, colIndex, sender) {
                         rec = grid.getStore().getAt(rowIndex);
                         var MWindow = Ext.ComponentMgr.create(modifyWindow);
                         //modifyWindow.wrecord = null;
                         modifyWindow.wrecord = rec;
                         MWindow.setOperationType('view');
                         MWindow.down('form').loadRecord(rec);
                         MWindow.show(this);
                     }
                 }]
            }, {
                dataIndex: 'GoodsCode',
                text: 'GoodsCode',
                hidden: true
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
                width: 150
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
                align: 'center'
            }, {
                dataIndex: 'WarehouseCode',
                text: '仓库类型代码',
                align: 'center'
            }, {
                dataIndex: 'GoodsNote',
                text: '备注',
                align: 'center'
            }]
        });
    }
});