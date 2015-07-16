Ext.define("TCSYS.combo.GoodsTypeCombo", {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: '货物类型',
    alias: ['widget.goodsTypefield'],
    valueField: 'GoodsTypeCode',
    displayField: 'GoodsTypeName',
    queryMode: 'local',

    initComponent: function () {
                var object = new Object();
                object.TYPE = '';
                var store = Ext.data.StoreManager.lookup('GoodsTypeStore');
                if (!store) {
                    this.store = Ext.create('TCSYS.store.GoodsTypeStore');

                } else {
                    this.store = store;
                }
                this.store.load({
                    params: object
                });
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