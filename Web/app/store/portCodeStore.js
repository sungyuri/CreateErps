//港口代码
Ext.define("TCSYS.store.portCodeStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetComboData?type=PortCode',
    pageSize: 8,
    autoLoad: false,
    storeId: 'portCodeStore',
    fields: [
        { name: 'KEY_VALUE', type: 'string', display: '代码', show: true },
        { name: 'KEY_TEXT', type: 'string', display: '名称' },
        { name: 'KEY_TEXT_EN', type: 'string', display: '英文名称' }
    ]
});
