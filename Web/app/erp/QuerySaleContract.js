﻿/// <reference path="../../saleContractPrintView.aspx" />
/// <reference path="../../saleContractPrintView.aspx" />
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
            url: 'SaleContract_BLL/QuerySaleContract',
            fields: [
                'BillNo',
                'ContractCode',
                'ContractCodeA',
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
            fields: ['SaleBillNo', 'GoodsCode', 'GoodsVersion', 'GoodsName', 'GoodsNo', 'GoodsCount', 'GoodsUnit', 'UnitPrice', 'OutGoodsCount', 'STATE', 'Manufacturer']
        });

        var applogstore = Ext.create('TCEPORT.Store', {
            url: 'SaleContract_BLL/GetSaleAppLog',
            fields: ['BillNo', 'StepNo', 'StepName', 'FlowId', 'AppUserCode', 'UserName', 'AppStep', 'AppState', 'AppNote1', 'AppNote2', 'AppNote3', 'AppNote4', 'AppNote5', 'AppDataFirs', 'AppDataLast']
        });

        //  var flag = '';
        //  var updaterecord = null;
        //新增窗口
        var goodsRow = null;
        var SaleContractMgrViewWindow = {
            xtype: 'datawindow',
            title: '销售合同',
            store: store,
            record: null,
            width: 900,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            items: [ {
                xtype: 'datagrid',
                itemId: 'SaleContractAppLog',
                width: 895,
              //  height: 128,
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
                    renderer: function (value, meta, record) {
                        meta.style = 'overflow:visible;white-space:normal;';
                        return value;
                    },
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
                    text: "工 矿 产 品 购 销 合 同",
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
                       name: 'CustomerNo',
                       margin: '0 0 5 0',
                       allowBlank: false,
                       xtype: 'searchfield',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '该输入项为必输项',
                       fieldLabel: '需方',
                       labelStyle: 'color:red;',
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
                                      //    alert(this.up('window').title)
                                       //   var recd = goodsRow;
                                       //   alert(recd);
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
                       fieldLabel: '销售员',
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
                       store: 'ViewUserStore'
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
                       fieldLabel: '供方',
                       value: '太仓创造电子有限公司',
                       readonly: true
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
                       allowBlank: false,
                       labelStyle: 'color:red;',
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '请选择时间'
                   }, {
                       name: 'ContractAmountBig',
                       xtype: 'label',
                       colspan: 3,
                       width: 880
                   }, {
                       name: 'ContractCodeA',
                       fieldLabel: '对方合同编号',
                       labelStyle: 'color:green;',
                       colspan: 3,
                       width: 350
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
                       name: 'DETAILEDINFO',
                       fieldLabel: '安装信息',
                       width: 880,
                       xtype: 'textarea',
                       rows: 3,
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
               // height: 108,
                border: false,
                renderTo: Ext.getBody(),
                margin: '0,0,0,0',
                store: gridstore,
                forceFit: true,
                bbar: null,
                columns: [{
                    dataIndex: 'SaleBillNo',
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
                    dataIndex: 'UnitPrice'
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
                }]
            }],
            tbar: [{
                xtype: 'tbfill'
            }, {
                text: '打印',
                id:'salePrintBtn',
                iconCls: "icon-print",
                handler: function () {
                    // CreateReport("Report");
                    var salebillNo = me.BasicInfoPK;;
                    Report.LoadFromURL("print/printTemplate/createSale.grf");
                    Report.LoadDataFromURL("print/printData/saleContractData.aspx?billNo=" + salebillNo);
                    Report.PrintPreview(true);
                  // var billNo = me.BasicInfoPK;
                  // window.open("saleContractPrintView.aspx?saleBillNo=" + billNo);
                }
            },{
                text: '关闭',
                iconCls: "icon-cancel",
                handler: function () {
                    this.up('window').close();
                }
            }]
        };

        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'QuerySaleContactSelect',
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
                }, {
                    xtype: 'textfield',
                    name: 'ContractCode',
                    fieldLabel: '合同编号'
                }, {
                    xtype: 'textfield',
                    name: 'PurUserName',
                    fieldLabel: '销售员'
                }, {
                    name: 'IsAppEnd',
                    xtype: 'TCEPORTcombo',
                    width: '15%',
                    store: [['','全部'],['Y', '是'], ['N', '否']],
                    fieldLabel: '审核完成'
                }, {
                    text: '查询',
                    xtype: 'button',
                    iconCls: 'icon-search',
                    width: '6%',
                    style: 'margin-left:20px;',
                    handler: function (sender) {
                        var object = Ext.ComponentQuery.query('[itemId="QuerySaleContactSelect"]')[0]
                        var form = object.getForm();
                        var obj = form.getValues();
                        store.load({
                            params: obj
                        });

                    }
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
                    var object = Ext.ComponentQuery.query('[itemId="QuerySaleContactSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    store.load({
                        params: obj
                    });

                }
            }],
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
                itemId: 'showSale',
                items: [{
                    linkText: '查 看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        var viewSWindow = Ext.ComponentMgr.create(SaleContractMgrViewWindow);
                        viewSWindow.setOperationType('view');
                        viewSWindow.callerComp = sender;
                        viewSWindow.record = record;
                        goodsRow = record;
                        viewSWindow.add(Ext.create('widget.filesPanel', { GroupGuid: record.get('BillNo') }));
                        viewSWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('BillNo');
                        viewSWindow.show(this);
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
                dataIndex: 'CustomerName',
                width: 150,
                text: '客户名称'
            }, {
                text: '录入时间',
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
                text: '销售员',
                dataIndex: 'PurUserName'
            }, {
                text: '状态',
                dataIndex: 'StepName',
                renderer: function (value) {
                    if (value == "审核完成") {
                        return '<span style="color:green">审核完成</span>';
                    }
                    else if (value=='已付款') {
                        return '<span style="color:blue">已付款</span>';
                    }
                    else
                    {
                        return '<span style="color:red">' + value + '</span>';
                    }

                }
            }, {
                text: '创建日期',
                dataIndex: 'CreateTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')             
            }]
        });

    }
})