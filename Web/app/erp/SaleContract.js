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
            autoLoad: false,
            url: 'SaleContract_BLL/Get',
            addUrl: 'SaleContract_BLL/Insert',
            updateUrl: 'SaleContract_BLL/Update',
            deleteUrl: 'SaleContract_BLL/Delete',
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

        //新增窗口
        var SaleContractMgrWindow = {
            xtype: 'datawindow',
            title: '销售合同',
            store: store,
            resizable: false,
            items: [{
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 1000,
                defaults: {
                    xtype: 'textfield'
                },
                items: [{ xtype: 'textfield', name: 'BillNo', hidden: true },
                    {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        items: [{
                            margin: '5 0 5 0',
                            xtype: 'label',
                            text: "工 矿 产 品 购 销 合 同"
                        }]
                    },
                    {
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                  //  title: '工 矿 产 品 购 销 合 同',
                    items: [{
                        columnWidth: .4,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CustomerNo',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '需方',
                            store: 'ViewCustomerStore',
                            xtype: 'searchfield',
                            displayField: 'CustomerName',
                            valueField: 'CustomerNo',
                            labelWidth: 50,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('CustomerNo'));
                                            tigger.setValue(record.get('CustomerName'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{ 
                            xtype: 'splitter'                        
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'ContractCode',
                            margin: '5 0 5 0',
                            fieldLabel: '合同编号',
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            colspan: 2,
                            labelWidth: 50,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'PurUserCode',
                            xtype: 'searchfield',
                            store: 'ViewUserStore',
                            displayField: 'PurUserName',
                            valueField: 'PurUserCode',
                            margin: '5 0 5 0',
                            fieldLabel: '销售员',
                            labelWidth: 50,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('PurUserCode'));
                                            tigger.setValue(record.get('PurUserName'));
                                        }
                                    }

                            }
                        }]
                    }, , {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,                     
                        items: [{
                            name: 'VESSELCOLOR',
                            margin: '5 0 5 0',
                            fieldLabel: '船体颜色',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{                              //根据报文，应该有颜色代码词典
                            name: 'FUNNELCOLOR',
                            margin: '5 0 5 0',
                            fieldLabel: '烟囱颜色',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CREWLIMIT',
                            margin: '5 0 5 0',
                            fieldLabel: '船员限额',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'PASSENGERLIMIT',
                            margin: '5 0 5 0',
                            fieldLabel: '旅客限额',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'IMO',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: 'IMO编号',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 150,
                            style: 'background-color:#dfe8f6'
                            //colspan: 2
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CALLSIGN',
                            margin: '5 0 5 0',
                            fieldLabel: '呼号',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'GROSSTONNAGE',
                            margin: '5 0 5 0',
                            fieldLabel: '总吨位',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'NETTONNAGE',
                            margin: '5 0 5 0',
                            fieldLabel: '净吨位',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'DEADWEIGHTTONNAGE',
                            margin: '5 0 5 0',
                            fieldLabel: '最大重量',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELLENGTH',
                            margin: '5 0 5 0',
                            fieldLabel: '船长',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELBREADTH',
                            margin: '5 0 5 0',
                            fieldLabel: '船宽',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELDEAPTH',
                            margin: '5 0 5 0',
                            fieldLabel: '船高',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'HORSEPOWER',
                            margin: '5 0 5 0',
                            fieldLabel: '马力',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'SPEED',
                            margin: '5 0 5 0',
                            fieldLabel: '船速',
                            xtype: 'textfield',
                            labelWidth: 50,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }]
                }//‘基本信息’fieldset结束
                , {
                    xtype: 'fieldset',
                    layout: 'column',
                    columnWidth: 1,
                    //anchor: '100%',
                    collapsible: true,
                    title: '主要信息',
                    items: [{
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELCORPNAMEEN',
                            margin: '5 0 5 0',
                            fieldLabel: '船公司英文名称',
                            xtype: 'textfield',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELCORPNAMECN',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '船公司中文名称',
                            xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'VESSELSORT',
                            margin: '5 0 5 0',
                            fieldLabel: '船舶种类代码',
                            xtype: 'searchfield',
                            store: 'shipTypeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('VESSELSORT'));
                                        tigger.setValue(record.get('VESSELSORT_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CERTIFICATENO',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            margin: '5 0 5 0',
                            fieldLabel: '船舶国籍证书编号',
                            xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CERTIFICATEDATE',
                            xtype: 'datefield',
                            format: 'Ymd',
                            editable: false,
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '国籍证书签发日期',
                            //xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CONTROLTYPE',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '船舶监管类型',
                            xtype: 'searchfield',
                            store: 'controlTypeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            labelWidth: 90,
                            width: 130,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('CONTROLTYPE'));
                                        tigger.setValue(record.get('CONTROLTYPE_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'HAILINGPORT',
                            margin: '5 0 5 0',
                            fieldLabel: '船籍港代码',
                            xtype: 'searchfield',
                            store: 'portCodeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('HAILINGPORT'));
                                        tigger.setValue(record.get('HAILINGPORT_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'BUILDDATE',
                            xtype: 'datefield',
                            format: 'Ymd',
                            editable: false,
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            margin: '5 0 5 0',
                            fieldLabel: '船舶建造日期',
                            //xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CLASSIFICATIONNO',
                            margin: '5 0 5 0',
                            fieldLabel: '等级证书号',
                            xtype: 'textfield',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CLASSLETTER',
                            margin: '5 0 5 0',
                            fieldLabel: '等级号',
                            xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'RECORDDATETIME',
                            xtype: 'datefield',
                            format: 'Ymd',
                            editable: false,
                            margin: '5 0 5 0',
                            fieldLabel: '备案日期',
                            //xtype: 'textfield',
                            labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'COCODE',
                            margin: '5 0 5 0',
                            fieldLabel: '船公司编码',
                            xtype: 'textfield',
                            labelWidth: 90,
                            width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'COMMUNICATIONID',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '船舶通讯号码',
                            xtype: 'textfield',
                            labelWidth: 100,
                            width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'COMMUNICATIONTYPE',
                            margin: '5 0 5 0',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            fieldLabel: '通讯方式类别',
                            xtype: 'searchfield',
                            store: 'communicationModeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            labelWidth: 100,
                            width: 130,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('COMMUNICATIONTYPE'));
                                        tigger.setValue(record.get('COMMUNICATIONTYPE_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'TPITPC',
                            margin: '5 0 5 0',
                            fieldLabel: 'TPI/TPC',
                            xtype: 'textfield',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'EMAIL',
                            margin: '5 0 5 0',
                            fieldLabel: '电子邮件',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'SATELLITEPHONE',
                            margin: '5 0 5 0',
                            fieldLabel: '卫星电话',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, , {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'LINETYPE',
                            margin: '5 0 5 0',
                            fieldLabel: '运营性质',
                            xtype: 'searchfield',
                            store: 'enterprisePropertyStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender: function (tigger, opt) {
                                    if (record) {
                                        //alert(record);
                                        tigger.setHiddenValue(record.get('LINETYPE'));
                                        tigger.setValue(record.get('LINETYPE_TEXT'));
                                    }
                                }
                            }
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'DEEPDRAFT',
                            margin: '5 0 5 0',
                            fieldLabel: '满吃水',
                            xtype: 'textfield',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'LIGHTDRAFT',
                            margin: '5 0 5 0',
                            fieldLabel: '空吃水',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CARBINWINDOWNUM',
                            margin: '5 0 5 0',
                            fieldLabel: '舱口数',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CARGODEAR',
                            margin: '5 0 5 0',
                            fieldLabel: '起重设备',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'BALECAPACITY',
                            margin: '5 0 5 0',
                            fieldLabel: '包装舱容',
                            xtype: 'textfield',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'GRAINCAPACITY',
                            margin: '5 0 5 0',
                            fieldLabel: '散装舱容',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'CEILINGTEU',
                            margin: '5 0 5 0',
                            fieldLabel: '舱内TEU',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'DECKTEU',
                            margin: '5 0 5 0',
                            fieldLabel: '甲板TEU',
                            xtype: 'textfield',
                            //labelWidth: 100,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'MEMO',
                            margin: '5 0 5 0',
                            fieldLabel: '备注',
                            xtype: 'textarea',
                            labelWidth: 90,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        items: [{
                            name: 'R_STATUE',
                            margin: '5 0 5 0',
                            fieldLabel: 'R_STATUE',
                            xtype: 'textfield',
                            labelWidth: 90,
                            hidden: true,
                            //width: 130,
                            style: 'background-color:#dfe8f6'
                        }]
                    }]
                }

                ]
            }],
            buttons: [{
                xtype: 'tbfill'
            }, {
                text: '保存',
                name: 'btnSave',
                handler: function () {
                    var currentWindow = this.up('window');
                    var form = currentWindow.down('form').getForm();
                    if (!form.isValid()) {
                        return;
                    }
                    else {
                        var formValues = form.getValues();
                        //alert(formValues);
                        formValues.SHIP_NO = me.BasicInfoPK;
                        if (this.up('window').operationType == "add") {
                            if (me.BasicInfoPK == null) {
                                store[currentWindow.operationType + "Data"]({ entity: formValues, type: 0 }, function (value) {
                                    me.BasicInfoPK = value;
                                    //alert(formValues);
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                });
                            }
                            else {
                                store["updateData"]({ entity: formValues, type: 0 }, function (value) {
                                    me.BasicInfoPK = value;
                                    if (value != '') {
                                        Ext.shortAlert('操作成功');
                                        store.load();
                                        currentWindow.close();
                                    } else {
                                        Ext.shortAlert('操作失败');
                                    }
                                });
                            }
                        }
                        else {
                            store["updateData"]({ entity: formValues, type: 0 }, function (value) {

                                me.BasicInfoPK = value;
                                if (value != '') {
                                    Ext.shortAlert('操作成功');
                                    store.load();
                                    currentWindow.close();
                                } else {
                                    Ext.shortAlert('操作失败');
                                };
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
                    if (form.isValid()) {
                        Ext.Msg.confirm('提示', '确定申报？', function (check) {
                            if (check == "yes") {
                                var formValues = form.getValues();
                                formValues.ID = me.BasicInfoPK;
                                if (currentWindow.operationType == "add") {
                                    store[currentWindow.operationType + "Data"]({ entity: formValues, type: 1 }, function (value) {
                                        me.BasicInfoPK = value;
                                        if (value == 'true') {
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                            currentWindow.close();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                        //Ext.getCmp('shipWindow').close();
                                    });
                                }
                                else {

                                    store["updateData"]({ entity: formValues, type: 1 }, function (value) {
                                        //alert("3");
                                        me.BasicInfoPK = value;
                                        if (value != '') {
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                            currentWindow.close();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                        //Ext.getCmp('shipWindow').close();
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

        var searchShipWindow = {

        };

        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'shipDataRecordSelect',
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
                    name: 'SHIP_NAME',
                    fieldLabel: '船舶名称'
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
                    //alert(obj);
                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    addWindow.show(this);
                    me.BasicInfoPK = null;
                }
            }
            //, {
            //    text: '修改',
            //    xtype: 'updatebutton',
            //    handler: function (sender) {
            //        record = this.up('grid').getSelectionModel().getSelection()[0];
            //        //alert(record);
            //        if (record != null) {
            //            var updateWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
            //            updateWindow.setOperationType('update');
            //            updateWindow.callerComp = sender;
            //            updateWindow.down('form').loadRecord(record);
            //            me.BasicInfoPK = record.get('SHIP_NO');
            //            updateWindow.show(this);
            //        }
            //        else {
            //            Ext.Msg.alert('提示', '请先选中一条信息！');
            //        }


            //    }
            //}, {
            //    text: '删除',
            //    xtype: 'deletebutton',
            //    handler: function () {
            //        var records = this.up('grid').getSelectionModel().getSelection();
            //        //var records = grid.getStore().getAt(rowIndex);
            //        //alert(records);
            //        if (records != null&&records!="") {
            //            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
            //                if (check == "yes") {
            //                    var array = [];
            //                    Ext.Array.each(records, function (item) {
            //                        array.push("'" + item.get('SHIP_NO') + "'");
            //                    });
            //                    store.deleteData({ strID: array.join(',') }, function () {
            //                        Ext.shortAlert('操作成功');
            //                        store.load();
            //                    });
            //                }
            //            });
            //        } else {
            //            Ext.Msg.alert('提示', '请先选中一条信息！');
            //        }

            //    }
            //}
            ],
            //multiSelect: false,
            //selModel: {
            //    mode: 'SINGLE',  //多选multi,simple,单选single;
            //    selType: 'checkboxmodel',  
            //    showHeaderCheckbox: false,  //不显示标题栏中的一键全选按键
            //    allowDeselect:true  //允许取消选中状态
            //},
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 100,
                itemId: 'lc',
                items: [{
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        //record = grid.getSelectionModel().getSelection();
                        //alert(record.get('SHIP_NO'));
                        var updateWindow = Ext.ComponentMgr.create(SaleContractMgrWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SHIP_NO');
                        updateWindow.show(this);
                    }
                }, {
                    linkText: '删除',
                    disabled: true,
                    handler: function (grid, rowIndex, colIndex) {
                        var records = grid.getStore().getAt(rowIndex);
                        if (records != null) {
                            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                                if (check == "yes") {
                                    var array = [];
                                    Ext.Array.each(records, function (item) {
                                        array.push("'" + item.get('SHIP_NO') + "'");
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
                }],
                listeners: {
                    afterrender: function () {
                        alert(record.get('R_STATUE'));
                        if (record.get('R_STATUE') == '1') {
                            Ext.getCmp('lc').disable();
                        }
                    }
                }
            }, {
                dataIndex: 'SHIP_NO',
                text: '船舶编号'
            }, {
                dataIndex: 'VESSELNAMEEN',
                text: '船舶名称'
            }, {
                text: '船舶国籍证书编号',
                width: 120,
                dataIndex: 'CERTIFICATENO'
            }, {
                text: '国籍证书签发日期',
                width: 120,
                dataIndex: 'CERTIFICATEDATE'
            }, {
                text: '建造日期',
                dataIndex: 'BUILDDATE'
            }, {
                text: '船舶通讯号码',
                dataIndex: 'COMMUNICATIONID'
            }, {
                text: '船舶通讯方式类别',
                width: 120,
                dataIndex: 'COMMUNICATIONTYPE'
            }, {
                text: '监管类型',
                dataIndex: 'CONTROLTYPE'
            }, {
                text: '船公司中文名称',
                dataIndex: 'VESSELCORPNAMECN'
            }]
        });

    }
})