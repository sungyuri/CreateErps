//船用物品申报
Ext.define("TCSYS.store.docMarineStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_MARINE_STORE',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docMarineStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'STORE_TYPE', type: 'string' },
        { name: 'STORE_NAME', type: 'string' },
        { name: 'STORE_QUENTITY', type: 'int' },
        { name: 'QUENTITY_UNIT', type: 'string' },
        { name: 'STOWAGE_PLACE', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});