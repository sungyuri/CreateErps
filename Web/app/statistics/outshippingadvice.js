Ext.define('TCSYS.statistics.outshippingadvice', {
    extend: 'Ext.panel.Panel',
    title: '业务报表',
    xtype: 'outshippingadvice',
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
            url: 'CONSIGNMAIN_BLL/GetShippingAdvice',
            fields: ['VES', 'VOY', 'ETD']
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
                itemId: 'shippingadviceMgrForm1',
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
                    fieldLabel: '开始'
                }, {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    name: 'ETD_TO',
                    fieldLabel: '到',
                    labelWidth: 30
                }, {
                    xtype: 'textfield',
                    name: 'VES',
                    fieldLabel: '船  名'
                }, {
                    xtype: 'textfield',
                    name: 'VOY',
                    fieldLabel: '航次',
                    width: '10%',
                    labelWidth: 35
                }]
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
                    var object1 = Ext.ComponentQuery.query('[itemId="shippingadviceMgrForm1"]')[0];
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
                    var record = this.up('grid').getSelectionModel().getSelection()[0];
                    if (record == undefined) return;
                    var params = { EXPORTTYPE: 'ShippingAdvice' };
                    params.VES = record.data.VES;
                    params.VOY = record.data.VOY;
                    params.ETD = record.data.ETD;
                    download(baseUrl + '/app/freightManager/exportExcel.ashx', params);
                }
            }],
            columns: [{
                text: '船名',
                dataIndex: 'VES'
            }, {
                text: '航次',
                dataIndex: 'VOY'
            },{
                text: '开航日',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                dataIndex: 'ETD'
            }, {
                text: '到港日',
                xtype: 'datecolumn',
                format: 'Y-m-d',
                dataIndex: 'ETA'
            }]
        });
    }
})