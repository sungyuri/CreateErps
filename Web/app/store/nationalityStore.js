//国家代码
Ext.define("TCSYS.store.nationalityStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetComboData?type=Nationality',
    pageSize: 10,
    autoLoad: false,
    storeId: 'nationalityStore',
    fields: [
        { name: 'KEY_VALUE', type: 'string', display: '代码', show: true },
        { name: 'KEY_TEXT', type: 'string', display: '名称' },
        { name: 'KEY_TEXT_EN', type: 'string', display: '英文名称' }
    ]
});
