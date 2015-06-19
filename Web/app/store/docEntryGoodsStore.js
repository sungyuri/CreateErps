//转关货物
Ext.define("TCSYS.store.docEntryGoodsStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_ENTRY_GOODS',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docEntryGoodsStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'TRAN_DOC_NUMBER', type: 'string' },
        { name: 'EQUIPMENT_SIZE_TYPE', type: 'string' },
        { name: 'CONTAINER_NUMBER', type: 'int' },
        { name: 'LOAD_PLACE_CODE', type: 'string' },
        { name: 'DISCHARGE_PLACE_CODE', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});