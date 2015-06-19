//主程序入口点
Ext.onReady(function () {
    Ext.application({
        name: 'TCSYS',
        requires: ["TCSYS.Main"],
        appFolder: 'app',
        launch: function () {
            window.applicationName = 'TCSYS';
            Ext.create("TCSYS.Main");
        }
    });
});
