//销售合同
Ext.define('TCSYS.erp.SaleContract', {
    extend: 'Ext.panel.Panel',
    title: '销售合同',
    name: 'SaleContract',
    alias: "widget.SaleContract",
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
            addUrl: 'SaleContract_BLL/Insert',
            updateUrl: 'SaleContract_BLL/Update',
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

        var flag = '';
        var updaterecord = null;
        //新增窗口

        var SaleContractMgrWindow = {
            xtype: 'datawindow',
            title: '销售合同',
            store: store,
            record: null,
            width: 1000,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            resizable: false,
            items: [
                {
                xtype: 'label',
                margin: '10 0 5 0',
                text: "工 矿 产 品 购 销 合 同",
                baseCls: 'y-plain',
                border: false
                },
            {
                xtype: 'form',
                baseCls: 'y-plain',
                border: false,
                width: 995,
                layout: {
                    type: 'table',
                    columns: 3
                },
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                   {
                    name: 'CustomerNo',
                    margin: '10 0 5 0',
                    allowBlank: false,
                    xtype: 'searchfield',
                    fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                    blankText: '该输入项为必输项',
                    fieldLabel: '需方',
                    displayField: 'CustomerName',
                    valueField: 'CustomerNo',
                    needCheck: true,
                    listeners: {
                        //'gridItemClick': function (record) {
                        //  //  this.up('form').down('textfield[name="CustomerNo"]').setValue(record.get('CustomerNo'));
                        //    this.up('form').down('textfield[name="CustomerName"]').setValue(record.get('CustomerName'));
                        //},
                        beforerender:
                                   function (tigger, opt) {
                                       if (record) {
                                           tigger.setHiddenValue(record.get('CustomerNo'));
                                           tigger.setValue(record.get('CustomerName'));
                                       }
                                   }
                    },
                    store: 'ViewCustomerStore'
                   }, {
                       name: 'CustomerName',
                       margin: '10 0 5 0',
                       fieldLabel: '客户名',
                       hidden:true
                   }, {
                       name: 'ContractCode',
                       allowBlank: false,
                       blankText: '该输入项为必输项',
                       margin: '10 0 5 0',
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
                               //  this.up('form').down('textfield[name="CustomerNo"]').setValue(record.get('CustomerNo'));
                               this.up('form').down('textfield[name="PurUserName"]').setValue(record.get('PurUserName'));
                           },
                           beforerender:
                                      function (tigger, opt) {
                                          if (record) {
                                              tigger.setHiddenValue(record.get('PurUserCode'));
                                              tigger.setValue(record.get('PurUserName'));
                                          }
                                      }
                       },
                       store: 'ViewUserStore'
                   }, {
                       name: 'PurUserName',
                       hidden: true
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
                       name: 'DeliveryTime',
                       fieldLabel: '交货时间',
                       format: 'Y-m-d',
                       xtype: 'datefield',
                       allowBlank: false,
                       fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                       blankText: '请选择时间'
                   }, {
                       xtype: 'splitter'
                   }, {
                       name: 'ContractAmountBig',
                       xtype: 'label',
                       colspan: 3
                   },  {
                       name: 'QA',
                       fieldLabel: '质保条件',
                       colspan: 3
                   }, {
                       name: 'DeliveryWay',
                       fieldLabel: '交货方式',
                       colspan: 3
                   }, {
                       name: 'PayWay',
                       fieldLabel: '结算方式',
                       colspan: 3
                   }, {
                       name: 'OtherNote',
                       fieldLabel: '其他',
                       colspan: 3
                   }, {
                       name: 'DETAILEDINFO',
                       fieldLabel: '安装信息',
                       xtype: 'textarea',
                       colspan: 3
                   },{
                       name: 'BillNo',
                       hidden: true
                }]
            }
            //{
            //    xtype: 'datagrid',
            //    itemId: 'SaleContractDetailGrid',
            //  //  width: 995,
            // //   height: 200,
            //    border: false,
            //  //  renderTo: Ext.getBody(),
            //    margin: '0,0,0,0',
            //    store: gridstore,
            //    forceFit: true,
            //    plugins: [
            //                    Ext.create('Ext.grid.plugin.CellEditing', {
            //                        clicksToEdit: 1
            //                    })
            //    ],
            //    tbar: [{
            //        text: '新增',
            //        xtype: 'addbutton',
            //        handler: function (sender) {
            //            var rec = new Object({
            //                SaleBillNo: '',
            //                GoodsCode: '',
            //                GoodsVersion: '',
            //                GoodsName: '',
            //                GoodsNo: '',
            //                GoodsCount: '0',
            //                GoodsUnit: '',
            //                OutGoodsCount: '0',
            //                STATE: 'N',
            //                Manufacturer:''
            //            });
            //            var grid = Ext.ComponentQuery.query('[itemId="SaleContractDetailGrid"]')[0];
            //            grid.getStore().insert(0, rec);
            //        }
            //    }, {
            //        xtype: "button",
            //        text: "清空",
            //        iconCls: "icon-cancel",
            //        handler: this.onRemoveAllClick
            //    }],
            //    columns: [{
            //        dataIndex: 'SaleBillNo',
            //        hidden: true
            //    }, {
            //        dataIndex: 'GoodsName',
            //        hidden: true
            //    }, {
            //        text: '产品名称',
            //        dataIndex: 'GoodsCode',
            //        editor: {
            //            xtype: 'searchfield',
            //           // queryMode: 'local',
            //            store: 'SysGoodsStore',
            //            valueField: 'GoodsCode',
            //            displayField: 'GoodsName',
            //            store: 'SysGoodsStore',
            //            hideTrigger: false,
            //            selectOnFocus: false,
            //            allowBlank: false,
            //            listeners: {
            //                'gridItemClick': function (record) {
            //                    //  this.up('form').down('textfield[name="CustomerNo"]').setValue(record.get('CustomerNo'));
            //                   // this.up('form').down('textfield[name="PurUserName"]').setValue(record.get('PurUserName'));
            //                },
            //                beforerender:
            //                           function (tigger, opt) {
            //                               if (record) {
            //                                   tigger.setHiddenValue(record.get('GoodsCode'));
            //                                   tigger.setValue(record.get('GoodsName'));
            //                               }
            //                           }
            //            }
            //        },
            //        renderer: this.rendererData
            //    }, {
            //        text: '型号',
            //        dataIndex: 'GoodsVersion'
            //        //editor: {
            //        //    xtype: 'combo',
            //        //    store: [['1', 'CNT_SIZE'], ['2', 'DOC']],
            //        //    allowBlank: false
            //        //}, renderer: function (value) {
            //        //    if (value == '1')
            //        //        return 'CNT_SIZE';
            //        //    else (value == '2')
            //        //    return 'DOC';
            //        //}
            //    }, {
            //        text: '编号',
            //        dataIndex: 'GoodsNo'
            //        //editor: {
            //        //    allowBlank: false,
            //        //    regex: /^(\-)?\d+(\.\d+)?$/
            //        //}
            //    }, {
            //        text: '数量',
            //        dataIndex: 'GoodsCount',
            //        editor: {
            //            allowBlank: false,
            //            regex: /^(\-)?\d+(\.\d+)?$/
            //        }
            //    }, {
            //        text: '单位',
            //        dataIndex: 'GoodsUnit'
            //    },  {
            //        dataIndex: 'OutGoodsCount',
            //        hidden: true
            //    },{
            //        dataIndex: 'STATE',
            //        hidden: true
            //    }, {
            //        text: '制造商',
            //        dataIndex: 'Manufacturer'
            //    },  {
            //        xtype: 'actioncolumn',
            //        width: 30,
            //        sortable: false,
            //        menuDisabled: true,
            //        items: [{
            //            iconCls: 'icon-cancel',
            //            tooltip: '删除',
            //            scope: this,
            //            handler: this.onRemoveClick
            //        }]
            //    }]
            //}
            ]
            //buttons: [{
            //    xtype: 'tbfill'
            //}, {
            //    text: '保存',
            //    name: 'btnSave',
            //    id: 'btnSave',
            //    //handler: this.onSaveClick
            //}, {
            //    text: '提交审批',
            //    name: 'btnApp',
            //    id: 'btnApp',
            //   // handler: this.onSaveClick
            //}, {
            //    text: '取消',
            //    handler: function () {
            //        this.up('window').close();
            //    }
            //}]
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
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    flag = 'add';
                    var addWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    addWindow.show(this);
                    me.BasicInfoPK = null;
                    gridstore.removeAll();
                }
            }
            , {
                text: '修改',
                xtype: 'updatebutton',
                handler: function (sender) {
                    flag = 'update';
                    var record = this.up('grid').getSelectionModel().getSelection()[0];
                    //alert(record);
                    if (record != null) {
                        updaterecord = record;
                        var updateWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SaleBillNo');
                        updateWindow.show(this);
                        gridstore.load({
                            params: { SaleBillNo: record.get('SaleBillNo') }
                        });
                    }
                    else {
                        Ext.Msg.alert('提示', '请先选中一条信息！');
                    }


                }
            }
            ],
            multiSelect: false,
            selModel: {
                mode: 'SINGLE',  //多选multi,simple,单选single;
                selType: 'checkboxmodel',  
                showHeaderCheckbox: false,  //不显示标题栏中的一键全选按键
                allowDeselect:true  //允许取消选中状态
            },
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 100,
                itemId: 'lc',
                items: [{
                    linkText: '查看',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var record = grid.getStore().getAt(rowIndex);
                        updaterecord = record;
                        var viewWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        viewWindow.setOperationType('view');
                        viewWindow.callerComp = sender;
                        viewWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SaleBillNo');
                        Ext.getCmp('btnSave').hidden = true;
                        viewWindow.show(this);
                        gridstore.load({
                            params: { SaleBillNo: record.get('SaleBillNo') }
                        });
                    }
                }
               ]
            }, {
                dataIndex: 'ContractCode',
                text: '合同编号'
            }, {
                dataIndex: 'CustomerName',
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
                dataIndex: 'CreateTime'
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
    },
    //保存
    onSaveClick: function (sender) {
        //参数：合同明细

        console.log(sender);
        return;
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
})