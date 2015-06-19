Ext.define("TCEPORT.SearchField", {
    extend: "Ext.form.field.Picker",
    alias: "widget.searchfield",
    control: null,
    store: null,
    triggerCls: "x-form-search-trigger",
    matchFieldWidth: false,
    config: {
        displayField: null,
        valueField: null,
        gridWidth: null,
        needBrackets: null,
        needValidate: null
    },
    constructor: function (cfg) {
        var config = {};
        if (this.gridWidth == null) {
            this.setGridWidth(340);
        }
        this.needCheck = cfg.needCheck;

        Ext.apply(config, cfg);

        if (config.store) {
            var storeCfg = {};
            if (cfg.pageSize != null) {
                storeCfg.pageSize = cfg.pageSize;
            }
            if (Ext.typeOf(config.store) == 'string') {
                this.store = TCEPORT.StoreMgr.get(config.store, storeCfg);
            } else if (Ext.typeOf(config.store) == 'object') {
                this.store = config.store;
            }
            if (cfg.pageSize != null) {
                this.store.pageSize = cfg.pageSize;
            }
            delete config.store;
        }
        this.callParent([config]);
    },
    initComponent: function () {
        var me = this;
        me.callParent();
        me.on("change", me.searchValue, me);
        me.on('specialkey', me.specialKeyAction, me);
        me.on('expand', function () {
            me.firstExpand = true;
        }, me);

        //        me.on('blur', me.blur, me);
    },

    blur: function () {
        var me = this;
        var grid = this.picker;
        if (me.value != null && me.value != "") {
            me.onSelectItem(null, grid.store.getAt(0));
        }
    },
	onDownArrow: function(e) {
        if (!this.isExpanded) {
            return;
        }
    },
    specialKeyAction: function (sender, e) {
        var me = this;
        var grid = this.picker;
        var currentKey = e.getKey();
        var index = -1;

        if (grid == undefined) {
            return;
        }

        if (currentKey != e.UP && currentKey != e.DOWN && currentKey != e.LEFT && currentKey != e.RIGHT && currentKey != e.ENTER) {
            return;
        }
        if (!me.isExpanded) {
            delete me.firstExpand;
            return;
        }
        if (grid == null || grid.rendered == false) {
            return;
        }

        var record = grid.getSelectionModel().getSelection();
        if (record == null || record.length == 0) {
            record = null;
        }
        else {
            record = record[0];
        }

        if (record != null) {
            index = me.store.indexOf(record);
        }
        var pagingToolBar = grid.query('pagingtoolbar');
        if (pagingToolBar != null && pagingToolBar.length > 0) {
            pagingToolBar = pagingToolBar[0];
        }
        if (currentKey == e.LEFT) {
            pagingToolBar.movePrevious();
        }
        else if (currentKey == e.RIGHT) {
            pagingToolBar.moveNext();
        }
        else if (currentKey == e.DOWN) {
            index++;
            if (index >= me.store.getCount()) {
                return;
            }
            grid.getSelectionModel().select(index);
        }
        else if (currentKey == e.UP) {
            index--;
            if (index <= 0) {
                index = 0;
            }
            grid.getSelectionModel().select(index);
        }
        if (currentKey == e.ENTER) {
            var onlyOne = grid.store.getCount();
            if (onlyOne == 1) {
                record = grid.store.getAt(0);
                grid.getSelectionModel().select(0);
            }
            me.onSelectItem(null, record);
        }
        me.focus();
    },

    cannotClick: function () {
        this.canClickFlag = false;
    },
    canClick: function () {
        this.canClickFlag = true;
    },

    searchValue: function (sender, newValue, oldValue, eOpts) {
        //如果是由弹窗设置的值，不触发change事件。
        if (newValue == '') {
            this.setHiddenValue('');
        }
        if (this.setbyWindow) {
            delete this.setbyWindow;
            return;
        }
        if (this.isSetValue) {
            return;
        }
        var me = this;
        if (this.isSetValue == true) {
            return;
        }
        if (me.cancelChange == true) {
            me.cancelChange = false;
            return;
        }
        if (!me.isSetLoadEvent) {
            if (me.store != null) {
                me.store.on("load", me.storeLoaded, me);
            }
            me.isSetLoadEvent = true;
        }
        var param = me.extraParams;
        if (Ext.typeOf(param) != "undefined") {
            param.name = newValue;
            me.store.load({
                params: param
            });
        } else {
            me.store.load({
                params: {
                    name: newValue
                }
            });
        }
        me.focus();
    },

    //    focus: function () {
    //        var me = this;
    //        me.store.load({
    //            params: me.extraParams
    //        });
    //        me.expand();
    //        me.picker.getSelectionModel().select(0);
    //    },

    onTriggerClick: function () {
        if (!this.fireEvent('beforeclick')) {
            return;
        }
        if ((this.canClickFlag != null) && (!this.canClickFlag)) {
            return;
        }
        var me = this;
        var store = me.store;
        if (store != null) {
            if (this.multiSelect) {
                var element = Ext.create('TCEPORT.SearchWindowMultiSelect', {
                    store: this.store,
                    pageSize: this.pageSize,
                    displayField: this.displayField,
                    valueField: this.valueField,
                    updateStore: this.updateStore,
                    value: this.hiddenValue,
                    extraParams: this.extraParams
                });
                element.searchField = me;
                element.show();
                return;
            }
            else {
                var element = Ext.create('TCEPORT.SearchWindow', {
                    store: this.store,
                    pageSize: this.pageSize,
                    displayField: this.displayField,
                    extraParams: this.extraParams,
                    firstLoad: this.firstLoad,
                    valueField: this.valueField,
                    needBrackets: this.needBrackets
                });
                element.searchField = me;
                me.searchField = element;
                element.show();
                return;
            }

        }
        else {
            var control = me.control;
            if (control == null) {
                return;
            }
            if (control instanceof Ext.window.Window) {
                control.show();
                control.searchField = me;
                return;
            }
            if (Ext.typeOf(control) == "string") {
                var element = Ext.create(control);
                element.searchField = me;
                element.show();
                return;
            }
            if (control["xtype"] != null) {
                var element = Ext.widget(control);
                element.searchField = me;
                element.show();
                return;
            }
            else {
                var element = Ext.create("TCEPORT.SearchFieldWindow", control);
                control.searchField = me;
                element.show();
                return;
            }
        }
    },

    createPicker: function () {
        var me = this;
        var dataGrid = {
            store: me.store,
            pickerField: me,
            width: me.getGridWidth(),
            forceFit: true,
            focusOnToFront: false,
            border: false,
            floating: true,
            columns: me.buildColumns()
        };
        if (this.multiSelect == true) {
            dataGrid.selModel = { mode: "SIMPLE" };
        }
        var param = me.extraParams;
        if (Ext.typeOf(param) != "undefined") {
            param.name = this.getValue();
            me.store.load({
                params: param
            });
        } else {
            me.store.load({
                params: {
                    name: this.getValue()
                }
            });
        }
        //        me.store.load({
        //            params: { name: this.getValue() }
        //        });
        me.picker = Ext.create("TCEPORT.DataGrid", dataGrid);
        me.picker.on("itemclick", me.onSelectItem, me);
        return me.picker;
    },

    setHiddenValue: function (value) {
        this.hiddenValue = value;
    },

    buildColumns: function () {
        var columnArray = [];
        var fields = this.store.model.getFields();
        var column;
        for (var i = 0; i < fields.length - 1; i++) {
            column = {};
            column.dataIndex = fields[i].name;
            if (fields[i].displayInGrid)
                column.text = fields[i].displayInGrid;
            if (fields[i].hidden && fields[i].hidden == true) {
                column.hidden = true;
            }
            if (fields[i].flex) {
                column.flex = fields[i].flex;
            }
            columnArray.push(column);
        }

        return columnArray;
    },

    storeLoaded: function (sender, records, successful, eOpts) {
        var me = this;
        if (successful == false) {
            return;
        }
        if (records.length > 0) {
            me.expand();
            me.picker.getSelectionModel().select(0);
        }
        this.focus();
    },

    getHiddenValue: function () {
        return this.hiddenValue;
    },

    getSubmitData: function () {
        var me = this,
            data = null;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            data = {};
            var value = me.getHiddenValue();
            if (value == null) {
                var displayValue = me.getValue();
                if (displayValue == null)
                { data[me.getName()] = ''; }
                else {
                    data[me.getName()] = displayValue;
                }
            }
            else {
                data[me.getName()] = value;
            }
        }
        return data;
    },

    setValue: function () {
        this.isSetValue = true;
        this.callParent(arguments);
        this.isSetValue = false;
    },

    setRecord: function (record) {
        var me = this;
        var valueField = me.bindValueField || me.valueField;
        var displayField = me.bindDisplayField || me.displayField;
        if (record instanceof Ext.data.Model) {
            me.setHiddenValue(record.get(valueField));
            //me.setValue(record.get(displayField));
            if (this.needBrackets != null) {
                if (!this.needBrackets)
                    me.setValue(record.get(displayField));
            }
            else {
                me.setValue(record.get(displayField) + "(" + record.get(valueField) + ")");
            }
        }
        else {
            me.setHiddenValue(record[valueField]);
            if (this.needBrackets != null) {
                if (!this.needBrackets)
                    me.setValue(record[displayField]);
            }
            else {
                if (record[displayField] == null && record[valueField] == null) {

                }
                else {
                    if (record[displayField] != "" && record[valueField] != "") {
                        me.setValue(record[displayField] + "(" + record[valueField] + ")");
                    }

                }
            }
        }
    },
    onSelectItem: function (sender, record, item, index, e) {
        this.fireEvent('gridItemClick', record);

        var me = this;

        if (record == null) {
            me.collapse();
            return;
        }
        var selModel = me.picker.getSelectionModel();
        if (selModel.isSelected(record)) {
            if (me.multiSelect == true) {
                me.selectRecords.push(record);
            }
            else {
                me.selectRecords = record;
            }
        }
        else {
            if (me.multiSelect == true) {
                Ext.Array.remove(me.selectRecords, record);
            }
            else {
                me.selectRecords = null;
            }
        }
        var displayField = this.getDisplayField();
        var valueField = this.getValueField();
        var displayValue = null;
        if (Ext.typeOf(displayField) == "string") {
            if (Ext.typeOf(me.selectRecords) == "array") {
                for (var i = 0; i < me.selectRecords.length; i++) {
                    if (i == 0) {
                        displayValue = me.selectRecords[i].get(displayField);
                        continue;
                    }
                    displayValue += ";" + me.selectRecords[i].get(displayField);
                }
            }
            else {
                displayValue = me.selectRecords.get(displayField);
            }
        }
        if (Ext.typeOf(displayField) == "function") {
            displayValue = displayField(me.selectRecords);
        }

        var valueFieldValue = "";
        if (Ext.typeOf(valueField) == "string") {
            if (Ext.typeOf(me.selectRecords) == "array") {
                for (var i = 0; i < me.selectRecords.length; i++) {
                    if (i == 0) {
                        valueFieldValue = me.selectRecords[i].get(valueField);
                        continue;
                    }
                    valueFieldValue += ";" + me.selectRecords[i].get(valueField);
                }
            }
            else {
                valueFieldValue = me.selectRecords.get(valueField);
            }
        }
        if (Ext.typeOf(displayField) == "function") {
            valueFieldValue = displayField(me.selectRecords);
        }
        me.cancelChange = true;
        //        me.setRawValue(displayValue + "(" + valueFieldValue + ")");
        me.setHiddenValue(valueFieldValue);

        if (this.needBrackets != null) {
            if (!this.needBrackets)
                me.setValue(displayValue);
        }
        else {
            //            me.setRawValue(displayValue + "(" + valueFieldValue + ")");
            me.setRawValue(displayValue);
        }

        me.un('blur');
        if (this.multiSelect != true) {
            me.collapse();
        }
    }
});