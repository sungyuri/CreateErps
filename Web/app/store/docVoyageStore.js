//航次摘要
Ext.define("TCSYS.store.docVoyageStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_VOYAGE',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docVoyageStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'ITINERARY_CODE', type: 'string' },
        { name: 'ARRIVAL_DATE', type: 'date',dateFormat:'YmdHiO' },
        { name: 'DEPARTURE_DATE', type: 'date', dateFormat: 'YmdHiO' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});