//采购付款
Ext.define('TCSYS.erp.PurchasePay', {
    extend: 'Ext.panel.Panel',
    title: '采购付款',
    name: 'PurchasePay',
    alias: "widget.PurchasePay",
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
            url: 'PurchasePay_BLL/GetPurchaseContractDone',
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
            fields: ['PurBillNo', 'GoodsCode', 'GoodsVersion', 'GoodsName', 'GoodsNo', 'GoodsCount', 'GoodsUnit', 'InGoodsCount', 'STATE', 'Manufacturer']
        });

        var applogstore = Ext.create('TCEPORT.Store', {
            url: 'PurchaseContract_BLL/GetPurchaseAppLog',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'UserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirs', 'AppDataLast']
        });

        var purchasePayStore = Ext.create('TCEPORT.Store', {
            url: 'PurchasePay_BLL/GetPurchasePayInfo',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'UserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirs', 'AppDataLast']
        });


        // var flag = '';
        //  var updaterecord = null;
        var PurchaseContractPayWindow = {
            xtype: 'datawindow',
            title: '采购付款单',
            store: purchasePayStore,
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
                    text: "太仓创造电子有限公司付款通知书",
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
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
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
                       hidden:true
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'ContractCode',
                       allowBlank: false,
                       blankText: '该输入项为必输项',
                       margin: '0 0 5 0',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       fieldLabel: '合同编号'
                   },  {
                       name: 'PurUserCode',
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
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
                   },{
                       xtype: 'splitter'
                   },  {
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
                   },  {
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
                   },{
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
                tbar: [{
                    text: '新增',
                    itemId: 'goodsAdd',
                    xtype: 'addbutton',
                    hidden:false,
                    handler: function (sender) {
                        var rec = new Object({
                            SaleBillNo: '',
                            GoodsCode: '',
                            GoodsVersion: '',
                            GoodsName: '',
                            GoodsNo: '',
                            GoodsCount: '0',
                            GoodsUnit: '',
                            OutGoodsCount: '0',
                            STATE: 'N',
                            Manufacturer:''
                        });
                        //var grid = Ext.ComponentQuery.query('[itemId="SaleContractDetailGrid"]')[0];
                        this.up('grid').getStore().insert(0, rec);
                        // grid.getStore().insert(0, rec);
                    }
                }, {
                    xtype: "button",
                    itemId: "goodsClear",
                    text: "清空",
                    hidden: false,
                    iconCls: "icon-cancel",
                    handler: this.onRemoveAllClick
                }],
                columns: [{
                    dataIndex: 'SaleBillNo',
                    hidden: true
                }, {
                    text: '序列',
                    dataIndex: 'GoodsCode',
                    width:50,
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
                            'gridItemClick': function (record,e) {
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
                    text: '单位',
                    dataIndex: 'GoodsUnit'
                },  {
                    dataIndex: 'OutGoodsCount',
                    hidden: true
                },{
                    dataIndex: 'STATE',
                    hidden: true
                }, {
                    text: '制造商',
                    dataIndex: 'Manufacturer'
                },  {
                    xtype: 'actioncolumn',
                    itemId: 'myActionColumn',
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
                            if(goodsRow!=null)
                            {
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
            ],
            tbar: [{
                xtype: 'tbfill'
            }, {
                text: '保存',
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
                            SaleBillNo: recordDetail.get('SaleBillNo'),
                            GoodsCode: recordDetail.get('GoodsCode'),
                            GoodsVersion: recordDetail.get('GoodsVersion'),
                            GoodsName: recordDetail.get('GoodsName'),
                            GoodsNo: recordDetail.get('GoodsNo'),
                            GoodsCount: recordDetail.get('GoodsCount'),
                            GoodsUnit: recordDetail.get('GoodsUnit'),
                            OutGoodsCount: recordDetail.get('OutGoodsCount'),
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
                            SaleBillNo: recordDetail.get('SaleBillNo'),
                            GoodsCode: recordDetail.get('GoodsCode'),
                            GoodsVersion: recordDetail.get('GoodsVersion'),
                            GoodsName: recordDetail.get('GoodsName'),
                            GoodsNo: recordDetail.get('GoodsNo'),
                            GoodsCount: recordDetail.get('GoodsCount'),
                            GoodsUnit: recordDetail.get('GoodsUnit'),
                            OutGoodsCount: recordDetail.get('OutGoodsCount'),
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
            }]
        };



        var goodsRow = null;
        var PurchaseContractMgrAppWindow = {
            xtype: 'datawindow',
            title: '采购合同',
            store: store,
            record: null,
            id: 'PurchaseContractView',
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
                text: '填写付款单',
                name: 'btnApp',
                iconCls: "icon-add",
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
                text: '关闭',
                iconCls: "icon-cancel",
                handler: function () {
                    this.up('window').close();
                }
            }],
            items: [{
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
                            // return '<span style="color:red">未通过</span>';
                        }
                        else {
                            return '<span style="color:red">已通过</span>';
                        }
                    }

                }, {
                    text: '意见一',
                    dataIndex: 'AppNote1'
                }, {
                    text: '意见二',
                    dataIndex: 'AppNote2'
                }, {
                    text: '意见三',
                    dataIndex: 'AppNote3'
                }, {
                    text: '意见四',
                    hidden: true,
                    dataIndex: 'AppNote4'
                }, {
                    text: '意见五',
                    dataIndex: 'AppNote5',
                    hidden: true
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
                    margin: '5 0 5 300',
                    text: "工 矿 产 品 购 销 合 同",
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
                    var object = Ext.ComponentQuery.query('[itemId="saleContactDataRecordSelect"]')[0]
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
                    linkText: '查 看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        //  updaterecord = record;
                        var viewWindow = Ext.ComponentMgr.create(PurchaseContractMgrAppWindow);
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
                text: '已付金额',
                dataIndex: 'PaidAmount'
            }, {
                text: '交货日期',
                dataIndex: 'DeliveryTime'
            }, {
                text: '采购员',
                dataIndex: 'PurUserName'
            }, {
                text: '审核状态',
                dataIndex: 'StepName'                
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