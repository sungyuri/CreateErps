//船员名单
Ext.define("TCSYS.store.docBtmListStore", {
    extend: "TCEPORT.Store",
    url: 'DocDeclaration_BLL/GetDocDetail?tblName=TRAN_DOC_BTM_LIST',
    pageSize: 20,
    autoLoad: false,
    storeId: 'docBtmListStore',
    fields: [
        { name: 'SCHEDULE_ID', type: 'string' },
        { name: 'SEQUENCE_NUMBER', type: 'int' },
        { name: 'PERESON_NAME', type: 'string' },
        { name: 'GENDER', type: 'string' },
        { name: 'NATIONALITY', type: 'string' },
        { name: 'RANK', type: 'string' },
        { name: 'BIRTHDAY', type: 'date', dateFormat: 'Ymd' },
        { name: 'BIRTHPLACE', type: 'string' },
        { name: 'ADDITIONAL_TYPE', type: 'string' },
        { name: 'ADDITIONAL_NUMBER', type: 'string' },
        { name: 'FREE_TEXT', type: 'string' }
    ]
});
