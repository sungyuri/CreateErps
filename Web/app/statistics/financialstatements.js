Ext.define('TCSYS.statistics.financialstatements', {
    extend: 'Ext.panel.Panel',
    title: '财务报表',
    xtype: 'financialstatements',
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        var busniessTypeStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                { "value": "E", "name": "出口" },
                { "value": "I", "name": "进口" }
            ]
        });


        var store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'FINANCILSTATEMENTS_BLL/Get',
            fields: ['VES', 'VOY',  'CONSIGNER', 'ETD','ETA', 'JOBNO', 'MBLNO','SALES','SHIPOWNER','POL','POD','CARGOTITLE','BUSINESSTYPE',
					'CONTA','CONSIGNERNAME','SALESNAME','SHIPOWNERNAME']
        });

        this.add({
            border: false,
            xtype: 'panel',
            title: '检索条件',
            collapsible: true,
            layout: {
                type: 'vbox'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'form',
                itemId: 'financialstatementsMgrForm1',
                border: false,
                margin: "5 0 5 0",
                layout: {
                    type: 'hbox'
                },
                width: '100%',
                defaults: {
                    width: '15%',
                    labelWidth: 50
                },
                items: [{
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    name: 'ETD_FROM',
                    fieldLabel: '开航日期'
                }, {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    name: 'ETD_TO',
                    fieldLabel: '到'
                }, {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    name: 'ETA_FROM',
                    fieldLabel: '抵港日期'
                }, {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    name: 'ETA_TO',
                    fieldLabel: '到'
                }, {
                    xtype: 'textfield',
                    name: 'CONSIGNER',
                    fieldLabel: '定舱人'
                },{
                    xtype: 'combo',
                    queryMode: 'local',
                    store: busniessTypeStore,
                    displayField: 'name',
                    valueField: 'value',
                    name: 'BUSINESSTYPE',
                    fieldLabel: '业务类型'
                } ]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store: store,
            forceFit: true,
            tbar: [
            {
                text: '查询',
                xtype: 'button',
                name: 'search',
                iconCls: 'icon-search',
                handler: function (sender) {
                    var object1 = Ext.ComponentQuery.query('[itemId="financialstatementsMgrForm1"]')[0];
                    var form1 = object1.getForm();

                    var obj = form1.getValues();

                    store.load({
                        params: obj
                    });
                }
            }, {
                text: '导出',
                xtype: 'updatebutton',
                iconCls: 'icon-excel',
                handler: function (sender) {
                    //var record = this.up('grid').getSelectionModel().getSelection()[0];

                    var object1 = Ext.ComponentQuery.query('[itemId="financialstatementsMgrForm1"]')[0];
                    var form1 = object1.getForm();

                    var obj = form1.getValues();

                    if (obj == undefined) return;
                    var params = { EXPORTTYPE: 'financialstatements' };
                    params.ETD_FROM = obj.ETD_FROM;
					params.ETD_TO = obj.ETD_TO;
					params.ETA_FROM = obj.ETA_FROM;
					params.ETA_TO = obj.ETA_TO;
					params.CONSIGNER = obj.CONSIGNER;
                    params.BUSINESSTYPE = obj.BUSINESSTYPE;
                    // params.vPol = obj.POL;
                    // params.vPod = obj.POD;
                    // params.vConta = obj.CONTA;
                    download(baseUrl + '/app/freightManager/exportExcel.ashx', params);
                }
            }],
            columns: [
			{
                text: '船名',
                dataIndex: 'VES'
            },{
                text: '航次',
                dataIndex: 'VOY'
            },{
                text: '定舱人',
                dataIndex: 'CONSIGNERNAME'
            },{
                text: '开航日',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                dataIndex: 'ETD'
            },{
                text: '抵港日',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                dataIndex: 'ETA'
            }, {
                text: '运单号',
                dataIndex: 'JOBNO'
            },{
                text: '提单号',
                dataIndex: 'MBLNO'
            },{
                text: '销售员',
                dataIndex: 'SALESNAME'
            },{
                text: '船东',
                dataIndex: 'SHIPOWNERNAME'
            },{
                text: '装货港',
                dataIndex: 'POL'
            },{
                text: '卸货港',
                dataIndex: 'POD'
            },{
                text: '品名',
                dataIndex: 'CARGOTITLE'
            },{
                text: '业务类型',
                dataIndex: 'BUSINESSTYPE',
                renderer: function (value) {
                    if (value != undefined)
                        return value.replace("E", "出口").replace("I", "进口");
                }
            },{
                text: '箱型',
                dataIndex: 'CONTA'
            }]
        });
    }
})