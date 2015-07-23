//CustomerNo, CustomerName, AreaName, ADRESS, Remarks
Ext.define("TCSYS.store.ViewCustomerStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetViewCustomer',
    pageSize: 10,
    autoLoad: false,
    storeId: 'ViewCustomerStore',
    fields: [
        { name: 'CustomerNo', type: 'string', displayInGrid: '代码', show: true,flex:1 },
        { name: 'CustomerName', type: 'string', displayInGrid: '名称', flex: 3 },
        { name: 'AreaName', type: 'string', displayInGrid: '区域', flex: 1 },
         { name: 'ADRESS', type: 'string', displayInGrid: '地址', hidden: false, flex: 2 },
          { name: 'Remarks', type: 'string', displayInGrid: '备注', hidden: true }
    ]
});
