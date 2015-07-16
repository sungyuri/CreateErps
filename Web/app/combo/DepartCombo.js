Ext.define("TCSYS.combo.DepartCombo", {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.departfield'],
    valueField: 'DepartCode',
    displayField: 'DepartName',
    queryMode: 'local',
//    queryParam: 'TYPE',
//    allQuery: 12,

    initComponent: function () {
        var object = new Object();
        object.TYPE = 12;
        var store = Ext.data.StoreManager.lookup('SysDepartStore');
        if (!store) {
            this.store = Ext.create('TCSYS.store.SysDepartStore');

        } else {
            this.store = store;
        }
        this.store.load({
            params: object
        });
//        if (!this.store) {
//            this.store = Ext.create('TCCARGO.store.jianShuStore');
//        }
        this.callParent(arguments);
    },

    listeners: {
        change: function (combo, newValue, oldValue, eOpts) {
            //            combo.expand();
        }
    }
});