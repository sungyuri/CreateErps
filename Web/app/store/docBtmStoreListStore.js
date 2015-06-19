//船员物品清单
Ext.define("TCSYS.store.docBtmStoreListStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_BTM_STORE_LIST',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docBtmStoreListStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'ADDITIONAL_TYPE', type: 'string' },
        { name: 'ADDITIONAL_NUMBER', type: 'string' },
        { name: 'STORE_TYPE', type: 'string' },
        { name: 'STORE_NAME', type: 'string' },
        { name: 'STORE_QUENTITY', type: 'int' },
        { name: 'QUENTITY_UNIT', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});
