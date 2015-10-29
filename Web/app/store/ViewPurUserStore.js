/// 用户//UserCode, UserName, PositionName, DepartName, PositionDesc
Ext.define("TCSYS.store.ViewPurUserStore", {
    extend: "TCEPORT.Store",
    url: 'PublicDictionary/GetViewPurUser',
    pageSize: 10,
    autoLoad: false,
    storeId: 'ViewPurUserStore',
    fields: [
        { name: 'PurUserCode', type: 'string', displayInGrid: '代码', show: true },
        { name: 'PurUserName', type: 'string', displayInGrid: '名称' },
        { name: 'PositionName', type: 'string', displayInGrid: '职位' },
         { name: 'DepartName', type: 'string', displayInGrid: '部门' },
          { name: 'PositionDesc', type: 'string', displayInGrid: '职位描述' }
    ]
});
