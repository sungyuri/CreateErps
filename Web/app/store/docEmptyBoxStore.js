//沿海空箱
Ext.define("TCSYS.store.docEmptyBoxStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_EMPTY_BOX',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docEmptyBoxStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'CROSS_BORDER_SHIP', type: 'string' },
        { name: 'CROSS_BORDER_VOYAGE', type: 'string' },
        { name: 'CROSS_BORDER_DATE', type: 'date', dateFormat: 'YmdHiO' },
        { name: 'EQUIPMENT_NUMBER', type: 'string' },
        { name: 'EQUIPMENT_SIZE_TYPE', type: 'string' },
        { name: 'LOAD_PLACE_CODE', type: 'string' },
        { name: 'DISCHARG_PLACE_CODE', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});
