//货物类型    GoodsTypeCode, GoodsTypeName
Ext.define("TCSYS.store.GoodsTypeStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetGoodsType',
    pageSize: 8,
    autoLoad: false,
    storeId: 'GoodsTypeStore',
    fields: [
        { name: 'GoodsTypeCode', type: 'int', displayInGrid: '代码', show: true },
        { name: 'GoodsTypeName', type: 'string', displayInGrid: '名称' }
    ]
});
