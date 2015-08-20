//其他付款
Ext.define('TCSYS.erp.CommonPay', {
    extend: 'Ext.panel.Panel',
    title: '其他付款',
    name: 'CommonPay',
    alias: "widget.CommonPay",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        //CommonPayNo, ReceiveName, PayReason, TotalAmount, PaidAmount, BANK, BANKNO, Remarks, CreateUserCode, CreateUserName, IsPayoff, CreateTime, LastUpdateTime
        var storeItem = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'CommonPay_BLL/GetCommonPayItemList',
            addUrl: 'CommonPay_BLL/InsertCommonPayItemInfo',
            fields: [
                'CommonPayNo',
                'ReceiveName',
                'PayReason',
                'TotalAmount',
                'PaidAmount',
                'BANK',
                'BANKNO',
                'Remarks',
                'CreateUserCode',
                'CreateUserName',
                'IsPayoff',
                'CreateTime',
                'LastUpdateTime'               
            ]
        });


        //其他付款单审核记录
        var appCommonPayLogstore = Ext.create('TCEPORT.Store', {
            url: 'CommonPay_BLL/GetCommonPayAppLog',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'AppUserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirst', 'AppDataLast']
        });
        //一般付款SysCommonPay
        var commonPayStore = Ext.create('TCEPORT.Store', {
            url: 'CommonPay_BLL/GetCommonPayInfo',
            autoLoad: true,
            addUrl: 'CommonPay_BLL/InsertCommonPayInfo',
            updateUrl: 'CommonPay_BLL/UpdateCommonPayInfo',
            fields: ['BillNo', 'CreateDate', 'CommonPayNo', 'ReceiveName', 'PayReason', 'PayWayCode', 'PayWayText', 'TotalAmount', 'PayAmount', 'PayAmountBig', 'PaidAmount', 'BANK', 'BANKNO', 'Remarks', 'PayUserCode', 'PayUserName', 'StepNo', 'StepName', 'AppUserCode', 'AppUserName', 'IsPayoff', 'IsAppEnd']
        });


        // var flag = '';
        //  var updaterecord = null;
        var commonPayWindow = {
            xtype: 'datawindow',
            title: '其他付款单',
            store: commonPayStore,
            itemId: 'commonPayWd',
            record: null,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            items: [{
                xtype: 'datagrid',
                itemId: 'CommonPayAddAppLog',
                width: 795,
                hidden:true,
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

            },
                {
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
                },{
                    name: 'TotalAmount',
                    margin: '0 0 5 0',
                    readOnly: true,
                    fieldLabel: '总金额'
                },{
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
                            if (value == null) {

                            }
                            else {
                                callapi("PurchasePay_BLL/getBigMoney", { smallMoney: value }, function (result) {
                                    this.up('form').down('textfield[name="PayAmountBig"]').setValue(result);
                                }, this);
                                value = parseFloat(value);
                                var form = this.up('window').down('form').getForm();
                                var formValues = form.getValues();
                                var TotalAmount = parseFloat(formValues.TotalAmount);
                                var PaidAmount = parseFloat(formValues.PaidAmount);
                                if ((PaidAmount + value) > TotalAmount) {
                                    field.setValue(0);
                                    Ext.Msg.show({
                                        title: "提示",
                                        msg: "付款金额超出未付金额。",
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });

                                }
                            }

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
                text: '修改保存',
                name: 'btnSave',
                iconCls: "icon-save",
                id: 'btnSave',
                handler: function (sender) {
                    var currentWindow = Ext.ComponentQuery.query('[itemId="commonPayWd"]')[0];
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    if (!this.up('window').down('form').isValid()) {
                        return;
                    }
                    if (currentWindow.operationType == "add") {
                        if (me.BasicInfoPK == null) {
                            commonPayStore[currentWindow.operationType + "Data"]({
                                entity: formValues, type: 'save'
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    commonPayStore.load();
                                } else {
                                    // Ext.shortAlert('操作失败');
                                    Ext.shortAlert(value);
                                }
                            });
                        }
                        else {
                            commonPayStore["updateData"]({
                                entity: formValues, type: 'app'
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    commonPayStore.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                    else {
                        commonPayStore["updateData"]({
                            entity: formValues, type: 'save'
                        }, function (value) {
                            if (value == 'true') {
                                me.BasicInfoPK = null;
                                Ext.shortAlert('操作成功');
                                currentWindow.close();
                                commonPayStore.load();
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
                  //  var currentWindow = Ext.ComponentQuery.query('[itemId="commonPayWd"]')[0];
                     var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    if (!this.up('window').down('form').isValid()) {
                        return;
                    }
                    if (currentWindow.operationType == "add") {
                        if (me.BasicInfoPK == null) {
                            commonPayStore[currentWindow.operationType + "Data"]({
                                entity: formValues, type: 'app'
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    commonPayStore.load();
                                } else {
                                    // Ext.shortAlert('操作失败');
                                    Ext.shortAlert(value);
                                }
                            });
                        }
                        else {
                            commonPayStore["updateData"]({
                                entity: formValues, type: 'app'
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    commonPayStore.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                    else {
                        commonPayStore["updateData"]({
                            entity: formValues, type: 'app'
                        }, function (value) {
                            if (value == 'true') {
                                me.BasicInfoPK = null;
                                Ext.shortAlert('操作成功');
                                currentWindow.close();
                                commonPayStore.load();
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
                    commonPayStore.load();
                    this.up('window').close();
                }
            }]
        };


        //付款项目窗口

        var commonPayItemMgrWindow = {
            xtype: 'datawindow',
            title: '付款项目',
            store: storeItem,
            record: null,
            id: 'commonpPayView',
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
                text: '保存',
                name: 'btnSaveItem',
                iconCls: "icon-save",
                id: 'btnSaveItem',
                handler: function (sender) {
                  //  var currentWindow = Ext.ComponentQuery.query('[itemId="commonpPayView"]')[0];
                     var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    var formValues = form.getValues();
                    if (!this.up('window').down('form').isValid()) {
                        return;
                    }
                    if (currentWindow.operationType == "add") {
                        if (me.BasicInfoPK == null) {
                            storeItem[currentWindow.operationType + "Data"]({
                                entity: formValues
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    storeItem.load();
                                } else {
                                    // Ext.shortAlert('操作失败');
                                    Ext.shortAlert(value);
                                }
                            });
                        }
                        else {
                            storeItem["updateData"]({
                                entity: formValues, type: 'app'
                            }, function (value) {
                                if (value == 'true') {
                                    me.BasicInfoPK = null;
                                    Ext.shortAlert('操作成功');
                                    currentWindow.close();
                                    storeItem.load();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                    else {
                        storeItem["updateData"]({
                            entity: formValues
                        }, function (value) {
                            if (value == 'true') {
                                me.BasicInfoPK = null;
                                Ext.shortAlert('操作成功');
                                currentWindow.close();
                                storeItem.load();
                            } else {
                                Ext.shortAlert('操作失败');
                            }
                        });
                    }
                }
            }, {
                text: '填写付款单',
                name: 'btnAddPay',
                iconCls: "icon-add",
                id: 'btnAddPay',
                handler: function (sender) {

                    // var payItemWD = Ext.ComponentQuery.query('[itemId="commonpPayView"]')[0];
                    var payItemWD = Ext.getCmp('commonpPayView');
                    var form = payItemWD.down('form').getForm();
                    var obj = form.getValues();
                    var addcommonPayWindow = Ext.ComponentMgr.create(commonPayWindow);
                    addcommonPayWindow.setOperationType('add');
                    addcommonPayWindow.callerComp = sender;
                    commonPayStore.load({
                        params: obj,
                        callback: function (records, operation, success) {
                            var rec = commonPayStore.getAt(0);
                            commonPayStore.removeAll();                           
                            addcommonPayWindow.down('form').loadRecord(rec);
                            me.BasicInfoPK = null;
                            payItemWD.close();
                            Ext.getCmp('btnApp').hidden = true;
                            addcommonPayWindow.show(this);
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
            items: [
              {
                  xtype: 'label',
                  margin: '5 0 10 260',
                  style: 'font-weight: bold; font-size: 16px;',
                  text: "其他付款项目内容",
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
                    xtype: 'textfield',
                    labelWidth: 100
                },
                items: [{
                    name: 'CommonPayNo',
                    margin: '0 0 5 0',
                    fieldLabel: '付款单主键',
                    hidden: true
                }, {
                    name: 'ReceiveName',
                    margin: '0 0 5 0',
                 //   readOnly: false,
                    fieldLabel: '收款方',
                    allowBlank: false,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '此项必须输入',
                    width: 300
                }, {
                    name: 'TotalAmount',
                    xtype: 'numberfield',
                    hideTrigger: true,
                    fieldLabel: '总金额',
                    value: 0,
                    maxValue: 99999999,
                    minValue: 0,
                  //  colspan: 3,
                    allowBlank: false,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '请输入数字'
                },
                {
                    xtype: 'splitter'
                }, {
                    name: 'PaidAmount',
                    xtype: 'numberfield',
                    hideTrigger: true,
                    fieldLabel: '已付金额',
                    maxValue: 99999999,
                    minValue: 0,
                    colspan: 3,
                    allowBlank: false,
                    value:0,
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '请输入数字'
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
                    name: 'Remarks',
                    fieldLabel: '备注',
                    width: 780,
                    xtype: 'textarea',
                    colspan: 3
                }]
            }
            ]
        };

        this.add({
            border: false,
            store: storeItem,
            xtype: 'form',
            itemId: 'commonPaySelect',
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
            store: storeItem,
            forceFit: true,
            tbar: [{
                text: '查询',
                xtype: 'button',
                iconCls: 'icon-search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="commonPaySelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    storeItem.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    //  flag = 'add';
                    var addItemWindow = Ext.ComponentMgr.create(commonPayItemMgrWindow);
                   // addItemWindow.record = null;
                    addItemWindow.setOperationType('add');
                    addItemWindow.callerComp = sender;
                    Ext.getCmp('btnAddPay').hidden = true;
                    me.BasicInfoPK = null;
                    addItemWindow.show(this);                    
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

                        var viewWindow = Ext.ComponentMgr.create(commonPayItemMgrWindow);
                        viewWindow.setOperationType('view');
                        viewWindow.callerComp = sender;
                        viewWindow.record = record;
                        //viewWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('CommonPayNo') }));
                        viewWindow.down('form').loadRecord(record);
                     
                        Ext.getCmp('btnSaveItem').hidden = true;
                        if (record.get('IsPayoff') == 'Y') {
                            Ext.getCmp('btnAddPay').hidden = true;
                        }
                        viewWindow.show(this);
                    }
                }
                ]
            }, {
                dataIndex: 'CommonPayNo',
                hidden: true
            }, {
                dataIndex: 'ReceiveName',
                width: 150,
                text: '收款方'
            }, {
                dataIndex: 'PayReason',
                width: 150,
                text: '付款原因'
            }, {
                text: '总金额',
                dataIndex: 'TotalAmount'
            }, {
                text: '已付金额',
                dataIndex: 'PaidAmount'
            }, {
                text: '制单人',
                dataIndex: 'CreateUserName'
            },  {
                text: '状态',
                dataIndex: 'IsPayoff',
                renderer: function (value) {
                    if (value == 'Y') {
                        return '<span style="color:green">已付清</span>';
                    }
                    else {
                        return '<span style="color:red">未付清</span>';
                    }
                }
            },{
                text: '创建时间',
                dataIndex: 'CreateTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: '备注',
                dataIndex: 'Remarks'
            }]
        });
        //其他付款制单草稿列表
        this.add({
            xtype: 'datagrid',
            store: commonPayStore,
            forceFit: true,
            tbar: [{
                text: '查询付款单',
                xtype: 'button',
                iconCls: 'icon-search',
                handler: function (sender) {
                    commonPayStore.load({
                        params: null
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
                    linkText: '提交申请',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        var payAppWindow = Ext.ComponentMgr.create(commonPayWindow);
                        payAppWindow.setOperationType('update');
                        payAppWindow.callerComp = sender;
                        payAppWindow.record = record;
                        payAppWindow.add(Ext.create('widget.uploadpanel', { GroupGuid: record.get('BillNo') }));
                        payAppWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        payAppWindow.show(this);
                        var strStepName = record.get('StepName');
                        if (strStepName == "退回") {
                            var object = Ext.ComponentQuery.query('[itemId="CommonPayAddAppLog"]')[0];
                            object.show();
                            appCommonPayLogstore.load({
                                params: { BillNo: record.get('BillNo') }
                            });
                        }

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
                dataIndex: 'StepName',
                renderer: function (value) {
                    if (value == "退回") {
                        return '<span style="color:red">退回</span>';
                    }
                    else {
                        return '<span style="color:green">' + value + '</span>';
                    }
                }
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