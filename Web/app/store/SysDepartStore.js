//部门          DepartCode, DepartName
Ext.define("TCSYS.store.SysDepartStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetSysDepart',
    pageSize: 8,
    autoLoad: false,
    storeId: 'SysDepartStore',
    fields: [
        { name: 'DepartCode', type: 'int', displayInGrid: '代码', show: true },
        { name: 'DepartName', type: 'string', displayInGrid: '名称' }
    ]
});
