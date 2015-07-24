//销售合同查询
Ext.define('TCSYS.erp.QuerySaleContract', {
    extend: 'Ext.panel.Panel',
    title: '销售合同查询',
    name: 'QuerySaleContract',
    alias: "widget.QuerySaleContract",
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
            url: 'SaleContract_BLL/Get',
            //addUrl: 'SaleContract_BLL/Insert',
            //updateUrl: 'SaleContract_BLL/Update',
            //  deleteUrl: 'SaleContract_BLL/Delete',
            fields: [
                'BillNo',
                'ContractCode',
                'CustomerNo',
                'CustomerName',
                'SignPlace',
                'SignDate',
                'ContractAmount',
                'ContractAmountBig',
                'DeliveryTime',
                'QA',
                'DeliveryWay',
                'PayWay',
                'OtherNote',
                'Remarks',
                'PurUserCode',
                'PurUserName',
                'StepNo',
                'StepName',
                'AppUserCode',
                'AppUserName',
                'IsPayoff',
                'IsAppEnd',
                'PaidAmount',
                'IsStorage',
                'CreateTime',
                'DETAILEDINFO'
            ]
        });

        var gridstore = Ext.create('TCEPORT.Store', {
            url: 'SaleContract_BLL/GetSaleContractDetail',
            fields: ['SaleBillNo', 'GoodsCode', 'GoodsVersion', 'GoodsName', 'GoodsNo', 'GoodsCount', 'GoodsUnit', 'OutGoodsCount', 'STATE', 'Manufacturer']
        });

        //  var flag = '';
        //  var updaterecord = null;
        //新增窗口
        var goodsRow = null;
        var SaleContractMgrWindow = {
            xtype: 'datawindow',
            title: '合同详细信息',
            store: store,
            record: null,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            items: [
                {
                    xtype: 'label',
                    margin: '5 0 5 300',
                    text: "工 矿 产 品 购 销 合 同",
                    baseCls: 'y-plain',
                    border: false
                },
            {
                xtype: 'form',
                baseCls: 'y-plain',
                border: false,
                width: 795,
                layout: {
                    type: 'table',
                    tdAttrs: {
                        style: {
                        }
                    },
                    columns: 3
                },
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                   {
                       name: 'CustomerNo',
                       margin: '0 0 5 0',
                       xtype: 'searchfield',
                       hideTrigger: true,
                       selectOnFocus: false,
                       readOnly: true,
                       fieldLabel: '需方',
                       displayField: 'CustomerName',
                       valueField: 'CustomerNo',
                       needCheck: true,
                       listeners: {
                           'gridItemClick': function (record) {
                               this.up('form').down('textfield[name="CustomerNo"]').setValue(record.get('CustomerNo'));
                               this.up('form').down('textfield[name="CustomerName"]').setValue(record.get('CustomerName'));
                           },
                           beforerender:
                                      function (tigger, opt) {
                                          var recd = this.up('window').record;
                                          if (recd) {
                                              tigger.setHiddenValue(recd.get('CustomerNo'));
                                              tigger.setValue(recd.get('CustomerName'));
                                          }
                                      }
                       },
                       store: 'ViewCustomerStore'
                   }, {
                       name: 'CustomerName',
                       margin: '0 0 5 0',
                       fieldLabel: '客户名',
                       hidden: true
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'ContractCode',
                       allowBlank: false,
                       blankText: '该输入项为必输项',
                       margin: '0 0 5 0',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       fieldLabel: '合同编号'
                   }, {
                       name: 'PurUserCode',
                       xtype: 'searchfield',
                       hideTrigger: true,
                       selectOnFocus: false,
                       readOnly: true,
                       fieldLabel: '销售员',
                       displayField: 'PurUserName',
                       valueField: 'PurUserCode',
                       needCheck: true,
                       listeners: {
                           'gridItemClick': function (record) {
                               this.up('form').down('textfield[name="PurUserCode"]').setValue(record.get('PurUserCode'));
                               this.up('form').down('textfield[name="PurUserName"]').setValue(record.get('PurUserName'));
                           },
                           beforerender:
                                      function (tigger, opt) {
                                          var recd = this.up('window').record;
                                          //alert(recd);
                                          if (recd) {
                                              tigger.setHiddenValue(recd.get('PurUserCode'));
                                              tigger.setValue(recd.get('PurUserName'));
                                          }
                                      }
                       },
                       store: 'ViewUserStore'
                   }, {
                       name: 'PurUserName',
                       hidden: true
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'SignPlace',
                       fieldLabel: '签订地点'
                   }, {
                       fieldLabel: '供方',
                       value: '太仓创造电子有限公司',
                       readonly: true
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'SignDate',
                       fieldLabel: '签订时间',
                       format: 'Y-m-d',
                       xtype: 'datefield'
                   }, {
                       name: 'ContractAmount',
                       xtype: 'numberfield',
                       hideTrigger: true,
                       fieldLabel: '合同总价',
                       value: 0,
                       maxValue: 99999999,
                       minValue: 0,
                       allowBlank: false,
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '请输入数字',
                       listeners: {
                           change: function (field, value) {
                               //  value = parseInt(value, 10);
                               //  field.setValue(value + value % 2);
                           }
                       }
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'DeliveryTime',
                       fieldLabel: '交货时间',
                       format: 'Y-m-d',
                       xtype: 'datefield',
                       allowBlank: false,
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '请选择时间'
                   }, {
                       name: 'ContractAmountBig',
                       xtype: 'label',
                       colspan: 3,
                       width: 780
                   }, {
                       name: 'QA',
                       fieldLabel: '质保条件',
                       colspan: 3,
                       width: 780
                   }, {
                       name: 'DeliveryWay',
                       fieldLabel: '交货方式',
                       colspan: 3,
                       width: 780
                   }, {
                       name: 'PayWay',
                       fieldLabel: '结算方式',
                       width: 780,
                       colspan: 3
                   }, {
                       name: 'OtherNote',
                       fieldLabel: '其他',
                       width: 780,
                       colspan: 3
                   }, {
                       name: 'DETAILEDINFO',
                       fieldLabel: '安装信息',
                       width: 780,
                       xtype: 'textarea',
                       colspan: 3
                   }, {
                       name: 'BillNo',
                       hidden: true
                   }]
            },
            {
                xtype: 'datagrid',
                itemId: 'SaleContractDetailGrid',
                width: 795,
                height: 170,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: gridstore,
                forceFit: true,
                plugins: [new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 1
                })],
                columns: [{
                    dataIndex: 'SaleBillNo',
                    hidden: true
                }, {
                    text: '序列',
                    dataIndex: 'GoodsCode',
                    width: 50,
                    editor: {
                        xtype: 'searchfield',
                        queryMode: 'local',
                        store: 'SysGoodsStore',
                        valueField: 'GoodsCode',
                        displayField: 'GoodsCode',
                        hideTrigger: true,
                        selectOnFocus: false,
                        allowBlank: false,
                        listeners: {
                            'gridItemClick': function (record, e) {
                                goodsRow = record;
                                //this.up('grid').down('textfield[name="Manufacturer"]').setValue(record.get('Manufacturer'));
                            },
                            beforerender:
                                       function (tigger, opt) {
                                       }
                        }
                    }
                    // renderer: this.rendererData
                }, {
                    text: '型号',
                    dataIndex: 'GoodsVersion'
                }, {
                    text: '产品名称',
                    dataIndex: 'GoodsName'
                    // hidden: true
                }, {
                    text: '编号',
                    dataIndex: 'GoodsNo'
                }, {
                    text: '数量',
                    dataIndex: 'GoodsCount',
                    editor: {
                        allowBlank: false,
                        selectOnFocus: true,
                        regex: /^(\-)?\d+(\.\d+)?$/
                    }
                }, {
                    text: '单位',
                    dataIndex: 'GoodsUnit'
                }, {
                    dataIndex: 'OutGoodsCount',
                    hidden: true
                }, {
                    dataIndex: 'STATE',
                    hidden: true
                }, {
                    text: '制造商',
                    dataIndex: 'Manufacturer'
                }],
                listeners: {
                    edit: function (editor, e) {
                        if (e.colIdx == 0) {
                            if (goodsRow != null) {
                                e.record.set('GoodsVersion', goodsRow.get('GoodsVersion'));
                                e.record.set('GoodsNo', goodsRow.get('GoodsNo'));
                                e.record.set('GoodsUnit', goodsRow.get('GoodsUnit'));
                                e.record.set('GoodsName', goodsRow.get('GoodsName'));
                                e.record.set('Manufacturer', goodsRow.get('Manufacturer'));
                                goodsRow = null;
                            }
                        }
                    }
                }
            }
            ]
        };

        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'saleContactDataRecordSelect',
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
                    name: 'CustomerName',
                    fieldLabel: '客户名称'
                }]
            }]
        });
        this.add({
            xtype: 'datagrid',
            store: store,
            forceFit: true,
            tbar: [{
                text: '查询',
                xtype: 'button',
                iconCls: 'icon-search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="saleContactDataRecordSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({
                        params: obj
                    });

                }
            }],
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 50,
                itemId: 'lc',
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        var viewWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        viewWindow.setOperationType('view');
                        viewWindow.callerComp = sender;
                        viewWindow.record = record;
                        viewWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('BillNo') }));
                        viewWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        viewWindow.show(this);
                        gridstore.load({
                            params: { SaleBillNo: record.get('BillNo') }
                        });
                    }
                }
                ]
            }, {
                dataIndex: 'BillNo',
                hidden: true
            }, {
                dataIndex: 'ContractCode',
                width: 100,
                text: '合同编号'
            }, {
                dataIndex: 'CustomerName',
                width: 150,
                text: '客户名称'
            }, {
                text: '签订时间',
                dataIndex: 'SignDate'
            }, {
                text: '合同金额',
                dataIndex: 'ContractAmount'
            }, {
                text: '交货日期',
                dataIndex: 'DeliveryTime'
            }, {
                text: '销售员',
                dataIndex: 'PurUserName'
            }, {
                text: '状态',
                dataIndex: 'StepNo',
                renderer: function (value) {
                    if (value == 0) {
                        return '<span style="color:red">未提交审批</span>';
                    }
                    else {
                        return value;
                    }
                }
            }, {
                text: '创建日期',
                dataIndex: 'CreateTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
                //format: 'Ymd'                
            }]
        });

    },
    //renderer显示数据时code转name
    rendererData: function (value, metadata, record) {
        var currentStore = this.columns[metadata.cellIndex].getEditor().store;
        var index = currentStore.find('GoodsCode', value);
        if (index != -1) {
            var record = currentStore.getAt(index);
            return record.data.GoodsName;
        }
        else {
            return value;
        }
    },//移除当前行
    onRemoveClick: function (grid, rowIndex) {
        grid.store.removeAt(rowIndex);
    },
    //清除grid
    onRemoveAllClick: function (grid, rowIndex) {
        this.up('grid').store.removeAll();
    }

})