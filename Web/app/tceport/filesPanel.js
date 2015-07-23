Ext.define('TCEPORT.filesPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.filesPanel',
    title: '',
    autoScroll: true,
    width: 790,
    height: 100,
    layout: 'fit',
    margin: '0 0 5 65',
    initComponent: function () {
        this.store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            needPage: false,
            url: 'CommonFun/GetFiles?GroupGuid=' + this.GroupGuid,
            fields: ['GUID', 'FILENAME', 'FILEPATH']
        });
        this.columns = {
            defaults: {
                sortable: false,
                menuDisabled: true
            },
            items: [{
                text: '文件名',
                dataIndex: 'FILENAME',
                flex: 0.9
            }, {
                xtype: 'actioncolumn',
                flex: 0.1,
                text: '操作',
                align: 'center',
                items: [{
                    icon: '../../resources/themes/icons/search.png',
                    tooltip: '预览',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var fileName = rec.get('FILENAME');
                        var fileType = fileName.substr(fileName.lastIndexOf('.') + 1);
                        if (fileType == 'doc' || fileType == 'docx' || fileType == 'xls' || fileType == 'xlsx'
                            || fileType == 'ppt' || fileType == 'pptx') {
                            Ext.create('Ext.window.Window', {
                                title: '文件在线预览',
                                height: 600,
                                width: 1000,
                                modal: true,
                                layout: 'fit',
                                html: '<iframe frameborder="0" width="100%" height="100%"  scrolling="no" src="preview_office.aspx?filePath='
                                    + rec.get('FILEPATH') + '&type=' + fileType + '"></iframe>'
                            }).show();
                        }
                        else if (fileType == 'pdf') {
                            Ext.create('Ext.window.Window', {
                                title: '文件在线预览',
                                height: 600,
                                width: 1000,
                                modal: true,
                                layout: 'fit',
                                html: '<iframe frameborder="0" width="100%" height="100%"  scrolling="no" src="preview_pdf.aspx?filePath='
                                    + rec.get('FILEPATH') + '"></iframe>'
                            }).show();
                        }
                        else
                            window.open(rec.get('FILEPATH'));
                    }
                }, {
                    icon: '../../resources/themes/icons/download.jpg',
                    tooltip: '下载',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        //  Window.showModalDialog("../../downLoadFile.aspx?fpath=" + rec.get('FILEPATH'));
                        window.open("../../downLoadFile.aspx?fpath=" + rec.get('FILEPATH'));
                    }
                }]
            }]
        };
        this.callParent(arguments);
    }
});