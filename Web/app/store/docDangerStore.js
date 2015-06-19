//危险货物申报
Ext.define("TCSYS.store.docDangerStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_DANGE',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docDangerStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'TRAN_DOC_NUMBER', type: 'string' },
        { name: 'MCV_NUMBER', type: 'string' },
        { name: 'PACKAGE_KIND_NUMBER', type: 'string' },
        { name: 'PROPER_SHIP_NAME', type: 'string' },
        { name: 'DCLASS', type: 'string' },
        { name: 'UN_NUMBER', type: 'string' },
        { name: 'PACK_GROUP', type: 'string' },
        { name: 'SUBSIDIARY_RISK', type: 'string' },
        { name: 'FLASH_POINT', type: 'string' },
        { name: 'MARINE_POLLUTANT', type: 'int' },
        { name: 'GORSS_NET_WEIGHT', type: 'float' },
        { name: 'EMS', type: 'string' },
        { name: 'STOWAGE_POSITION', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});
