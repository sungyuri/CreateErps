//个人信息维护
Ext.define('TCSYS.erp.UserOwnInfo', {
    extend: 'Ext.panel.Panel',
    title: '客户资料',
    name: 'UserOwnInfo',
    alias: "widget.UserOwnInfo",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        var storeUserInfo = Ext.create('TCEPORT.Store', {
            autoLoad: false,
            url: 'UserManage_BLL/Get_UserInfo',
            //addUrl: 'UserManage_BLL/Insert',
            updateUrl: 'UserManage_BLL/Update_UserInfo',
            fields: [
                'UserCode',
                'UserName',
                'UserEmail',
                'UserPhone'
            ]
        });
        
        //form表单加载数据
        storeUserInfo.load({
            callback: function (records, operation, success) {
                var rec = storeUserInfo.getAt(0);
                Ext.getCmp('formUserInfo').loadRecord(rec);
            }
        });       

        this.add({
            xtype: 'form',
            width: 1000,
            store:storeUserInfo,
            id:'formUserInfo',
            border: false,
            tbar: [
                {
                    xtype: 'button',
                    text: '保存修改',
                    iconCls: 'icon-save',
                    handler: function (sender) {
                        var form = Ext.getCmp('formUserInfo').getForm();
                        if (!form.isValid()) { return; } else {
                            var formValues = form.getValues();//获取form表单上的值,格式{UserCode: "", UserName: "", UserEmail: "", UserPhone: ""}
                            storeUserInfo['updateData']({ entity: formValues }, function (value) {
                                if (value != 'false') {
                                    Ext.shortAlert('操作成功');
                                    storeUserInfo.load({
                                        callback: function (records, operation, success) {
                                            var rec = storeUserInfo.getAt(0);
                                            Ext.getCmp('formUserInfo').loadRecord(rec);
                                        }
                                    });
                                } else { Ext.shortAlert('原密码错误，操作失败'); }
                            });
                        }
                    }
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    name: 'UserCode',
                    fieldLabel: '主键',
                    hidden:true,
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserName',
                    fieldLabel: '用户名称',
                    labelWidth:100,
                    layout: 'fit',
                    readOnly:true,
                    margin:'10 0 5 0'
                },{
                    xtype: 'textfield',
                    name: 'UserEmail',
                    fieldLabel: '邮箱',
                    labelWidth: 100,
                    layout: 'fit',
                    vtype:'email',
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserPhone',
                    fieldLabel: '电话',
                    labelWidth: 100,
                    layout: 'fit',
                    regex: /^\d+$/,
                    regexText: '请输入有效字符',
                    maxLength:11,
                    margin: '10 0 5 0'
                }
            ]
        });
    }
});