var win_status = "";
Ext.define('TCSYS.transport.shipInPreDataRecord', {
    extend: 'Ext.panel.Panel',
    title: '船舶进港预申报列表',
    name: 'shipInPreDataRecord',
    alias: "widget.shipInPreDataRecord",
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
            url: 'ShipInPreDataRecord_BLL/Get',
            addUrl: 'ShipInPreDataRecord_BLL/Insert',
            updateUrl: 'ShipInPreDataRecord_BLL/Update',
            deleteUrl: 'ShipInPreDataRecord_BLL/Delete',
            fields: [
                'SCHEDULE_ID',
                'IMO',
                'SHIP_NO',
                'SHIP_NAME',
                'ENTER_NUMBER',
                'ABROAD_NUMBER',
                'ARRIVAL_DATE',
                'BERTH_CODE',
                'LOADING_DATE',
                'DEPARTURE_PORT_CODE',
                'ARRIVAL_PORT_CODE',
                'AGENT_CODE',
                'CONTEXT_NAME',
                'DECLARATION_DATE',
                'FREE_TEXT',
                'DEPARTURE_PORT_CODE_TEXT',
                'ARRIVAL_PORT_CODE_TEXT'

            ]
        });

        var storeCombo = Ext.create('TCEPORT.Store', {
            autoLoad: false,
            url: 'ShipInPreDataRecord_BLL/GetPreShip',  //ShipDataRecordBLL/Get
            updateUrl: 'ShipDataRecordBLL/Update',
            fields: [
                { name: 'VESSELNAMECN', mapping: 'VESSELNAMECN' },
                { name: 'SHIP_NAME', mapping: 'SHIP_NAME' },
                { name: 'SHIP_NO', mapping: 'SHIP_NO' },
                { name: 'IMO', mapping: 'IMO' }
            ]
        });


        var flag = '';
        var record = null;

        var shipWindow = {
            xtype: 'datawindow',
            store: storeCombo,
            title: '选择船舶',
            id: 'shipWindow',
            resizable: false,
            border: false,
            modal: true,
            bodyBorder: false,
            //plugins: Ext.create('TCEPORT.LinkColumn'),
            height: 400,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                border: false,
                xtype: 'form',
                itemId: 'shipSelectNew',  //新增窗口选择船舶
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
                        width: '15%'
                    },
                    tbar: [{
                        xtype: 'textfield',
                        name: 'SHIP_NAME',
                        fieldLabel: '英文船名'
                    }, {
                        xtype: 'textfield',
                        name: 'IMO',
                        fieldLabel: 'IMO号'
                    }, {
                        text: '查询',
                        xtype: 'button',
                        handler: function (sender) {
                            var object = Ext.ComponentQuery.query('[itemId="shipSelectNew"]')[0];
                            var form = object.getForm();
                            var obj = form.getValues();

                            storeCombo.load({
                                params: obj
                            });

                        }
                    }]
                }]

            }, {
                xtype: 'datagrid',
                store: storeCombo,
                itemId: 'shipInfo_win',
                forceFit: false,
                //multiSelect: true,
                columns: [{
                    xtype: 'linkColumn',//这里就是放置按钮的地方
                    text: '操作',
                    //width: 60,
                    items: [{
                        //icon: '../resources/themes/icons/pencil.png',  // Use a URL in the icon config
                        tooltip: '预申报',
                        linkText: '预申报',
                        handler: function (grid, rowIndex, sender) {
                            //alert(grid);
                            //record = grid.getSelectionModel().getSelection()[0];
                            record = grid.store.getAt(rowIndex);
                            //var record = Ext.getCmp('datagrid').getSelectionModel().getSelected();
                            //alert(record);
                            var updateWindow = Ext.ComponentMgr.create(complexMgrWindow);
                            updateWindow.setOperationType('add');
                            updateWindow.callerComp = sender;
                            updateWindow.down('form').loadRecord(record);
                            //me.BasicInfoPK = record.get('ID');
                            //Ext.getCmp('apply').hidden=true;  //新增进港预报信息时隐藏申报按钮，隐藏按钮id:'apply'
                            updateWindow.show(this);
                        }
                    }]
                },{
                    text: '船舶编号',
                    dataIndex: 'SHIP_NO'
                }, {
                    dataIndex: 'IMO',
                    text: 'IMO号'
                }, {
                    dataIndex: 'SHIP_NAME',
                    text: '英文船名'
                }, {
                    dataIndex: 'VESSELNAMECN',
                    text: '中文船名'
                }]
            }]
        };


        //新增窗口
        var complexMgrWindow = {
            xtype: 'datawindow',
            title: '国际航行船舶进口岸申请书',
            store: store,
            resizable: false,
            items: [{
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 600,
                //layout: {
                //    type: 'table',
                //    tdAttrs: {
                //        style: {
                //            "padding-right": "20px"
                //        }
                //    },
                //    columns: 3
                //},
                defaults: {
                    xtype: 'textfield',
                    labelWidth: 100
                },
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    //anchor: '100%',
                    title: '所选船舶信息',
                    items: [{
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'IMO',
                            readOnly: true,
                            margin: '5 0 5 0',
                            //allowBlank: false,
                            //fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            //blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: 'IMO编号',
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'SHIP_NO',
                            readOnly: true,
                            margin: '5 0 5 0',
                            //allowBlank: false,
                            //fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            //blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: '船舶编号',
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'SHIP_NAME',
                            readOnly: true,
                            margin: '5 0 5 0',
                            //allowBlank: false,
                            //fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            //blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: '船舶名称',
                            style: 'background-color:#dfe8f6'
                        }]
                    }]

                }//船舶信息fieldset结束
                , {
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    //anchor: '100%',
                    title: '预申报信息',
                    items: [{
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'ENTER_NUMBER',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: '进境(港)航次',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'ABROAD_NUMBER',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: '出境(港)航次',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'DEPARTURE_PORT_CODE',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            xtype: 'searchfield',
                            store: 'portCodeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            fieldLabel: '出发港代码',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('DEPARTURE_PORT_CODE'));
                                        tigger.setValue(record.get('DEPARTURE_PORT_CODE_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'ARRIVAL_PORT_CODE',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            xtype: 'searchfield',
                            store: 'portCodeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            fieldLabel: '到达港代码',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('ARRIVAL_PORT_CODE'));
                                        tigger.setValue(record.get('ARRIVAL_PORT_CODE_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'BERTH_CODE',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            xtype: 'textfield',
                            fieldLabel: '泊位代码',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .4,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'ARRIVAL_DATE',
                            //id: 'ARRIVAL_DATE',
                            xtype: 'datetimefield',
                            format: 'YmdHiO',
                            editable: false,
                            margin: '10 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '抵港时间',
                            labelWidth: 70,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'LOADING_DATE',
                            xtype: 'datefield',
                            format: 'Ymd',
                            editable: false,
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            margin: '5 0 5 0',
                            fieldLabel: '装船时间',
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'AGENT_CODE',
                            margin: '5 0 5 0',
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '申报人代码',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .4,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CONTEXT_NAME',
                            margin: '5 0 5 0',
                            xtype: 'textfield',
                            fieldLabel: '申报人姓名',
                            labelWidth: 70,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'DECLARATION_DATE',
                            xtype: 'datefield',
                            format: 'Ymd',
                            editable: false,
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '申报时间',
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'FREE_TEXT',
                            margin: '5 0 5 0',
                            xtype: 'textarea',
                            fieldLabel: '备注',
                            labelWidth: 80,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'SCHEDULE_ID',
                            margin: '5 0 5 0',
                            hidden: true,
                            hideLabel: true,
                            xtype: 'textfield',
                            fieldLabel: '中间主键'
                        }]
                    }]
                }]
            }],
            buttons: [{
                xtype: 'tbfill'
            }, {
                text: '保存',
                name: 'btnSave',
                handler: function () {
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    //alert(form.getValues());
                    if (!form.isValid()) {
                        return;
                    }
                    else {
                        var formValues = form.getValues();
                        formValues.ID = me.BasicInfoPK;  //BasicInfoPK初始值为true?
                        //alert(formValues.ID);
                        if (this.up('window').operationType == "add") {
                            if (me.BasicInfoPK == null) {
                                store[currentWindow.operationType + "Data"]({ entity: formValues, type: 0 }, function (value) {
                                    //alert(currentWindow.operationType + "Data");
                                    me.BasicInfoPK = value;
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                        Ext.getCmp('shipWindow').close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                    
                                });
                            }
                            else {
                                store["updateData"]({ entity: formValues, type: 0 }, function (value) {
                                    //alert("2");
                                    me.BasicInfoPK = value;
                                    if (value != '') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                        Ext.getCmp('shipWindow').close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                    

                                });
                            }
                        }
                        else {

                            store["updateData"]({ entity: formValues, type: 0 }, function (value) {
                                //alert("3");
                                me.BasicInfoPK = value;
                                if (value != '') {
                                    Ext.shortAlert('操作成功');
                                    store.load();
                                    currentWindow.close();
                                    Ext.getCmp('shipWindow').close();
                                } else {
                                    Ext.shortAlert('操作失败');
                                }
                            });
                        }
                    }
                }
            }, {
                text: '申报',
                name: 'apply',
                id: 'apply',
                //hidden:true,
                handler: function () {
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    //alert(form.getValues());
                    if (form.isValid()) {
                        Ext.Msg.confirm('提示', '确定申报？', function (check) {
                            if (check == "yes") {
                                var formValues = form.getValues();
                                formValues.ID = me.BasicInfoPK;
                                //alert(formValues.ID);
                                if (currentWindow.operationType == "add") {
                                    store[currentWindow.operationType + "Data"]({ entity: formValues, type: 1 }, function (value) {
                                        //alert(currentWindow.operationType + "Data");
                                        me.BasicInfoPK = value;
                                        if (value == 'true') {
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                            currentWindow.close();
                                            Ext.getCmp('shipWindow').close();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                        
                                    });
                                }
                                else {

                                    store["updateData"]({ entity: formValues, type: 1 }, function (value) {
                                        //alert("3");
                                        me.BasicInfoPK = value;
                                        if (value !='') {
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                            currentWindow.close();
                                            Ext.getCmp('shipWindow').close();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                    });
                                }
                            }
                        });

                    }
                    else {

                        return;
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    this.up('window').close();
                }
            }]
        };


        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'shipDataRecordSelect',
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
                    width: '15%'
                },
                tbar: [{
                    xtype: 'textfield',
                    name: 'SHIP_NAME',
                    fieldLabel: '英文船名'
                }, {
                    xtype: 'textfield',
                    name: 'IMO',
                    fieldLabel: 'IMO号'
                }]
            }]

        });



        this.add({
            xtype: 'datagrid',
            store: store,
            forceFit: false,
            tbar: [{
                text: '查询',
                xtype: 'button',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="shipDataRecordSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();
                    //(obj);
                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(shipWindow);
                    //alert("111");
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    win_status = "add";
                    storeCombo.load();
                    addWindow.show(this);
                    me.BasicInfoPK = null;
                }
            }],
            //multiSelect: true,
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 100,
                items: [{
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(complexMgrWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SCHEDULE_ID');
                        updateWindow.show(this);
                        //Ext.getCmp('apply').hidden=false;
                    }
                }, {
                    linkText: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                        var records = grid.getStore().getAt(rowIndex);
                        //alert(records);
                        if (records != null) {
                            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                                if (check == "yes") {
                                    var array = [];
                                    Ext.Array.each(records, function (item) {
                                        array.push("'" + item.get('SCHEDULE_ID') + "'");
                                    });
                                    store.deleteData({ strID: array.join(',') }, function () {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                    });
                                }
                            });
                        } else {
                            Ext.Msg.alert('提示', '请先选中一条信息！');
                        }
                    }
                }]
            }, {
                dataIndex: 'SHIP_NO',
                text: '船舶编号'
            }, {
                dataIndex: 'IMO',
                text: 'IMO号'
            }, {
                text: '船名',
                dataIndex: 'SHIP_NAME'
            }, {
                text: '进境航次',
                dataIndex: 'ENTER_NUMBER'
            }, {
                text: '出境航次',
                dataIndex: 'ABROAD_NUMBER'
            }, {
                text: '抵港时间',
                dataIndex: 'ARRIVAL_DATE',
                width: 150
            }, {
                text: '出发港代码',
                dataIndex: 'DEPARTURE_PORT_CODE'
            }, {
                text: '到达港代码',
                dataIndex: 'ARRIVAL_PORT_CODE'
            }, {
                text: '申报人代码',
                dataIndex: 'AGENT_CODE'
            }, {
                text: '申报时间',
                dataIndex: 'DECLARATION_DATE'
            }, {
                text: '表单主键',
                dataIndex: 'SCHEDULE_ID',
                hidden: true
            }]
        });

    }
});