Ext.define("TCCARGO.combo.MBlCombo", {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: 'MB/LISSUE',
    alias: ['widget.mblfield'],
    valueField: 'CODE',
    displayField: 'CNAME',
    queryMode: 'local',
//    queryParam: 'TYPE',
//    allQuery: 3,

    initComponent: function () {
        var object = new Object();
        object.TYPE = 3;
        var store = Ext.data.StoreManager.lookup('mblStore');
        if (!store) {
            this.store = Ext.create('TCCARGO.store.MBIStore');
            
        } else {
            this.store = store;
        }
        this.store.load({
            params: object
        });
//        if (!this.store) {
//            this.store = Ext.create('TCCARGO.store.MBIStore');
//        }
        this.callParent(arguments);
    }

//    listeners: {
//        expand: function (combo, eOpts) {
//            var object = new Object();
//            object.TYPE = 3;
//            var store = Ext.data.StoreManager.lookup('mblStore');
//            if (!store) {
//                store = Ext.create('TCCARGO.store.MBIStore');
//            }

//            store.load({
//                params: object
//            });
//            combo.bindStore(store);
//        }
//    }
});