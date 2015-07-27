//用户管理
var dateNow = new Date();//新增用户创建时间字段取当前时间
Ext.define('TCSYS.erp.UserManage', {
    extend: 'Ext.panel.Panel',
    title: '用户资料管理',
    name: 'UserManage',
    alias: "widget.UserManage",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        var rec = null;

        var storeUserManage = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'UserManage_BLL/Get_AllUserInfo',
            addUrl: 'UserManage_BLL/Insert',
            updateUrl: 'UserManage_BLL/Update',
            fields: [
                'UserCode',
                'UserName',
                'UserPassword',
                'DepartCode', 
                'DepartName',
                'PositionCode',
                'PositionName',
                'PositionDesc',
                'Uipaddress',
                'Rolelist',
                'CreateTime',
                'CreateUserNo',
                'LastUpdateTime',
                'UpdateUserNo',
                'UserEmail',
                'UserPhone',
                'IsUse',
                'TentNo'
            ]
        });


        //var authorityWindow = Ext.create('TCSYS.maincontent.MoreMenu', {
        //    title: '功能菜单',
        //    usercode: null
        //});
        
        var storeIsOrNotUse = new Ext.data.ArrayStore({
            fields: ['key', 'value'],
            data: [['是', '1'], ['否', '0']]
        });


        var modifyWindow = {
            xtype: 'datawindow',
            title: '修改人员信息',
            store: storeUserManage,
            wrecord:null,
            resizeable: false,
            id:'mW',
            items: [{
                xtype: 'toolbar',
                border: false,
                items: [{
                    text: '保存',
                    name: 'btnSave',
                    id: 'btnSave',
                    iconCls: 'icon-Save',
                    xtype: 'button',
                    handler: function () {
                        var currentWindow = this.up('window');
                        var userInfoWindow = Ext.getCmp('formId').getForm();
                        if (!userInfoWindow.isValid) { return; } else {
                            var formValues = userInfoWindow.getValues();
                            if (currentWindow.operationType == 'add') {
                                storeUserManage[currentWindow.operationType + 'Data']({ entity: formValues }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        storeUserManage.load();
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            } else {
                                storeUserManage['updateData']({ entity: formValues, type: null }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('操作成功！');
                                        storeUserManage.load();
                                        Ext.getCmp('mW').close();
                                    } else {
                                        Ext.shortAlert('操作失败！');
                                    }
                                });
                            }
                        }
                    }
                }]
            }, {
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 600,
                height:160,
                autoScroll: true,
                id: 'formId',
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '用户信息',
                    items: [{
                        columnWidth: 1,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'UserCode',
                            margin: '5 0 5 0',
                            fieldLabel: 'UserCode',
                            id: 'userC',
                            hidden: true
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'UserName',
                            itemId: 'ship_no_textfield',
                            margin: '5 0 5 0',
                            fieldLabel: '用户名称',
                            readOnly: true,
                            id:'userN'
                            //labelWidth: 80
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'SysDepartStore',
                            displayField: 'DepartName',
                            valueField: 'DepartCode',
                            //xtype: 'textfield',
                            name: 'DepartCode',
                            margin: '5 0 5 0',
                            fieldLabel: '部门',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            editable: false,
                            //labelWidth: 85,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record = this.up('window').wrecord;
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get('DepartCode'));
                                            tigger.setValue(rec.get('DepartName'));
                                        }
                                    }
                            }
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'SysPositionStore',
                            displayField: 'PositionName',
                            valueField: 'PositionCode',
                            name: 'PositionCode',
                            margin: '5 0 5 0',
                            fieldLabel: '岗位代码',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            editable: false,
                            labelWidth: 80,
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        //var record=this.up('window').wrecord
                                        if (rec) {
                                            tigger.setHiddenValue(rec.get('PositionCode'));
                                            tigger.setValue(rec.get('PositionName'));
                                        }
                                    }
                            }
                        }]
                    },  {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'PositionDesc',
                            margin: '5 0 5 0',
                            fieldLabel: '岗位描述'
                        }]
                    },
                    {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'datefield',
                            name: 'CreateTime',
                            margin: '5 0 5 0',
                            fieldLabel: '注册时间',
                            readOnly: true,
                            submitValue:false,//不提交,就看看
                            format: 'Y-m-d H:i'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'datefield',
                            name: 'LastUpdateTime',
                            margin: '5 0 5 0',
                            fieldLabel: '最后更新时间',
                            readOnly: true,
                            submitValue: false,
                            labelWidth: 80,
                            format: 'Y-m-d H:i'
                        }]
                    }, {
                        columnWidth: .3,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'UserEmail',
                            margin: '5 0 5 0',
                            fieldLabel: '邮箱',
                            vtype:'email'
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'UserPhone',
                            margin: '5 0 5 0',
                            fieldLabel: '电话',
                            maxLength:11
                        }]
                    }, {
                        columnWidth: .35,
                        layout: 'form',
                        baseCls: 'x-plain',
                        border: false,
                        items: [{
                            xtype: 'combobox',
                            name: 'IsUse',
                            store: storeIsOrNotUse,
                            displayField: 'key',
                            valueField: 'value',
                            editable:false,
                            margin: '5 0 5 0',
                            labelWidth: 80,
                            fieldLabel: '是否启用'
                        }]
                    }]
                }]}]
            
        };


        this.add({
            border: false,
            store: storeUserManage,
            xtype: 'form',
            itemId: 'searchPerson',
            //title: '查询条件',
            //collapsible: true,
            layout: {
                type: 'vbox'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'panel',
                border: false,
                margin: "5 0 5 0",
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    width: '20%'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'UserCode',
                    fieldLabel: '人员代码'
                }]
            }]
        });

        this.add({
            xtype: 'datagrid',
            store:storeUserManage,
            forceFit: false,
            tbar: [{
                text: '查询',
                xtype: 'button',
                iconCls: 'icon-Search',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="searchPerson"]')[0];
                    var form = object.getForm();
                    var obj = form.getValues();
                    storeUserManage.load({ params: obj });
                }
            }, {
                text: '新增',
                xtype: 'button',
                iconCls: 'icon-Add',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(modifyWindow);
                    addWindow.setOperationType('add');
                    Ext.getCmp('userC').hidden = false;
                    Ext.getCmp('userN').readOnly = false;
                    addWindow.show(this);
                    storeUserManage.load();
                }
            }],
            columns: [{
                xtype: 'linkColumn',
                text: '操作',
                width: 120,
                items: [{
                    linkText: '权限',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        var UC = grid.getStore().getAt(rowIndex);
                        var AWindow = Ext.ComponentMgr.create(Ext.create('TCSYS.maincontent.MoreMenu', {
                            title: '功能菜单',
                            usercode: UC.get('UserCode')
                        }));
                        //AWindow.usercode = UC.get('UserCode');
                        AWindow.show(this);
                    }
                }, {
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        rec = grid.getStore().getAt(rowIndex);
                        var MWindow = Ext.ComponentMgr.create(modifyWindow);
                        //modifyWindow.wrecord = null;
                        modifyWindow.wrecord = rec;
                        MWindow.setOperationType('update');
                        MWindow.down('form').loadRecord(rec);
                        MWindow.show(this);
                    }
                }, {
                    linkText: '重置',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        Ext.Msg.confirm('提示', '确认重置密码吗?', function (check) {
                            if (check == "yes") {
                                var rowUserInfo = grid.getStore().getAt(rowIndex);
                                var uc = rowUserInfo.get('UserCode');
                                var arr = eval("({UserCode:'" + uc + "'})");
                                storeUserManage['updateData']({ entity: arr, type: 1 }, function (value) {
                                    if (value == 'true') {
                                        Ext.shortAlert('重置成功');
                                        storeUserManage.load();
                                    } else { Ext.shortAlert('重置失败'); }
                                });
                            }
                        });
                    }
                }]
            }, {
                dataIndex: 'UserCode',
                text: 'UserCode',
                hidden:true
            }, {
                dataIndex: 'UserName',
                text: '姓名',
                align: 'center'
            }, {
                dataIndex: 'PositionDesc',
                text: '职位描述',
                align: 'center'
            }, {
                dataIndex: 'CreateTime',
                text: '创建时间',
                align: 'center',
                width:150,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            }, {
                dataIndex: 'LastUpdateTime',
                text: '最后更新时间',
                align: 'center',
                width: 150,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            }, {
                dataIndex: 'UserEmail',
                text: '邮箱',
                align: 'center'
            }, {
                dataIndex: 'UserPhone',
                text: '电话',
                align: 'center'
            }, {
                dataIndex: 'IsUse',
                text: '是否启用',
                align:'center',
                renderer: function (value) {
                    if (value == 0) {
                        return '<span style="color:red">已停用</span>';
                    } else if (value == 1) {
                        return '<span style="color:green">启用中</span>';
                    } else {
                        return value;
                    }
                }
            }]
        });
    }
});