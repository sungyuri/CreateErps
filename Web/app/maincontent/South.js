Ext.define("TCSYS.maincontent.South", {
    extend: "Ext.panel.Panel",
    alias: "widget.maincontent_south",
    region: 'south',
    height: 25,
    bodyCls: "south",
    html: '<div class="footer">Copyright © 太仓创造电子有限公司      技术支持 . Technical Support .  版本 1.0</div>',
    border: false,
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
    }
});