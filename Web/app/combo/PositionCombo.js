Ext.define("TCSYS.combo.PositionCombo", {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: '职位',
    alias: ['widget.positionfield'],
    valueField: 'PositionCode',
    displayField: 'PositionName',
    queryMode: 'local',

    initComponent: function () {
        var store = Ext.data.StoreManager.lookup('SysPositionStore');
        if (!store) {
            this.store = Ext.create('TCSYS.store.SysPositionStore');
            
        } else {
            this.store = store;
        }
        this.store.load();
        this.callParent(arguments);
    },

    listeners: {
        change: function (combo, newValue, oldValue, eOpts) {
            //combo.expand();
        }
    }
});