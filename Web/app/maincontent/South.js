Ext.define("TCSYS.maincontent.South", {
    extend: "Ext.panel.Panel",
    alias: "widget.maincontent_south",
    region: 'south',
    height: 20,
    bodyCls: "south",
    html: '<div class="footer">Copyright © 神州数码      技术支持 . Technical Support</div>',
    border: false,
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
    }
});