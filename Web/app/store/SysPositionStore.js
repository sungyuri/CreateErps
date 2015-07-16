//职位
Ext.define("TCSYS.store.SysPositionStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetSysPosition',
    pageSize: 8,
    autoLoad: false,
    storeId: 'SysPositionStore',
    fields: [
        { name: 'PositionCode', type: 'int', displayInGrid: '代码', show: true },
        { name: 'PositionName', type: 'string', displayInGrid: '名称' }
    ]
});
