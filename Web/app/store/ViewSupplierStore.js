//SupplierNo, SupplierName, ADRESS,Remarks
Ext.define("TCSYS.store.ViewSupplierStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetViewSupplier',
    pageSize: 10,
    autoLoad: false,
    storeId: 'ViewSupplierStore',
    fields: [
        { name: 'SupplierNo', type: 'string', displayInGrid: '代码', show: true, flex: 1 },
        { name: 'SupplierName', type: 'string', displayInGrid: '名称', flex: 3 },
         { name: 'ADRESS', type: 'string', displayInGrid: '地址', hidden: false, flex: 2 },
          { name: 'Remarks', type: 'string', displayInGrid: '备注', hidden: false, flex: 1 }
    ]
});
