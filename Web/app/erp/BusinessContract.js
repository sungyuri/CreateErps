﻿//运营合同
Ext.define('TCSYS.erp.BusinessContract', {
    extend: 'Ext.panel.Panel',
    title: '运营合同',
    name: 'BusinessContract',
    alias: "widget.BusinessContract",
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
            url: 'BusinessContract_BLL/Get',
            addUrl: 'BusinessContract_BLL/Insert',
            updateUrl: 'BusinessContract_BLL/Update',
            deleteUrl: 'BusinessContract_BLL/Delete',
            fields: [
                'BillNo',
                'ContractCode',
                'ContractCodeA',
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

        //PurBillNo, GoodsCode, GoodsVersion, GoodsNo, GoodsName, GoodsCount, GoodsUnit,
        //Manufacturer, InGoodsCount, STATE

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
        var SaleContractMgrWindow = {
            xtype: 'datawindow',
            title: '运营合同',
            store: store,
            record: null,
            width: 900,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            tbar: [{
                xtype: 'tbfill'
            }, {
                text: '删除',
                name: 'btnRemove',
                hidden: true,
                iconCls: "icon-remove",
                id: 'btnRemove',
                handler: function (sender) {
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    var strBillNo = formValues['BillNo'];
                    Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                        if (check == "yes") {
                            store.deleteData({ billNo: strBillNo }, function (value) {
                                if (value == '1') {
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    store.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    });
                }
            }, {
                text: '修改保存',
                name: 'btnSave',
                iconCls: "icon-save",
                id: 'btnSave',
                handler: function (sender) {
                    //参数：合同明细
                    var btn = '';
                    if (sender.name == 'btnSave') {
                        btn = 'save';
                    }
                    else {
                        btn = 'app';
                    }

                    var grid = Ext.ComponentQuery.query('[itemId="SaleContractDetailGrid"]')[0];
                    var contractDetail = grid.getStore();
                    //  var contractDetail = Ext.ComponentQuery.query('grid[itemId="SaleContractDetailGrid"]')[0].getStore();
                    //  var contractDetail = this.up('window').down('grid').getStore();
                    var contractDetailArr = [];
                    for (var i = 0; i < contractDetail.getCount() ; i++) {
                        var recordDetail = contractDetail.getAt(i);

                        contractDetailArr[i] = {
                            PurBillNo: recordDetail.get('PurBillNo'),
                            GoodsCode: recordDetail.get('GoodsCode'),
                            GoodsVersion: recordDetail.get('GoodsVersion'),
                            GoodsName: recordDetail.get('GoodsName'),
                            GoodsNo: recordDetail.get('GoodsNo'),
                            GoodsCount: recordDetail.get('GoodsCount'),
                            GoodsUnit: recordDetail.get('GoodsUnit'),
                            UnitPrice: recordDetail.get('UnitPrice'),
                            InGoodsCount: recordDetail.get('InGoodsCount'),
                            STATE: recordDetail.get('STATE'),
                            Manufacturer: recordDetail.get('Manufacturer')

                        };
                    }
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    if (!this.up('window').down('form').isValid()) {
                        return;
                    }
                    if (this.up('window').operationType == "add") {
                        if (me.BasicInfoPK == null) {
                            store[currentWindow.operationType + "Data"]({
                                entity: formValues, type: btn,
                                detailList: contractDetailArr
                            }, function (value) {
                                if (value != '') {
                                    me.BasicInfoPK = value;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    store.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                        else {
                            store["updateData"]({
                                entity: formValues, type: btn,
                                detailList: contractDetailArr
                            }, function (value) {
                                if (value != '') {
                                    me.BasicInfoPK = value;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    store.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                    else {
                        store["updateData"]({
                            entity: formValues, type: btn,
                            detailList: contractDetailArr
                        }, function (value) {
                            if (value != '') {
                                me.BasicInfoPK = value;
                                Ext.shortAlert('操作成功');
                                currentWindow.close();
                                store.load();
                            } else {
                                Ext.shortAlert('操作失败');
                            }
                        });
                    }
                }
            }, {
                text: '提交审批',
                name: 'btnApp',
                iconCls: "icon-ok",
                id: 'btnApp',
                handler: function (sender) {
                    //参数：合同明细
                    var btn = '';
                    if (sender.name == 'btnSave') {
                        btn = 'save';
                    }
                    else {
                        btn = 'app';
                    }

                    var grid = Ext.ComponentQuery.query('[itemId="SaleContractDetailGrid"]')[0];
                    var contractDetail = grid.getStore();
                    //  var contractDetail = Ext.ComponentQuery.query('grid[itemId="SaleContractDetailGrid"]')[0].getStore();
                    //  var contractDetail = this.up('window').down('grid').getStore();
                    var contractDetailArr = [];
                    for (var i = 0; i < contractDetail.getCount() ; i++) {
                        var recordDetail = contractDetail.getAt(i);

                        contractDetailArr[i] = {
                            PurBillNo: recordDetail.get('PurBillNo'),
                            GoodsCode: recordDetail.get('GoodsCode'),
                            GoodsVersion: recordDetail.get('GoodsVersion'),
                            GoodsName: recordDetail.get('GoodsName'),
                            GoodsNo: recordDetail.get('GoodsNo'),
                            GoodsCount: recordDetail.get('GoodsCount'),
                            UnitPrice: recordDetail.get('UnitPrice'),
                            GoodsUnit: recordDetail.get('GoodsUnit'),
                            InGoodsCount: recordDetail.get('InGoodsCount'),
                            STATE: recordDetail.get('STATE'),
                            Manufacturer: recordDetail.get('Manufacturer')

                        };
                    }
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    if (!this.up('window').down('form').isValid()) {
                        return;
                    }
                    if (this.up('window').operationType == "add") {
                        if (me.BasicInfoPK == null) {
                            store[currentWindow.operationType + "Data"]({
                                entity: formValues, type: btn,
                                detailList: contractDetailArr
                            }, function (value) {
                                if (value != '') {
                                    me.BasicInfoPK = value;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    store.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                        else {
                            store["updateData"]({
                                entity: formValues, type: btn,
                                detailList: contractDetailArr
                            }, function (value) {
                                if (value != '') {
                                    me.BasicInfoPK = value;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    store.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                    else {
                        store["updateData"]({
                            entity: formValues, type: btn,
                            detailList: contractDetailArr
                        }, function (value) {
                            if (value != '') {
                                me.BasicInfoPK = value;
                                Ext.shortAlert('操作成功');
                                currentWindow.close();
                                store.load();
                            } else {
                                Ext.shortAlert('操作失败');
                            }
                        });
                    }
                }
            }, {
                text: '取消',
                iconCls: "icon-cancel",
                handler: function () {
                    this.up('window').close();
                }
            }],
            items: [{
                xtype: 'datagrid',
                itemId: 'PurchaseContractAddAppLog',
                width: 895,
                height: 128,
                hidden: true,
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
                            // return '<span style="color:red">未通过</span>';
                        }
                        else {
                            return '<span style="color:red">已通过</span>';
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
                    margin: '5 0 10 360',
                    style: 'font-weight: bold; font-size: 16px;',
                    text: "运 营 合 同",
                    baseCls: 'y-plain',
                    border: false
                },
            {
                xtype: 'form',
                baseCls: 'y-plain',
                border: false,
                width: 895,
                layout: {
                    type: 'table',
                    tdAttrs: {
                        style: {
                        }
                    },
                    columns: 3
                },
                defaults: {
                    xtype: 'textfield',
                    labelWidth: 100,
                    width: 350
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
                       labelStyle: 'color:red;',
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
                       xtype: 'splitter',
                       width: 20
                   }, {
                       name: 'ContractCode',
                       allowBlank: false,
                       blankText: '该输入项为必输项',
                       margin: '0 0 5 0',
                       labelStyle: 'color:red;',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       fieldLabel: '合同编号'
                   }, {
                       name: 'PurUserCode',
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
                       fieldLabel: '采购员',
                       labelStyle: 'color:red;',
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
                       store: 'ViewPurUserStore'
                   }, {
                       name: 'PurUserName',
                       hidden: true
                   }, {
                       xtype: 'splitter',
                       width: 20
                   }, {
                       name: 'SignPlace',
                       fieldLabel: '签订地点'
                   }, {
                       fieldLabel: '需方',
                       value: '太仓创造电子有限公司',
                       readOnly: true
                   }, {
                       xtype: 'splitter',
                       width: 20
                   }, {
                       name: 'SignDate',
                       fieldLabel: '录入时间',
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
                       readOnly: true,
                       labelStyle: 'color:red;',
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
                       xtype: 'splitter',
                       width: 20
                   }, {
                       name: 'DeliveryTime',
                       fieldLabel: '交货时间',
                       format: 'Y-m-d',
                       xtype: 'datefield',
                       labelStyle: 'color:red;',
                       allowBlank: false,
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '请选择时间'
                   }, {
                       name: 'ContractCodeA',
                       fieldLabel: '对方合同编号',
                       labelStyle: 'color:green;',
                       colspan: 3,
                       width: 350
                   }, {
                       name: 'ContractAmountBig',
                       xtype: 'label',
                       colspan: 3,
                       width: 880
                   }, {
                       name: 'QA',
                       fieldLabel: '质保条件',
                       colspan: 3,
                       width: 880
                   }, {
                       name: 'DeliveryWay',
                       fieldLabel: '交货方式',
                       colspan: 3,
                       width: 880
                   }, {
                       name: 'PayWay',
                       fieldLabel: '结算方式',
                       width: 880,
                       colspan: 3
                   }, {
                       name: 'OtherNote',
                       fieldLabel: '其他',
                       width: 880,
                       colspan: 3
                   }, {
                       name: 'BillNo',
                       hidden: true
                   }]
            },
            {
                xtype: 'datagrid',
                itemId: 'SaleContractDetailGrid',
                width: 895,
                // height: 170,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: gridstore,
                forceFit: true,
                plugins: [new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 1
                })],
                tbar: [{
                    text: '新增',
                    //   id: 'goodsAdd',
                    xtype: 'addbutton',
                    handler: function (sender) {
                        var rec = new Object({
                            PurBillNo: '',
                            GoodsCode: '',
                            GoodsVersion: '',
                            GoodsName: '',
                            GoodsNo: '',
                            GoodsCount: '0',
                            GoodsUnit: '',
                            UnitPrice: '0',
                            InGoodsCount: '0',
                            STATE: 'N',
                            Manufacturer: ''
                        });
                        //var grid = Ext.ComponentQuery.query('[itemId="SaleContractDetailGrid"]')[0];
                        this.up('grid').getStore().insert(0, rec);
                        // grid.getStore().insert(0, rec);
                    }
                }, {
                    xtype: "button",
                    text: "清空",
                    // id:'goodsClear',
                    iconCls: "icon-cancel",
                    handler: this.onRemoveAllClick
                }],
                columns: [{
                    dataIndex: 'PurBillNo',
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
                                           //var recd = goodsRow;
                                           //if (recd) {
                                           //    tigger.setHiddenValue(recd.get('GoodsCode'));
                                           //    tigger.setValue(recd.get('GoodsName'));
                                           //}
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
                    //editor: {
                    //    allowBlank: false,
                    //    regex: /^(\-)?\d+(\.\d+)?$/
                    //}
                }, {
                    text: '数量',
                    dataIndex: 'GoodsCount',
                    editor: {
                        allowBlank: false,
                        selectOnFocus: true,
                        regex: /^(\-)?\d+(\.\d+)?$/
                    }
                }, {
                    text: '单价',
                    dataIndex: 'UnitPrice',
                    editor: {
                        allowBlank: false,
                        selectOnFocus: true,
                        regex: /^(\-)?\d+(\.\d+)?$/
                    }
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
                }, {
                    xtype: 'actioncolumn',
                    //  itemId: 'myActionColumn',
                    width: 30,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        iconCls: 'icon-cancel',
                        tooltip: '删除',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }],
                listeners: {
                    edit: function (editor, e) {
                        //   e.record.commit();
                        //if (e.colIdx == 0) {
                        // //   alert(e.value); 编辑框输入值
                        //    e.record.set('GoodsCode', e.value);
                        //} else { }
                        //if (e.colIdx == 1) {
                        //    e.record.set('GoodsVersion', e.value);
                        //} else { }
                        //if (e.colIdx == 2) {
                        //    e.record.set('GoodsNo', e.value);
                        //} else { }
                        //if (e.colIdx == 3) {
                        //    e.record.set('GoodsCount', e.value);
                        //} else { }
                        //if (e.colIdx == 4) {
                        //    e.record.set('GoodsUnit', e.value);
                        //} else { }
                        //if (e.colIdx == 5) {
                        //    e.record.set('Manufacturer', e.value);
                        //} else { }
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

                        //    var findRecord = editor.store.findRecord("GoodsName", e.value);

                        //    if (findRecord == undefined) {

                        //        e.record.set('GoodsCode', '');
                        //    } else {
                        //        e.record.set('GoodsCode', findRecord.data.GoodsCode);
                        //    }
                        //}
                    }
                }
            }
            ]

        };

        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'purchaseContactSelect',
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
                    var object = Ext.ComponentQuery.query('[itemId="purchaseContactSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    //  flag = 'add';
                    var addWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                    addWindow.record = null;
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    Ext.getCmp('btnApp').hidden = true;
                    addWindow.show(this);
                    me.BasicInfoPK = null;
                    gridstore.removeAll();
                }
            }
            , {
                text: '修改',
                xtype: 'updatebutton',
                handler: function (sender) {
                    // flag = 'update';
                    var record = this.up('grid').getSelectionModel().getSelection()[0];
                    //alert(record);
                    if (record != null) {
                        // updaterecord = record;
                        var updateWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.record = record;
                        updateWindow.add(Ext.create('widget.uploadpanel', { GroupGuid: record.get('BillNo') }));
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        Ext.getCmp('btnRemove').hidden = false;
                        updateWindow.show(this);
                        gridstore.load({
                            params: { PurBillNo: record.get('BillNo') }
                        });
                        var strStepName = record.get('StepName');
                        if (strStepName == "退回") {
                            var object = Ext.ComponentQuery.query('[itemId="PurchaseContractAddAppLog"]')[0];
                            object.show();
                            applogstore.load({
                                params: { BillNo: record.get('BillNo') }
                            });
                        }
                    }
                    else {
                        Ext.Msg.alert('提示', '请先选中一条信息！');
                    }


                }
            }
            ],
            //multiSelect: false,
            //selModel: {
            //    mode: 'SINGLE',  //多选multi,simple,单选single;
            //    selType: 'checkboxmodel',
            //    showHeaderCheckbox: false,  //不显示标题栏中的一键全选按键
            //    allowDeselect: true  //允许取消选中状态
            //},
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 50,
                itemId: 'lc',
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        //  updaterecord = record;
                        var viewWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        viewWindow.setOperationType('view');
                        viewWindow.callerComp = sender;
                        viewWindow.record = record;
                        viewWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('BillNo') }));
                        viewWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        Ext.getCmp('btnSave').hidden = true;//btnApp
                        Ext.getCmp('btnApp').hidden = true;
                        //   Ext.getCmp('goodsAdd').hidden = true;
                        // Ext.getCmp('goodsClear').hidden = true;
                        //     viewWindow.down('grid').down('#myActionColumn').hide();
                        //grid.columns[i].hide()/show()
                        //grid.columns[i].setVisible(false/true);
                        viewWindow.show(this);
                        gridstore.load({
                            params: { PurBillNo: record.get('BillNo') }
                        });
                        //PurchaseContractAddAppLog
                        var strStepName = record.get('StepName');
                        if (strStepName == "退回") {
                            var object = Ext.ComponentQuery.query('[itemId="PurchaseContractAddAppLog"]')[0];
                            object.show();
                            applogstore.load({
                                params: { BillNo: record.get('BillNo') }
                            });
                        }

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
                text: '录入时间',
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
                dataIndex: 'StepName',
                renderer: function (value) {
                    if (value == "制单") {
                        return '<span style="color:red">未提交审批</span>';
                    }
                    else {
                        return '<span style="color:red">退回</span>';
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