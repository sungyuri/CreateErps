//密码修改
Ext.define('TCSYS.erp.UserPwdChange', {
    extend: 'Ext.panel.Panel',
    title: '修改密码',
    name: 'UserPwdChange',
    alias: "widget.UserPwdChange",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        var storeUserPWD = Ext.create('TCEPORT.Store', {
            autoLoad: false,
            url: 'UserManage_BLL/Get_UserInfo',
            updateUrl: 'UserManage_BLL/Update_UserPassword',
            fields: [
                'UserCode',
                'UserName',
                //'UserPassword'
            ]
        });

        //form表单加载数据
        storeUserPWD.load({
            callback: function (records, operation, success) {
                var rec = storeUserPWD.getAt(0);
                Ext.getCmp('formUserPWD').loadRecord(rec);
            }
        });

        Ext.apply(Ext.form.VTypes, {
            repetition: function (val, field) {  //返回true，则验证通过，否则验证失败  
                if (field.repetition) {   
                    var cmp = Ext.getCmp(field.repetition.targetCmpId);   //通过targetCmpId的字段查找组件  
                    if (Ext.isEmpty(cmp)) {      
                        Ext.MessageBox.show({
                            title: '错误',
                            msg: '发生异常错误，指定的组件未找到',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }
                    if (val == cmp.getValue()) {    
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            repetitionText: '两次密码不一致'
        })


        this.add({
            xtype: 'form',
            width: 1000,
            store: storeUserPWD,
            id: 'formUserPWD',
            border: false,
            tbar: [
                {
                    xtype: 'button',
                    text: '保存修改',
                    iconCls: 'icon-save',
                    handler: function (sender) {
                        var form = Ext.getCmp('formUserPWD').getForm();
                        if (!form.isValid()) { return; } else {
                            var formValues = form.getValues();//获取form表单上的值,格式{UserCode: "", UserName: "", UserEmail: "", UserPhone: ""}
                            var newPWD=Ext.getCmp('p2').getValue();
                            storeUserPWD['updateData']({ entity: formValues ,newPWD:newPWD}, function (value) {
                                if (value != 'false') {
                                    Ext.shortAlert('操作成功');
                                    storeUserPWD.load({
                                        callback: function (records, operation, success) {
                                            var rec = storeUserPWD.getAt(0);
                                            Ext.getCmp('formUserPWD').loadRecord(rec);
                                        }
                                    });
                                    form.reset();
                                } else { Ext.shortAlert('操作失败'); }
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
                    hidden: true,
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserName',
                    fieldLabel: '用户名称',
                    labelWidth: 100,
                    layout: 'fit',
                    readOnly: true,
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserPassword',
                    fieldLabel: '旧密码',
                    labelWidth: 100,
                    layout: 'fit',
                    inputType:'password',
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserNewPassword',
                    fieldLabel: '新密码',
                    inputType: 'password',
                    labelWidth: 100,
                    layout: 'fit',
                    id:'p1',
                    margin: '10 0 5 0'
                }, {
                    xtype: 'textfield',
                    name: 'UserSurePassword',
                    fieldLabel: '确认新密码',
                    inputType: 'password',
                    labelWidth: 100,
                    layout: 'fit',
                    id: 'p2',
                    vtype: 'repetition',
                    repetition:{targetCmpId:'p1'},
                    margin: '10 0 5 0'
                }
            ]
        });
    }
});