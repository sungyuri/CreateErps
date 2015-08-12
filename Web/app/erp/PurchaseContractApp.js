// 采购合同审核
Ext.define('TCSYS.erp.PurchaseContractApp', {
    extend: 'Ext.panel.Panel',
    title: '采购合同审核',
    name: 'PurchaseContractApp',
    alias: "widget.PurchaseContractApp",
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
            url: 'PurchaseContract_BLL/GetAppRecord',
            updateUrl: 'PurchaseContract_BLL/UpdateAppRecord',
            fields: [
                'BillNo',
                'ContractCode',
                'SupplierNo',
                'SupplierName',
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
                'CreateTime'
            ]
        });

        var gridstore = Ext.create('TCEPORT.Store', {
            url: 'PurchaseContract_BLL/GetPurchaseContractDetail',
            fields: ['PurBillNo', 'GoodsCode', 'GoodsVersion', 'GoodsName', 'GoodsNo', 'GoodsCount', 'GoodsUnit', 'UnitPrice', 'InGoodsCount', 'STATE', 'Manufacturer']
        });

        var applogstore = Ext.create('TCEPORT.Store', {
            url: 'PurchaseContract_BLL/GetPurchaseAppLog',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'UserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirst', 'AppDataLast']
        });

        // var flag = '';
        //  var updaterecord = null;
        //新增窗口
        var goodsRow = null;
        var PurchaseContractMgrAppWindow = {
            xtype: 'datawindow',
            title: '采购合同审批',
            store: store,
            record: null,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            tbar: [{
                xtype: 'tbfill'
            }, {
                text: '退回',
                name: 'btnSave',
                iconCls: "icon-remove",
                id: 'btnSave',
                handler: function (sender) {
                    var appnote = Ext.getCmp('appnote');
                    if (appnote.value == null || appnote.value == "") {
                        Ext.Msg.show({
                            title: '提示',
                            width: 75,
                            msg: '请填写审核意见！',
                            width: 150,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        appnote.focus();
                        return;
                    }
                    var currentWindow = this.up('window');
                    var stepNo = currentWindow.record.get("StepNo");
                    var billNo = currentWindow.record.get('BillNo');
                    store["updateData"]({
                        billNo: billNo, stepNo: stepNo, appnote: appnote.value, type: "back"
                    }, function (value) {
                        if (value == 'true') {
                            //  me.BasicInfoPK = value;
                            Ext.shortAlert('操作成功');
                            currentWindow.close();
                            store.load();
                        } else {
                            Ext.shortAlert(value);
                        }
                    });
                }
            }, {
                text: '通过审核',
                name: 'btnApp',
                iconCls: "icon-ok",
                id: 'btnApp',
                handler: function (sender) {
                    var appnote = Ext.getCmp('appnote');
                    if (appnote.value == null || appnote.value == "") {
                        Ext.Msg.show({
                            title: '提示',
                            width: 75,
                            msg: '请填写审核意见！',
                            width: 150,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        appnote.focus();
                        return;
                    }
                    var currentWindow = this.up('window');
                    var stepNo = currentWindow.record.get("StepNo");
                    var billNo = currentWindow.record.get('BillNo');
                    store["updateData"]({
                        billNo: billNo, stepNo: stepNo, appnote: appnote.value, type: "agree"
                    }, function (value) {
                        if (value == 'true') {
                            //  me.BasicInfoPK = value;
                            Ext.shortAlert('操作成功');
                            currentWindow.close();
                            store.load();
                        } else {
                            Ext.shortAlert(value);
                        }
                    });
                }
            }, {
                text: '取消',
                iconCls: "icon-cancel",
                handler: function () {
                    this.up('window').close();
                }
            }],
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                margin: '5 50 0 0',
                id: 'appnote',
                name: 'appnote',
                fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                blankText: '该输入项为必输项',
                fieldLabel: '审核意见'
            }, {
                xtype: 'datagrid',
                itemId: 'PurchaseContractAppLog',
                width: 795,
                height: 128,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: applogstore,
                forceFit: true,
                bbar: null,
                columns: [{
                    dataIndex: 'BillNo',
                    hidden: true
                }, {
                    text: '序号',
                    dataIndex: 'StepNo',
                    width: 30
                }, {
                    text: '步骤',
                    dataIndex: 'StepName',
                    width: 50
                }, {
                    text: '审核人',
                    dataIndex: 'UserName',
                    width: 60
                }, {
                    dataIndex: 'AppState',
                    text: '状态',
                    width: 60,
                    renderer: function (value) {
                        if (value == 'N') {
                            return '<span style="color:gray">未通过</span>';
                        }
                        else {
                            return '<span style="color:green">已通过</span>';
                        }
                    }

                }, {
                    text: '意见一',
                    dataIndex: 'AppNote1',
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    }
                }, {
                    text: '意见二',
                    dataIndex: 'AppNote2',
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    }
                }, {
                    text: '意见三',
                    dataIndex: 'AppNote3',
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    }
                }, {
                    text: '意见四',
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    },
                    hidden: true,
                    dataIndex: 'AppNote4'
                }, {
                    text: '意见五',
                    dataIndex: 'AppNote5',
                    hidden: true,
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    }
                }, {
                    dataIndex: 'AppDataLast',
                    text: '审核时间',
                    width: 85,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
                }, {
                    hidden: true,
                    dataIndex: 'AppStep'
                }]

            },
                {
                    xtype: 'label',
                    margin: '5 0 10 260',
                    text: "采 购 合 同",
                    style: 'font-weight: bold; font-size: 16px;',
                    baseCls: 'y-plain',
                    style: {
                    },
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
                       name: 'SupplierNo',
                       margin: '0 0 5 0',
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
                       fieldLabel: '供应商',
                       displayField: 'SupplierName',
                       valueField: 'SupplierNo',
                       needCheck: true,
                       listeners: {
                           'gridItemClick': function (record) {
                               this.up('form').down('textfield[name="SupplierNo"]').setValue(record.get('SupplierNo'));
                               this.up('form').down('textfield[name="SupplierName"]').setValue(record.get('SupplierName'));
                           },
                           beforerender:
                                      function (tigger, opt) {
                                          var recd = this.up('window').record;
                                          if (recd) {
                                              tigger.setHiddenValue(recd.get('SupplierNo'));
                                              tigger.setValue(recd.get('SupplierName'));
                                          }
                                      }
                       },
                       store: 'ViewSupplierStore'
                   }, {
                       name: 'SupplierName',
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
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
                       fieldLabel: '采购员',
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
                       fieldLabel: '需方',
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
                       name: 'BillNo',
                       hidden: true
                   }]
            },
            {
                xtype: 'datagrid',
                itemId: 'PurchaseContractDetailGrid',
                width: 795,
                height: 108,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: gridstore,
                bbar: null,
                forceFit: true,
                plugins: [new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 1
                })],             
                columns: [{
                    dataIndex: 'PurBillNo',
                    hidden: true
                }, {
                    text: '序列',
                    dataIndex: 'GoodsCode',
                    width: 50
                }, {
                    text: '型号',
                    dataIndex: 'GoodsVersion'
                }, {
                    text: '产品名称',
                    dataIndex: 'GoodsName'
                }, {
                    text: '编号',
                    dataIndex: 'GoodsNo'
                }, {
                    text: '数量',
                    dataIndex: 'GoodsCount'
                }, {
                    text: '单价',
                    dataIndex: 'UnitPrice'  //UnitPrice
                }, {
                    text: '单位',
                    dataIndex: 'GoodsUnit'
                }, {
                    dataIndex: 'InGoodsCount',
                    hidden: true
                }, {
                    dataIndex: 'STATE',
                    hidden: true
                }, {
                    text: '制造商',
                    dataIndex: 'Manufacturer'
                }]
            }]
        };

        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'purchaseContactAppSelect',
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
                margin: "5 0 5 5",
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    width: '20%'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'SupplierName',
                    fieldLabel: '供应商名称'
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
                    var object = Ext.ComponentQuery.query('[itemId="purchaseContactAppSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({
                        params: obj
                    });

                }
            }
            ],
            multiSelect: false,
            selModel: {
                mode: 'SINGLE',  //多选multi,simple,单选single;
               // selType: 'checkboxmodel',
                showHeaderCheckbox: false,  //不显示标题栏中的一键全选按键
                allowDeselect: true  //允许取消选中状态
            },
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 50,
                itemId: 'lc',
                items: [{
                    linkText: '审 核',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        //  updaterecord = record;
                        var viewWindow = Ext.ComponentMgr.create(PurchaseContractMgrAppWindow);
                        viewWindow.setOperationType('approval');
                        viewWindow.callerComp = sender;
                        viewWindow.record = record;
                        viewWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('BillNo') }));
                        viewWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        viewWindow.show(this);
                        gridstore.load({
                            params: { SaleBillNo: record.get('BillNo') }
                        });
                        applogstore.load({
                            params: { BillNo: record.get('BillNo') }
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
                dataIndex: 'SupplierName',
                width: 150,
                text: '供应商'
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
                text: '采购员',
                dataIndex: 'PurUserName'
            }, {
                text: '状态',
                dataIndex: 'StepNo',
                renderer: function (value) {
                    if (value == 1) {
                        return '<span style="color:red">初审</span>';
                    }
                    else if (value == 2) {
                        return '<span style="color:red">会审</span>';
                    }
                    else {
                        return '<span style="color:red">审定</span>';
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
    }

})