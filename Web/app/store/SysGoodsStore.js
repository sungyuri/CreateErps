//货物 GoodsCode, GoodsVersion, GoodsNo, GoodsName, GoodsCount, GoodsUnit, Manufacturer
Ext.define("TCSYS.store.SysGoodsStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetSysGoods',
    pageSize: 10,
    autoLoad: false,
    storeId: 'SysGoodsStore',
    fields: [
        { name: 'GoodsCode', type: 'int', displayInGrid: '代码', hidden: true },
        { name: 'GoodsVersion', type: 'string', displayInGrid: '型号' },
        { name: 'GoodsNo', type: 'string', displayInGrid: '编号' },
         { name: 'GoodsName', type: 'string', displayInGrid: '名字' },
          { name: 'GoodsCount', type: 'string', displayInGrid: '数量' },
           { name: 'GoodsUnit', type: 'string', displayInGrid: '单位' },
            { name: 'Manufacturer', type: 'string', displayInGrid: '制造商' }
    ]
});
