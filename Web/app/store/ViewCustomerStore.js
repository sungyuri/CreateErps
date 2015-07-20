Ext.define("TCSYS.store.ViewCustomerStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetViewCustomer',
    pageSize: 10,
    autoLoad: false,
    storeId: 'ViewCustomerStore',
    fields: [
        { name: 'UserCode', type: 'string', displayInGrid: '代码', show: true },
        { name: 'UserName', type: 'string', displayInGrid: '名称' },
        { name: 'PositionName', type: 'string', displayInGrid: '职位' },
         { name: 'DepartName', type: 'string', displayInGrid: '部门' },
          { name: 'PositionDesc', type: 'string', displayInGrid: '职位描述' }
    ]
});
