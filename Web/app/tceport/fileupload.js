Ext.define('TCEPORT.fileupload', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.uploadpanel',
    title: '',
    autoScroll: true,
    width: 790,
    height: 145,
    layout: 'fit',
    margin: '0 0 5 65',
    initComponent: function () {
        var me = this;
        this.store = Ext.create('TCEPORT.Store', {
            needPage: false,
            autoLoad: true,
            url: 'CommonFun/GetFiles?GroupGuid=' + this.GroupGuid,
            deleteUrl: 'CommonFun/DeleteFile',
            fields: ['GUID', 'FILENAME', 'FILEPATH']
        });
        this.tbar = [{
            text: '上传附件',
            xtype: 'button',
            name: 'upButton',
            iconCls: 'icon-upload',
            handler: function () {
                var grid = this.up('grid');
                Ext.create('Ext.window.Window', {
                    width: 500,
                    modal: true,
                    title: '文件上传',
                    layout: 'fit',
                    border: false,
                    items: [{
                        xtype: 'form',
                        items: [{
                            xtype: 'filefield',
                            margin: '5 0 5 0',
                            fieldLabel: '文件',
                            allowBlank: false,
                            anchor: '98%',
                            regex: /(doc)|(docx)|(xlsx)|(xls)|(ppt)|(pptx)|(pdf)|(jpg)|(gif)|(rar)|(zip)|(ceb)$/i,
                            regexText: '文件类型不合法',
                            buttonText: '选择'
                        }],
                        buttons: [{
                            text: '上传',
                            handler: function () {
                                var form = this.up('form').getForm();
                                var wnd = this.up('form').up('window');
                                if (form.isValid()) {
                                    form.submit({
                                        url: 'uploadfile.ashx',
                                        params: {
                                            GroupGuid: me.GroupGuid
                                        },
                                        waitMsg: '文件上传中...',
                                        success: function (form, action) {
                                            me.store.reload();
                                            wnd.close();
                                        },
                                        failure: function (form, action) {
                                            Ext.Msg.show({
                                                title: '提示',
                                                msg: '文件大小不能为0或超过20M',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.WARNING
                                            });
                                        }
                                    });
                                }
                            }
                        }]
                    }]
                }).show();
            }
        }];
        this.columns = {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [{
                text: '文件名',
                dataIndex: 'FILENAME',
                flex: 1
            }, {
                xtype: 'actioncolumn',
                flex: 0.1,
                text: '操作',
                align: 'center',
                items: [{
                    icon: '../../resources/themes/icons/download.jpg',
                    tooltip: '下载',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        window.open(rec.get('FILEPATH'));
                    }
                }, {
                    icon: '../../resources/themes/icons/edit_remove.png',
                    tooltip: '删除',
                    handler: function (grid, rowInex, colIndex) {
                        var record = grid.getStore().getAt(rowInex);
                        me.store.deleteData(record.get("GUID"), function (result) {
                            if (result == "1") {
                                me.store.reload();
                            }
                            else
                                Ext.shortAlert("操作失败");
                        });
                    }
                }]
            }]
        };
        this.callParent(arguments);
    }
});