Ext.define("TCSYS.combo.SysAreaCombo", {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: '区域',
    alias: ['widget.areafield'],
    valueField: 'AreaCode',
    displayField: 'AreaName',
    queryMode: 'local',
//    queryParam: 'TYPE',
//    allQuery: 3,

    initComponent: function () {
                var object = new Object();
                object.TYPE = 3;
                var store = Ext.data.StoreManager.lookup('SysAreaStore');
                if (!store) {
                    this.store = Ext.create('TCSYS.store.SysAreaStore');
                    
                } else {
                    this.store = store;
                }
                this.store.load({
                    params: object
                });
//        if (!this.store) {
//            this.store = Ext.create('TCCARGO.store.HBIStore');
//        }
        this.callParent(arguments);
    }

//    listeners: {
//        expand: function (combo, eOpts) {
//            var object = new Object();
//            object.TYPE = 3;
//            var store = Ext.data.StoreManager.lookup('hblStore');
//            if (!store) {
//                store = Ext.create('TCCARGO.store.HBIStore');
//            }

//            store.load({
//                params: object
//            });
//            combo.bindStore(store);
//        }
//    }
});