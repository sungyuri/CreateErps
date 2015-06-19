//航线性质代码
Ext.define("TCSYS.store.linePropertyStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetComboData?type=LineProperty',
    pageSize: 8,
    autoLoad: false,
    storeId: 'linePropertyStore',
    fields: [
        { name: 'KEY_VALUE', type: 'string', display: '代码', show: true },
        { name: 'KEY_TEXT', type: 'string', display: '名称' },
        { name: 'KEY_TEXT_EN', type: 'string', display: '英文名称' }
    ]
});
