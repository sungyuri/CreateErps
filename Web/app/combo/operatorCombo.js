Ext.define("TCCARGO.combo.operatorCombo", {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: '报检员',
    alias: ['widget.operatorfield'],
    valueField: 'OPERATOR_CODE',
    displayField: 'OPERATOR_NAME',
    queryMode: 'local',
    //queryParam: 'TYPE',
    //allQuery: 'INS',

    initComponent: function () {
                //var object = new Object();
                //object.TYPE = 'INS';
        var store = Ext.data.StoreManager.lookup('operatorStore');
                if (!store) {
                    this.store = Ext.create('TCCARGO.store.operatorStore');

                } else {
                    this.store = store;
                }
                this.store.load();
//        if (!this.store) {
//            this.store = Ext.create('TCCARGO.store.baoFeiStore');
//        }
        this.callParent(arguments);
    }

//    listeners: {
//        change: function (combo, newValue, oldValue, eOpts) {
//            var object = new Object();
//            object.TYPE = 'INS';
//            var store = Ext.data.StoreManager.lookup('baoFeiStore');
//            if (!store) {
//                this.store = Ext.create('TCCARGO.store.baoFeiStore');

//            } else {
//                this.store = store;
//            }
//            this.store.load({
//                params: object
//            });
//        },
//        expand: function (combo, eOpts) {
//            var object = new Object();
//            object.TYPE = 'INS';
//            var store = Ext.data.StoreManager.lookup('baoFeiStore');
//            if (!store) {
//                this.store = Ext.create('TCCARGO.store.baoFeiStore');
//            } else {
//                this.store = store;
//            }
//            this.store.load({
//                params: object
//            });
//        }
//    }
});