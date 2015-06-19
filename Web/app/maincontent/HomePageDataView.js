Ext.define('TCSYS.maincontent.HomePageDataView', {
    extend: 'Ext.view.View',
    alias: 'widget.homepagedataview',
    require: 'Ext.data.Store',
    plugins: [Ext.create('TCSYS.maincontent.Animated')],
    overItemCls: 'x-view-over',
    itemSelector: 'div.item',
    name: 'homepagedataview',
    store: Ext.create('TCEPORT.Store', {
        url: 'SYSTEM_TMODULEQuery/SelectAllChild',
        autoLoad: false,
        fields: ['ID', 'M_ICON', 'M_LINK', 'FMAINALIAS', 'M_SHOWINDEX']

    }),

    initComponent: function () { 
        this.callParent(arguments);

         var  temp = "first";

        //this.store.load({
            
        //    params: { type: temp}

        //});


    },

    tpl: [
	    '<tpl for=".">',
	        '<div class="item">',
	        	'<div class="thumb">',
	        	'<tpl if="M_SHOWINDEX">',
	        		'<div style="width:23px;height:24px;position:absolute;top:5%;right:8%;background-image:url(resources/themes/images/homepageicons/tiShiKuang.png)">' +
	        		'	<span style="font-size:13px;color:white;width:23px;height:24px;position:absolute;top:8%;right:2%;">{M_SHOWINDEX}</span>' +
	        		'</div>',
	        	'</tpl>',
	            (!Ext.isIE6 ? '<img src="resources/themes/images/homepageicons/{M_ICON}"/>' :
	            '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{M_ICON}\')"></div>'),
	            '</div>',
	            '<span>{FMAINALIAS}</span>',
	        '</div>',
	    '</tpl>'
    ],
    listeners: {
        itemclick: function (sender, record, item, index, e, eOpts) {
            var className = record.data.M_LINK;
            var arr = className.split('.');
            var alias = arr[arr.length - 1];
            var center = Ext.ComponentQuery.query("maincontent_center")[0];

            if (alias == "" || alias == null) {
                Ext.Msg.show({
                    title: '提示',
                    width: 75,
                    msg: '该功能尚未开发！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
            else {
                //
                if (alias == "more") {
                    var window = Ext.create('TCSYS.maincontent.MoreMenu', {
                        title: '功能菜单'
                    });                   
                    window.show();
                    //var homePage = Ext.ComponentQuery.query("homepagedataview")[0];
                    //homePage.getStore().load({ params: { type: result } });

                }
                else {
                    var panelQuery = Ext.ComponentQuery.query("#" + record.data.ID);
                    if (panelQuery.length == 0) {
                        var p = Ext.create("Ext.panel.Panel", {
                            title: record.data.FMAINALIAS,
                            name: record.data.ID,
                            html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + className + '"></iframe>',
                            //autoLoad: {
                            //    url: className,
                            //   // dataType: 'JSONP',
                            //    scripts: true
                            //},
                            closable: true,//标签上出现关闭按钮
                            id: record.data.ID
                            //listeners: {                   // 添加监听器，点击此页面的tab时候要重新加载（刷新功能）  
                            //    activate: function () {
                            //       //this.load(className);
                            //    }
                            //}
                        });
                        center.add(p);
                        center.setActiveTab(p);
                    }
                    else {
                        center.setActiveTab(panelQuery[0]);
                    }
                }
            }
        }
    }
});