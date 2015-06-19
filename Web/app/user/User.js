Ext.define('ZCJK.user.User', {
    extend: 'Ext.panel.Panel',
    title: '登陆页面',
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        Ext.Loader.setConfig({ enabled: true });

        var store = Ext.create('TCEPORT.Store', {
            pageSize: 10,
            url: 'TU_COMPANYRule/GetData',
            fields: ['ID', 'NAME', 'WardCompanyID', 'AreaType', 'TYPEFLAG', 'BillHead', 'WardCompanyName', 'AreaTypeName', 'TypeName']
        });


        this.add({
            columns: 3,
            border: false,
            store: store,
            xtype: 'searchpanel',
            collapsed: false,
            items: [{
                xtype: 'textfield',
                name: 'NAME',
                fieldLabel: '企业名称'
            }, {
                fieldLabel: '监管海关',
                name: 'WardCompanyID',
                xtype: 'TCEPORTcombo',
                selectDefault: true,
                editable: false,
                store: [['', '全部'], ['2365', '张保税港'], ['2313', '张家港保税区海关'], ['0', '其它'], ['2305', '张家港海关'], ['2348', '张家港保税区(保税港区)海关']]
            }, {
                xtype: 'textfield',
                name: 'ID',
                fieldLabel: '企业编号'
            },
             {
                 fieldLabel: '地理区域',
                 name: 'AreaType',
                 xtype: 'TCEPORTcombo',
                 selectDefault: true,
                 editable: false,
                 store: [['', '全部'], ['B', '张家港保税区'], ['E', '张家港保税港东区'], ['G', '国内'], ['K', '其它口岸(转关)'], ['W', '张家港保税港西区'], ['M', '张家港保税港西区码头'], ['Y', '永嘉码头'], ['EW', '张家港保税港东西区'], ['0', '其它']]
             }, {
                 fieldLabel: '企业类型',
                 name: 'Type',
                 xtype: 'textfield'
             }, {
                 fieldLabel: '企业类型',
                 name: 'Type',
                 xtype: 'TCEPORTcombo',
                 selectDefault: true,
                 editable: false,
                 store: [['', '全部'], ['A', '报关企业'], ['M', '生产企业'], ['T', '贸易企业'], ['W', '仓储企业'], ['0', '其它'], ['WM', '物流企业'], ['L', '理货公司']]
             }, {
                 xtype: 'button',
                 text: '海关登陆',
                 handler: function () {
                     self.location = 'Default.aspx?strCustomsID=2313&strBillHead={BillHead}&strCompanyID=2313&strCompanyType=C';
                 }
             }, {
                 xtype: 'button',
                 text: '国检登陆',
                 handler: function () {
                     self.location = 'Default.aspx?strCustomsID=2388&strBillHead={BillHead}&strCompanyID=2388&strCompanyType=J';
                 }
             }]
        });


        this.add({
            xtype: 'datagrid',
            title: '拆箱申请清单',
            store: store,
            forceFit: true,
            columns: [{
                text: '企业名称',
                dataIndex: 'NAME'
            }, {
                text: '企业编号',
                dataIndex: 'ID'
            }, {
                text: '监管海关',
                dataIndex: 'WardCompanyName'
            }, {
                text: '地理区域',
                dataIndex: 'AreaTypeName'
            }, {
                text: '企业类型',
                dataIndex: 'TypeName'
            }, {
                dataIndex: 'BillHead',
                hidden: true
            }, {
                dataIndex: 'TYPEFLAG',
                hidden: true
            }, {
                xtype: 'templatecolumn',
                tpl: '<a href="Default.aspx?strCustomsID=\'2313\'&strBillHead={BillHead}&strCompanyID={ID}&strCompanyType={TYPEFLAG}">【进入系统】</a>'
            }]
        });

    }
});