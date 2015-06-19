Ext.define('TCSYS.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    requires: ["TCSYS.maincontent.North",
        "TCSYS.maincontent.Center",
        "TCSYS.maincontent.West",
        "TCSYS.maincontent.IndexPage"
        ],
    items: [{
        xtype: "maincontent_north"
    }, {
        xtype: "maincontent_west",
        name: 'maincontent_west'
    },{
        xtype: 'maincontent_center'
    }],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        me.on("afterrender", function () {
            me.initUserEnvironment();
        });
    },
    initUserEnvironment: function (user) {
        var west = this.query("maincontent_west")[0];
      // west.init(user);
        west.hidden = true;
    }
});