//航线性质代码
Ext.define("TCSYS.store.SysAreaStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetSysArea',
    pageSize: 8,
    autoLoad: false,
    storeId: 'SysAreaStore',
    fields: [
        { name: 'AreaCode', type: 'int', displayInGrid: '代码', show: true },
        { name: 'AreaName', type: 'string', displayInGrid: '名称' }
    ]
});
