/// <reference path="../../resources/ext-all-debug.js" />
Ext.define("TCSYS.maincontent.MenuWindow", {
    extend: "Ext.panel.Panel",
    alias: "widget.maincontent_MenuWindow",
    collapsible: false,
   // title: '功能菜单',
    name: 'maincontent_MenuWindow',
    split: true,
    width: 300,
    height: 580,
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
    idarr: [],
    usercode:'',
    addid: function (usercd) {
        this.usercode = usercd;
        callapi("SYSTEM_TMODULEQuery/getIdarr", { type: usercd }, function (result) {
            // this.idarr = result;
            if(result!=null)
            {
                if (result != "") {
                    var jarr = result.split(",");
                    this.idarr = jarr;
                }
                else {
                   
                }
            }
        }, this);
    },
    init: function (user) {

        this.usercode = user;
        callapi("SYSTEM_TMODULEQuery/GetWindowMenus", { type: user }, function (result) {
            this.funGroup = result;
            this.setAuth(result);
        }, this);
        //callapi("SYSTEM_TMODULEQuery/getIdarr", { type: this.idarr }, function (result) {
        //    this.idarr = result;
        //}, this);
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
                name: 'menu_treePanelName',
                title: item.FMAINALIAS,
                titleCollapse: true,
                rootVisible: false,
                store: this.buildStore(item.ID, funGroup),
                listeners: {
                    "itemclick": { fn: this.itemClick, scope: this }
                }
            });
            panel.on('checkchange', function (node,checked) {
                //alert(node.data.text + node.data.id);
                //if (checked) {
                //    node.eachChild(function (child) {
                //        chd(child, true);
                //    });
                //} else {
                //    node.eachChild(function (child) {
                //        chd(child, false);
                //    });
                //}
                //parentnode(node);// 进行父级选中操作
                var MenuWindow = Ext.ComponentQuery.query("maincontent_MenuWindow")[0];
                if(checked)
                {
                   // alert(MenuWindow.idarr);
                   // MenuWindow.idarr.push(node.data.id);
                    Ext.Array.include(MenuWindow.idarr, node.data.id);
                   // alert(MenuWindow.idarr);
                }
                else
                {
                    var index = Ext.Array.indexOf(MenuWindow.idarr, node.data.id, 0);
                    if (index > -1) {
                        Ext.Array.remove(MenuWindow.idarr, node.data.id);
                    }
                }
            }, panel);
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
                if (funGroup[i].CHECK == "true")
                {
                    child.checked = true;
                }
                else
                {
                    child.checked = false;
                }
               
                if (funGroup[i].M_ICON == "") {
                    child.icon = "resources/themes/images/treeIcons/varietyformclassify.png";
                }
                else {
                    child.icon = "resources/themes/images/treeIcons/" + funGroup[i].M_ICON;
                }
                //如果是父节点不添加checkbox 
                //for (var j in funGroup) {
                //    if (funGroup[j].FSUPERID == child.id) {
                //        child.leaf = false;
                //        child.checked = false;
                //        this.buildFunGroup(child.id, funGroup, child);
                //        break;
                //    }
                //    else {
                //        child.checked = false;
                //    }
                //}
                data.children.push(child);
            }
        }
    },
    itemClick: function (view, record) {
        if (record.get('leaf') == false) {

        }
        else {
            //var item = null;
            //for (var i in this.funGroup) {
            //    if (this.funGroup[i].ID == record.data.id) {
            //        item = this.funGroup[i];
            //        break;
            //    }
            //}
            //if (item == null) {
            //    return;
            //}
           // var id = record.data.id;
           // alert(record.get('checked'));
           // this.itt.push(id);
        }

    }
});