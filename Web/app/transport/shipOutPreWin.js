Ext.define('TCSYS.transport.shipOutPreWin', {
    extend: 'Ext.window.Window',
    requires: [
        'TCSYS.combo.baoGuanZhuanGuanCombo',
        'TCSYS.combo.baoGuanMoShiCombo',
        'TCSYS.combo.naShuiDanWeiCombo',
        'TCSYS.combo.baoGuanDanLeiXingCombo',
        'TCSYS.combo.yunFeiCombo',
        'TCSYS.combo.baoFeiCombo',
        'TCSYS.combo.zaFeiCombo',
        'TCSYS.combo.baoZhuangZhongLeiCombo',
        'TCSYS.combo.jieHuiFangShiCombo',
        'TCSYS.combo.faJianBaoJianLeiXingCombo',
        'TCSYS.combo.declTypeCombo',
        'TCSYS.combo.decModeCombo',
        'TCSYS.combo.operatorCombo'
    ],
    height: 460,//630,
    width: 1070,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    modal: true,
    border: false,
    bodyBorder: false,
    autoScroll: true,

    initComponent: function () {
        var me = this;

        var record = this.currentRecord;

        var currentId = '';

        this.callParent(arguments);
    }
} );