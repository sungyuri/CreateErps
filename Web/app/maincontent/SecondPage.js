Ext.define('TCSYS.maincontent.SecondPage', {
    extend: 'Ext.panel.Panel',
    alias: "widget.maincontent_secondpage",
    itemId: 'secondPageItemId',
    title: '待办事项',
    plain: true,
    layout: 'border',
    border: false,
    name: 'maincontent_secondpage',
    initComponent: function () {

        var store = Ext.create('TCEPORT.Store', {
            autoLoad: false,
            url: 'PublicDictionary/Get_DaiBanData',
            fields: ['AGENT_CODE', 'AGENT_NAME', 'APPR_NO', 'BILL_NO', 'CERT_MARK', 'CO_OWNER', 'CONTR_NO', 'CUSTOM_MASTER', 'CUT_MODE', 'D_DATE', 'DEC_PORT',
             'DISTINATE_PORT', 'DISTRICT_CODE', 'EX_SOURCE', 'FEE_CURR', 'FEE_MARK', 'FEE_RATE', 'GROSS_WT', 'I_E_DATE', 'I_E_PORT', 'IN_RATIO', 'INSUR_CURR', 'CUSTOMS_FIELD',
             'INSUR_MARK', 'INSUR_RATE', 'ITEMS_NO', 'LICENSE_NO', 'MANUAL_NO', 'MOD_NUM', 'NET_WT', 'NOTE_S', 'OTHER_CURR', 'OTHER_MARK', 'OTHER_RATE', 'OWNER_CODE',
             'OWNER_NAME', 'P_DATE', 'PACK_NO', 'PAY_MODE', 'PAY_WAY', 'PAYMENT_MARK', 'SEQ_NO', 'SERVICE_FEE', 'TRADE_CO', 'TRADE_COUNTRY', 'TRADE_MODE', 'TRADE_NAME',
             'TRAF_MODE', 'TRAF_NAME', 'TRANS_MODE', 'TYPIST_NO', 'TYPE_ID', 'WRAP_TYPE', 'ENTRY_ID', 'PRE_ENTRY_ID', 'JZXSL', 'BONDED_NO', 'BP_NO', 'DECL_PORT', 'COMPANYID',
             'EDI_ID', 'EDI_REMARK', 'I_E_FLAG', 'ID_CHK', 'PARTNER_ID', 'RELATIVE_ID', 'VOYAGE_NO', 'BOSS_ID', 'COP_NAME', 'COP_CODE', 'INPUTER_NAME', 'ENTRY_TYPE',
             'EXTEND_FIELD', 'JD_NO', 'COP_ID', 'IS_TWODECLARE', 'DEC_MODE', 'DEC_TIN', 'ENTRUST_CO', 'JSF', 'OP_TYPE', 'CODE_NO', 'ZD_NAME', 'CTR_TYPE', 'CTR_ZG_TYPE', 'OP_NAME',
             'OP_NAME', 'BZTNAME', 'MODNAME', 'I_E_PORTNAME', 'TRADE_CONAME', 'CO_OWNERSH', 'TRAF_MODENAME', 'OWNER_NAME', 'AGENT_NAME', 'ABBR_TRADENAME', 'ABBR_CUTNAME',
             'PAYMENT_MARKNAME', 'TRADE_COUNTRYNAME', 'PORT_NAME', 'DISTRICT_NAME', 'TRANS_SPEC', 'FEE_MARKNAME', 'FEE_CURRNAME', 'INSUR_MARKNAME', 'INSUR_CURRNAME',
             'OTHER_MARKNAME', 'OTHER_CURRNAME', 'WRAP_NAME', 'CUSTOM_MASTERNAME', 'RELATIVE_MANUAL_NO', 'TRAFNAME_1', 'BUSNIESSTYPE'],
            storeId: 'declStore'
        });

        var customStore = Ext.create('TCEPORT.Store', {
            autoLoad: false,
            url: 'PublicDictionary/Get_DaiBanCustoms',
            fields: ['ID', 'PRE_INPUT_NO', 'BILL_NO', 'CUSTOMS_STATUS', 'BUSNIESSTYPE', 'COMPANYID'],
            storeId: 'customStore'
        });

        this.callParent(arguments);


        store.load();
        customStore.load();

        this.add({
            xtype: 'panel',
            region: 'center',
            border: false,
            autoScroll: true,
            items: [
                {
                    itemId: 'bgdbItemId',
                    xtype: 'fieldset',
                    margin: "5",
                    height: '100%',
                    title: '报关待办',
                    hidden: true,
                    collapsible: true,
                    items: [
                        {
                            itemId: 'bgdbGridItemId',
                            xtype: 'datagrid',
                            store: store,
                            height: 480,
                            forceFit: true,
                            listeners: {
                                itemdblclick: function (grid, record, item, index, e, eOpts) {
                                    if (record == null) {
                                        Ext.Msg.show({
                                            title: '提示',
                                            width: 75,
                                            msg: '请选择一条记录！',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.MessageBox.INFO
                                        });
                                        return;
                                    }
                                }
                            },
                            tbar: [
                                {
                                    text: '处理',
                                    xtype: 'button',
                                    name: 'send',
                                    iconCls: 'icon-htmlUpload',
                                    handler: function (sender) {
                                        var record = this.up('grid').getSelectionModel().getSelection()[0];
                                        if (record == null) {
                                            Ext.Msg.show({
                                                title: '提示',
                                                width: 75,
                                                msg: '请选择一条记录！',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                            return;
                                        }

                                        var window = '';
                                        var busniessType = record.get("SEQ_NO");
                                        busniessType = busniessType.substr(0, 1);

                                        callapi("PublicDictionary/Update_DaiBanDecl", {
                                            busniessType: busniessType,
                                            copId: record.get('COP_ID')
                                        }, function (result) {
                                            if (result > 0) {
                                                if (busniessType == "E") {

                                                    window = Ext.create('TCSYS.customs.customsoutMgr', {
                                                        currentRecord: record,
                                                        title: '修改',
                                                        isFlag: 'update',
                                                        isMark: 'daiban'
                                                    });

                                                    //Ext.ComponentQuery.query('[itemId="outPrintItemId"]')[0].setDisabled(false);
                                                    window.down('form[itemId="customsoutFormItemId"]').loadRecord(record);
                                                } else if (busniessType == "I") {

                                                    window = Ext.create('TCSYS.customs.customsinMgr', {
                                                        currentRecord: record,
                                                        title: '修改',
                                                        isFlag: 'update',
                                                        isMark: 'daiban'
                                                    });
                                                    Ext.ComponentQuery.query('[itemId="inPrintItemId"]')[0].setDisabled(false);
                                                    window.down('form[itemId="customsinFormItemId"]').loadRecord(record);
                                                }

                                                window.show();
                                            }
                                        });
                                        store.load();
                                    }
                                }
                            ],
                            multiSelect: true,
                            selModel: {
                                mode: 'MULTI',
                                selType: 'checkboxmodel'
                            },
                            columns: [
                                {
                                    text: '出入境类型',
                                    dataIndex: 'BUSNIESSTYPE',
                                    renderer: function (value) {
                                        if (value != undefined)
                                            return value.replace("E", "出口").replace("I", "进口");
                                    }
                                },
                                {
                                    text: '业务编号',
                                    dataIndex: 'SEQ_NO'
                                }, {
                                    text: '提运单号',
                                    dataIndex: 'BILL_NO'
                                }, {
                                    text: '单据状态',
                                    dataIndex: 'ID_CHK',
                                    renderer: function (value) {
                                        if (value != undefined)
                                            return value.replace("0", "待办").replace("1", "预录入").replace("2", "已发送").replace("3", "已回执");
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    itemId: 'bjdbItemId',
                    xtype: 'fieldset',
                    margin: "5",
                    height: '100%',
                    title: '报检待办',
                    hidden: true,
                    collapsible: true,
                    items: [
                        {
                            itemId: 'bjdbGridItemId',
                            xtype: 'datagrid',
                            store: customStore,
                            height: 480,
                            forceFit: true,
                            listeners: {
                                itemdblclick: function (grid, record, item, index, e, eOpts) {
                                    if (record == null) {
                                        Ext.Msg.show({
                                            title: '提示',
                                            width: 75,
                                            msg: '请选择一条记录！',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.MessageBox.INFO
                                        });
                                        return;
                                    }
                                }
                            },
                            tbar: [
                                {
                                    text: '处理',
                                    xtype: 'button',
                                    name: 'send',
                                    iconCls: 'icon-htmlUpload',
                                    handler: function (sender) {
                                        var record = this.up('grid').getSelectionModel().getSelection()[0];
                                        if (record == null) {
                                            Ext.Msg.show({
                                                title: '提示',
                                                width: 75,
                                                msg: '请选择一条记录！',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                            return;
                                        }

                                        var decl_id = '';
                                        var window = '';
                                        callapi("TC_CUSTOMS_CIQ_BLL/InsertNEWDecl", {
                                            preInputNo: record.get('PRE_INPUT_NO'),
                                            billNo: record.get('BILL_NOs')
                                        }, function (result) {
                                            if (result != null) {
                                                decl_id = result;

                                                window = Ext.create('TCSYS.customs.declJumpMgr', {
                                                    title: '报检',
                                                    decl_id: decl_id
                                                });

                                                window.show();
                                            }
                                        });
                                        customStore.load();
                                    }
                                }
                            ],
                            multiSelect: true,
                            selModel: {
                                mode: 'MULTI',
                                selType: 'checkboxmodel'
                            },
                            columns: [
                                {
                                    text: '出入境类型',
                                    dataIndex: 'BUSNIESSTYPE',
                                    renderer: function (value) {
                                        if (value != undefined)
                                            return value.replace("E", "出口").replace("I", "进口");
                                    }
                                },
                                {
                                    text: '预录入号',
                                    dataIndex: 'PRE_INPUT_NO'
                                }, {
                                    text: '提运单号',
                                    dataIndex: 'BILL_NO'
                                }, {
                                    text: '单据状态',
                                    dataIndex: 'CUSTOMS_STATUS',
                                    renderer: function (value) {
                                        if (value != undefined)
                                            return value.replace("0", "待办").replace("1", "已发送");
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]

        });
    }
});