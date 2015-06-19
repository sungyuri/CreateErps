//内贸集装箱货物
Ext.define("TCSYS.store.docEquipmentStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_EQUIPMENT_SOTRE',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docEquipmentStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'EQUIPMENT_NUMBER', type: 'string' },
        { name: 'EQUIPMENT_SIZE_TYPE', type: 'string' },
        { name: 'CONTAINER_NUMBER', type: 'int' },
        { name: 'SEAL_NUMBER', type: 'string' },
        { name: 'CARGO_DESCRIPTION', type: 'string' },
        { name: 'GORSS_WEIGHT', type: 'float' },
        { name: 'CONSIGNEE_NAME', type: 'string' },
        { name: 'CONSIGNOR_NAME', type: 'string' },
        { name: 'LOAD_PLACE_CODE', type: 'string' },
        { name: 'DISCHARGE_PLACE_CODE', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' },
        { name: 'TRAN_DOC_NUMBER', type: 'string' }

    ]
});