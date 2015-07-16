/// 用户//UserCode, UserName, PositionName, DepartName, PositionDesc
Ext.define("TCSYS.store.ViewUserStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetViewUser',
    pageSize: 10,
    autoLoad: false,
    storeId: 'ViewUserStore',
    fields: [
        { name: 'UserCode', type: 'string', displayInGrid: '代码', show: true },
        { name: 'UserName', type: 'string', displayInGrid: '名称' },
        { name: 'PositionName', type: 'string', displayInGrid: '职位' },
         { name: 'DepartName', type: 'string', displayInGrid: '部门' },
          { name: 'PositionDesc', type: 'string', displayInGrid: '职位描述' }
    ]
});
