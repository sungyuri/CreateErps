﻿//其他付款审核
Ext.define('TCSYS.erp.CommonPayApp', {
    extend: 'Ext.panel.Panel',
    title: '其他付款审批',
    name: 'CommonPayApp',
    alias: "widget.CommonPayApp",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        //其他付款单审核记录
        var appCommonPayLogstore = Ext.create('TCEPORT.Store', {
            url: 'CommonPay_BLL/GetCommonPayAppLog',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'AppUserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirst', 'AppDataLast']
        });
        //其他付款待审核单据
        var commonPayAppStore = Ext.create('TCEPORT.Store', {
            url: 'CommonPay_BLL/GetCommonPayAppInfo',
            autoLoad: true,
            //  addUrl: 'PurchasePay_BLL/InsertPurchasePayInfo',
            updateUrl: 'CommonPay_BLL/UpdateCommonPayAppInfo',
            fields: ['BillNo', 'CreateDate', 'CommonPayNo', 'ReceiveName', 'PayReason', 'PayWayCode', 'PayWayText', 'TotalAmount', 'PayAmount', 'PayAmountBig', 'PaidAmount', 'BANK', 'BANKNO', 'Remarks', 'PayUserCode', 'PayUserName', 'StepNo', 'StepName', 'AppUserCode', 'AppUserName', 'IsPayoff', 'IsAppEnd']
        });


        // var flag = '';
        //  var updaterecord = null;
        var CommonPayAppWindow = {
            xtype: 'datawindow',
            title: '其他付款单',
            store: commonPayAppStore,
            itemId: 'CommonPayAppWd',
            record: null,
            stepName:null,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
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
                itemId: 'CommonPayAppLog',
                width: 795,
                //  height: 128,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: appCommonPayLogstore,//其他付款单审核记录
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
                    width: 80
                }, {
                    text: '审核人',
                    dataIndex: 'AppUserName',
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
                    hidden: true,
                    dataIndex: 'AppNote4',
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    }
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

            }, {
                xtype: 'label',
                margin: '5 0 10 260',
                text: "太仓创造电子有限公司付款通知书",
                baseCls: 'y-plain',
                style: 'font-weight: bold; font-size: 16px;',
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
                    xtype: 'textfield',
                    labelWidth: 100
                },
                items: [{
                    name: 'BillNo',
                    margin: '0 0 5 0',
                    fieldLabel: '付款单主键',
                    hidden: true
                }, {
                    name: 'ReceiveName',
                    margin: '0 0 5 0',
                    readOnly: true,
                    fieldLabel: '收款方',
                    width: 300
                }, {
                    name: 'CreateDate',
                    fieldLabel: '制单时间',
                    format: 'Y-m-d',
                    allowBlank: false,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '该输入项为必输项',
                    xtype: 'datefield'
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'CommonPayNo',
                    margin: '0 0 5 0',
                    hidden: true,
                    fieldLabel: '关联项目主键'
                }, {
                    name: 'TotalAmount',
                    margin: '0 0 5 0',
                    readOnly: true,
                    fieldLabel: '总金额'
                }, {
                    name: 'PaidAmount',
                    margin: '0 0 5 0',
                    readOnly: true,
                    // colspan: 3,
                    fieldLabel: '已付金额'
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'PayWayText',
                    allowBlank: false,
                    blankText: '该输入项为必输项',
                    margin: '0 0 5 0',
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    colspan: 3,
                    width: 380,
                    fieldLabel: '付款方式'
                }, {
                    name: 'PayReason',
                    allowBlank: false,
                    blankText: '该输入项为必输项',
                    margin: '0 0 5 0',
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    colspan: 3,
                    width: 780,
                    fieldLabel: '付款事由'
                }, {
                    name: 'BANK',
                    margin: '0 0 5 0',
                    colspan: 3,
                    width: 780,
                    fieldLabel: '开户行'
                }, {
                    name: 'BANKNO',
                    margin: '0 0 5 0',
                    colspan: 3,
                    width: 780,
                    fieldLabel: '银行账号'
                }, {
                    name: 'PayAmount',
                    xtype: 'numberfield',
                    hideTrigger: true,
                    fieldLabel: '本次付款金额 ￥：',
                    value: 0,
                    maxValue: 99999999,
                    minValue: 0,
                    colspan: 3,
                    allowBlank: false,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '请输入数字',
                    listeners: {
                        change: function (field, value) {
                            //  value = parseInt(value, 10);
                            //  field.setValue(value + value % 2);
                            //callapi("PurchasePay_BLL/getBigMoney", { smallMoney: value }, function (result) {
                            //    this.up('form').down('textfield[name="PayAmountBig"]').setValue(result);
                            //}, this);
                        }
                    }
                }, {
                    name: 'PayAmountBig',
                    margin: '0 0 5 0',
                    colspan: 3,
                    width: 780,
                    readOnly: true,
                    fieldLabel: '人民币：'
                }, {
                    name: 'Remarks',
                    fieldLabel: '备注',
                    width: 780,
                    xtype: 'textarea',
                    colspan: 3
                }]
            }],
            tbar: [{
                xtype: 'tbfill'
            }, {
                text: '退回',
                name: 'btnSave',
                iconCls: "icon-cancel",//cancel
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
                    commonPayAppStore["updateData"]({
                        billNo: billNo, stepNo: stepNo, appnote: appnote.value, type: "back"
                    }, function (value) {
                        if (value == 'true') {
                            //  me.BasicInfoPK = value;
                            Ext.shortAlert('操作成功');
                            currentWindow.close();
                            commonPayAppStore.load();
                        } else {
                            Ext.shortAlert(value);
                        }
                    });

                }
            }, {
                text: '提交审批',
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
                    commonPayAppStore["updateData"]({
                        billNo: billNo, stepNo: stepNo, appnote: appnote.value, type: "agree"
                    }, function (value) {
                        if (value == 'true') {
                            var cmbillNo = me.BasicInfoPK;
                            var sName = currentWindow.stepName;
                            if (sName == "待付款") {
                                Ext.Msg.confirm('提示', '是否打印付款单?', function (check) {
                                    if (check == "yes") {
                                        Report.LoadFromURL("print/printTemplate/OPPay.grf");
                                        Report.LoadDataFromURL("print/printData/OPPay.aspx?billNo=" + cmbillNo);
                                        Report.PrintPreview(true);
                                    }
                                });
                            }
                            Ext.shortAlert('操作成功');
                            currentWindow.close();
                            commonPayAppStore.load();

                        } else {
                            Ext.shortAlert(value);
                        }
                    });
                }

            }, {
                text: '取消',
                iconCls: "icon-remove",
                handler: function () {
                    this.up('window').close();
                }
            }]
        };     

        //其他付款单列表

        this.add({
            border: false,
            store: commonPayAppStore,
            xtype: 'form',
            itemId: 'commonPayAppSelect',
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
                    name: 'ReceiveName',
                    fieldLabel: '收款方'
                }]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store: commonPayAppStore,
            forceFit: true,
            tbar: [{
                text: '查询付款单',
                xtype: 'button',
                iconCls: 'icon-search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="commonPayAppSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    commonPayAppStore.load({
                        params: obj
                    });
                }
            }
            ],
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 60,
                itemId: 'appCfm',
                items: [{
                    linkText: '审 核',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        //  updaterecord = record;
                        var payAppWindow = Ext.ComponentMgr.create(CommonPayAppWindow);
                        var StepName = record.get('StepName');
                        payAppWindow.setOperationType('approval');
                        payAppWindow.callerComp = sender;
                        payAppWindow.record = record;
                        payAppWindow.stepName = StepName;
                        payAppWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('BillNo') }));
                        payAppWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                       
                        if (StepName == "待付款")
                        {
                            Ext.getCmp('btnApp').text = "提交付款";
                        }                      
                        payAppWindow.show(this);                  

                        appCommonPayLogstore.load({
                            params: { BillNo: record.get('BillNo') }
                        });
                    }
                }
                ]
            }, {
                dataIndex: 'BillNo',//付款单主键
                hidden: true
            }, {
                dataIndex: 'ReceiveName',
                width: 150,
                text: '收款方'
            }, {
                text: '制单日期',
                dataIndex: 'CreateDate'
            }, {
                text: '付款金额',
                dataIndex: 'PayAmount'
            }, {
                text: '已付金额',
                dataIndex: 'PaidAmount'
            }, {
                text: '总金额',
                dataIndex: 'TotalAmount'
            }, {
                text: '状态',
                dataIndex: 'StepName'
            }, {
                text: '申请人',
                dataIndex: 'PayUserName'
            }
            //{
            //    text: '创建日期',
            //    dataIndex: 'CreateTime',
            //    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            //    //format: 'Ymd'                
            //}
            ]
        });       

    }

})