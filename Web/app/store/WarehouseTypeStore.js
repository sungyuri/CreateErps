//仓库类型  WarehouseCode, WarehouseName
Ext.define("TCSYS.store.WarehouseTypeStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetWarehouseType',
    pageSize: 8,
    autoLoad: false,
    storeId: 'WarehouseTypeStore',
    fields: [
        { name: 'WarehouseCode', type: 'int', displayInGrid: '代码', show: true },
        { name: 'WarehouseName', type: 'string', displayInGrid: '名称' }
    ]
});
