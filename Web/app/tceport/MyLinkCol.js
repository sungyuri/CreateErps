Ext.define('TCEPORT.MyLinkCol', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.mylinkcol',
    linkIdRe: /x-link-col-(\d+)/,
    linkFileName: '',
    linkValue: '',
    cfg: '',
    constructor: function (cfg) {
        var me = this,
            items = cfg.items || (me.items = [me]),
            l = items.length,
            i,
            item;
        me.cfg = cfg;
        var config = {};
        config.text = cfg.text;
        config.align = "center";
        config.width = cfg.width != null ? cfg.width : 100;
        config.dataIndex = cfg.dataIndex;
        config.locked = cfg.locked;
        me.callParent([config]);

        me.renderer = function (v, meta, record, rowIndex, colIndex, store) {
            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments) || '' : '';
            meta.css += ' x-link-col-cell';
            var returnValue = "";
            for (i = 0; i < l; i++) {
                item = items[i];
                var aValue = cfg.dataIndex != null ? record.get(cfg.dataIndex) : item.linkText;
                if (record.get(cfg.linkFileName) == cfg.linkValue) {
                    if (aValue == '查看') {
                        returnValue = '<a href="javascript:void(0)" class="x-link-col-icon x-link-col-' + String(i) + ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || this.scope || this, arguments) : '') + '"' +
                        ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (aValue || '') + '</a>';
                    }
                }
                else {
                    returnValue += '<a href="javascript:void(0)" class="x-link-col-icon x-link-col-' + String(i) + ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || this.scope || this, arguments) : '') + '"' +
                        ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (aValue || '') + '</a>';
                    if (i < l - 1)
                        //returnValue += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        returnValue += '/';
                }
            }
            return returnValue;
        };
    },
    destroy: function () {
        delete this.items;
        delete this.renderer;
        return this.callParent(arguments);
    },
    /**
    * 复写processEvent
    */
    processEvent: function (name, grid, cell, rowIndex, colIndex, e, record, row) {
        var items = this.cfg.items;
        var m = e.getTarget().className.match(this.linkIdRe),
            item, fn;
        if (m && (item = items[parseInt(m[1], 10)])) {
            if (name == 'click') {
                (fn = item.handler || this.handler) && fn.call(item.scope || this.scope || this, grid, rowIndex, colIndex, record, row, item, e);
            } else if ((name == 'mousedown') && (item.stopSelection !== false)) {
                return false;
            }
        }
        return this.callParent(arguments);
    }
});
