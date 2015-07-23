Ext.define('TCSYS.maincontent.MoreMenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.MoreMenu',
    height: 640,
    width: 310,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    modal: true,
    border: false,
    usercode:'',
    bodyBorder: false,
   // closeAction: "hide",
    name: 'maincontent_MoreMenu',
   // autoScroll: true,
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        var treePl = Ext.create('TCSYS.maincontent.MenuWindow', {

        });
        this.items = ({
            xtype: 'panel',
            border: false,
            items:
    		[
    		 	{
    		 	    xtype: 'toolbar',
    		 	    border: false,
    		 	    items:
					[
						{
						    xtype: "button",
						    text: "保存",
						    iconCls: "icon-save",
						    handler: this.onCheckedNodesClick
						}
					]
    		 	},
                {
                    xtype: 'panel',
                    border: false,
                    items: treePl
                }

    		]
        }
        );
        this.callParent(arguments);
        this.on("afterrender", function () {
            this.initUserEnvironment(this.usercode);
        });
    },
    onCheckedNodesClick: function () {
        var MenuWindow = Ext.ComponentQuery.query("maincontent_MenuWindow")[0];
        var sysflag = "save";
         //alert(MenuWindow.idarr);  
        callapi("SYSTEM_TMODULEQuery/saveCookie", { rolist: MenuWindow.idarr, ucode: MenuWindow.usercode }, function (result) {
            if (result == 'true') {
                Ext.shortAlert('操作成功');
            }
            else {
                Ext.shortAlert(result);
            }
            this.up('window').close();
           // var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
          //  homePage.getStore().load({ params: { type: sysflag } });
        }, this);
        //var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
        //homePage.getStore().load({ params: { type: sysflag } });


    },
    initUserEnvironment: function (user) {
        var MenuWindow = this.query("maincontent_MenuWindow")[0];
        MenuWindow.addid(user);
        MenuWindow.init(user); 
        
    }
});