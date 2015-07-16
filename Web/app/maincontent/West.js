/// <reference path="../../resources/ext-all-debug.js" />
Ext.define("TCSYS.maincontent.West", {
    extend: "Ext.panel.Panel",
    alias: "widget.maincontent_west",
    region: 'west',
    collapsible: true,
    collapseFirst:true,
    title: '功能菜单',
    name:'maincontent_west',
    split: true,
    width: 200,
    // cls: 'my-accordion',
    defaults: {
        bodyStyle: 'padding:5px 0px 10px 0px'
    },
    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: false
        //activeOnTop: true
    },
    animate: false, //开启动画
    init: function (user) {
       this.removeAll();
       var temp = 'first';
        if (user == undefined || user == null || user == '') {
            user = temp;
        }
        callapi("SYSTEM_TMODULEQuery/GetAllMenus", { type: user }, function (result) {
            this.funGroup = result;
            if (result == null || result == "") {
                Ext.Msg.show({
                    title: "提示",
                    msg: "您未获得授权,请与管理员联系",
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
            else
            {
                this.setAuth(result);
            }
           // document.getElementById('defaultLoading').style.display = 'none';
        }, this);
    },
    setAuth: function (funGroup) {

        var rootName = null;
        var topFunGroup = new Array();
        var functionGroupWithoutRoot = new Array();
        for (var i in funGroup) {
            if (funGroup[i].FSUPERID == "0") {
                topFunGroup.push(funGroup[i]);
         
            }
        }

        for (var i in funGroup) {
            if (funGroup[i].FSUPERID == topFunGroup[0].ID) {
                functionGroupWithoutRoot.push(funGroup[i]);
             
            }
        }

        for (var i in functionGroupWithoutRoot) {
            var item = functionGroupWithoutRoot[i];
            var panel = Ext.create("Ext.tree.Panel", {
                name: 'treePanelName',
                title: item.FMAINALIAS,
                titleCollapse: true,
                rootVisible: false,
                store: this.buildStore(item.ID, funGroup),
                listeners: {
                    "itemclick": { fn: this.itemClick, scope: this }                
                    }
            });
            this.add(panel);
        }
    },

    buildStore: function (id, funGroup) {
        var data = new Object();
        data.expanded = true;
        data.children = new Array;
        this.buildFunGroup(id, funGroup, data);
        return Ext.create('Ext.data.TreeStore', {
            root: data
        });
    },

    buildFunGroup: function (id, funGroup, data) {
        for (var i in funGroup) {
            if (funGroup[i].FSUPERID == id) {
                var child = new Object();
                child.children = new Array();
                child.expanded = false;
                child.text = funGroup[i].FMAINALIAS;
                child.id = funGroup[i].ID;
                child.Name = funGroup[i].ID;
                child.leaf = true;
               // child.checked = false;
                if (funGroup[i].M_ICON == "") {
                    child.icon = "resources/themes/images/treeIcons/varietyformclassify.png";
                }
                else {
                    child.icon = "resources/themes/images/treeIcons/" + funGroup[i].M_ICON;
                }
                for (var j in funGroup) {
                    if (funGroup[j].FSUPERID == child.id) {
                        child.leaf = false;
                        this.buildFunGroup(child.id, funGroup, child);
                        break;
                    }
                }
                data.children.push(child);
            }
        }
    },
    openPen: function (item,op)
    {
        
        var center = Ext.ComponentQuery.query("maincontent_center")[0];
        center.setActiveTab(op);
        //var p = Ext.create("Ext.panel.Panel", {
        //    title: item.FMAINALIAS,
        //    name: item.ID,
        //    autoScroll: true,
        //    layout: {
        //        type: 'fit',
        //        align: 'stretch'
        //    },
        //    items: [{
        //        html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + item.M_LINK + '"></iframe>'
        //    }],
        //    closable: true,//标签上出现关闭按钮
        //    id: item.ID,
        //    listeners: {                   // 添加监听器，点击此页面的tab时候要重新加载（刷新功能）  
        //        activate: function () {
        //           // center.remove(p);
        //          //  center.setActiveTab(0);
        //        }
        //    }
        //});
        //center.add(p);
        //center.setActiveTab(p);

    },
    itemClick: function (view, record) {
        if (record.get('leaf') == false)
        {

        }
        else
        {
            var item = null;
            for (var i in this.funGroup) {
                if (this.funGroup[i].ID == record.data.id) {
                    item = this.funGroup[i];
                    break;
                }
            }
            if (item == null) {
                return;
            }
            var className = item.M_LINK;
            //alert(className);
            var alias = '';
            if (className && className.indexOf('.') > -1) {
                var arr = className.split('.');
                alias = arr[arr.length - 1];
            }                
          
            if (alias == "" || alias == null) {
                Ext.Msg.show({
                    title: '提示',
                    width: 75,
                    msg: '该功能尚未开发！',
                    width: 150,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
            else {
     
                var center = Ext.ComponentQuery.query("maincontent_center")[0];
                var panelQuery = Ext.ComponentQuery.query(alias);
                if (panelQuery.length == 0) {
                    //   var panel = Ext.create(className);
                    var panel = Ext.create(className);
                    center.add(panel);
                    center.setActiveTab(panel);
                }
                else {
                    center.setActiveTab(panelQuery[0]);
                }
            }
        }
        
    }
});