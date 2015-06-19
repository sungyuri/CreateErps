//货物申报
Ext.define("TCSYS.store.docGoodsReportStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_GOODS_REPORT',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docGoodsReportStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'LOADING_PLACE_CODE', type: 'string' },
        { name: 'DISCHARGE_PLACE_CODE', type: 'string' },
        { name: 'SHIP_MARK', type: 'string' },
        { name: 'GOODS_TYPE', type: 'string' },
        { name: 'EQUIPMENT_SIZE_TYPE', type: 'string' },
        { name: 'EQUIPMENT_LOADED_STATUS', type: 'int' },
        { name: 'PACKAGE_TYPE', type: 'string' },
        { name: 'GOODS_TOTAL_NUMBER', type: 'int' },
        { name: 'CARGO_DISCRIPTION', type: 'string' },
        { name: 'GROSS_WEIGHT', type: 'float' },
        { name: 'QUENTITY_UNIT', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }

    ]
});