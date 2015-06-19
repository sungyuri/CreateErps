Ext.define('TCSYS.transport.docDeclaration', {
    extend: 'Ext.panel.Panel',
    title: '单证申报',
    name: 'docDeclaration',
    alias: "widget.docDeclaration",
    closable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        var store = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'DocDeclaration_BLL/Get',
            addUrl: 'DocDeclaration_BLL/Insert',
            updateUrl: 'DocDeclaration_BLL/Update',
            deleteUrl: 'DocDeclaration_BLL/Delete',
            fields: [
                'SCHEDULE_ID',
                'SHIP_NO',
                'IMO',
                'IN_OUT_STATUE',//抵港/离港状态
                'IN_OUT_VOYAGE',//抵港/离港航次
                'DECLARATION_PLACE_CODE',
                'CREW_NUMBER',
                'PASSENGERS_NUMBER',
                'GOVENMENT_PROC_CODE',//海关业务类型
                'CALL_PURPOSE',
                'OPERATOR_CODE',//船舶经营人
                'OPERATOR_TYPE',//船舶经营人性质
                'AGENT_CODE',
                'CONTEXT_NAME',
                'DECLARATION_DATE',
                'FREE_TEXT',
                'ROUTE',
                'IN_OUT_DATE',//抵/离日期及时间
                'AGENT_ADDRESS',
                'CARGO_DRAFT',//载货吃水
                'DECLARATION_PLACE_CODE_TEXT',
                'GOVENMENT_PROC_CODE_TEXT',
                'CALL_PURPOSE_TEXT',
                'OPERATOR_TYPE_TEXT',
                'ROUTE_TEXT'
            ]
        });

        var storeShip = Ext.create('TCEPORT.Store', {
            autoLoad: true,
            url: 'DocDeclaration_BLL/GetDocShip',
            updateUrl: 'DocDeclaration_BLL/Update',
            fields: [
                'SHIP_NO',
                'IMO',
                'SHIP_NAME',
                'ENTER_NUMBER',
                'ABROAD_NUMBER',
                'ARRIVAL_DATE',
                'BERTH_NOW_CODE',
                'DEPARTURE_PORT_CODE',
                'ARRIVAL_PORT_CODE',
                'AGENT_CODE',
                'CONTEXT_NAME',
                'DECLARATION_DATE',
                'FREE_TEXT'
            ]
        });

        var storeHWSB = Ext.create('TCSYS.store.docGoodsReportStore');
        var storeCYWP = Ext.create('TCSYS.store.docMarineStore');
        var storeHCZY = Ext.create('TCSYS.store.docVoyageStore');
        var storeCYuanMD = Ext.create('TCSYS.store.docBtmListStore');
        var storeCYuanWP = Ext.create('TCSYS.store.docBtmStoreListStore');
        var storeYHKX = Ext.create('TCSYS.store.docEmptyBoxStore');
        var storeZGHW = Ext.create('TCSYS.store.docEntryGoodsStore');
        var storeNMJZXHW = Ext.create('TCSYS.store.docEquipmentStore');
        var storeWXHWSB = Ext.create('TCSYS.store.docDangerStore');

        var flag = '';
        var record = null;

        var shipWindow = {
            xtype: 'datawindow',
            store: storeShip,
            title: '选择船舶',
            id: 'shipWindow',
            resizable: false,
            border: false,
            modal: true,
            bodyBorder: false,
            height: 400,
            width: 800,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                border: false,
                xtype: 'form',
                itemId: 'shipSelectNew',  //新增窗口选择船舶
                //title: '查询条件',
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
                        width: '15%'
                    },
                    tbar: [{
                        xtype: 'textfield',
                        name: 'SHIP_NAME',
                        fieldLabel: '英文船名'
                    }, {
                        xtype: 'textfield',
                        name: 'IMO',
                        fieldLabel: 'IMO号'
                    }, {
                        text: '查询',
                        xtype: 'button',
                        handler: function (sender) {
                            var object = Ext.ComponentQuery.query('[itemId="shipSelectNew"]')[0];
                            var form = object.getForm();
                            var obj = form.getValues();
                            storeShip.load({
                                params: obj
                            });
                        }
                    }]
                }]

            }, {
                xtype: 'datagrid',
                store: storeShip,
                itemId: 'shipInfo_win',
                forceFit: false,
                //multiSelect: true,
                columns: [{
                    xtype: 'linkColumn',//这里就是放置按钮的地方
                    text: '操作',
                    items: [{
                        tooltip: '单证申报',
                        linkText: '单证申报',
                        handler: function (grid, rowIndex, sender) {
                            record = grid.store.getAt(rowIndex);
                            var updateWindow = Ext.ComponentMgr.create(docDecWindow);
                            updateWindow.setOperationType('add');
                            updateWindow.callerComp = sender;
                            updateWindow.down('form').loadRecord(record);
                            storeHWSB.removeAll();
                            storeCYWP.removeAll();
                            storeHCZY.removeAll();
                            storeCYuanMD.removeAll();
                            storeCYuanWP.removeAll();
                            storeYHKX.removeAll();
                            storeZGHW.removeAll();
                            storeNMJZXHW.removeAll();
                            storeWXHWSB.removeAll();
                            updateWindow.show(this);
                        }
                    }]
                }, {
                    text: '船舶编号',
                    dataIndex: 'SHIP_NO'
                }, {
                    dataIndex: 'IMO',
                    text: 'IMO号'
                }, {
                    dataIndex: 'SHIP_NAME',
                    text: '英文船名'
                }, {
                    dataIndex: 'ENTER_NUMBER',
                    text: '进港航次'
                }, {
                    dataIndex: 'ABROAD_NUMBER',
                    text: '离港航次'
                }]
                //'SHIP_NO',
                //'IMO',
                //'SHIP_NAME',
                //'ENTER_NUMBER',
                //'ABROAD_NUMBER',
                //'ARRIVAL_DATE',
                //'BERTH_NOW_CODE',
                //'DEPARTURE_PORT_CODE',
                //'ARRIVAL_PORT_CODE',
                //'AGENT_CODE',
                //'CONTEXT_NAME',
                //'DECLARATION_DATE',
                //'FREE_TEXT'
            }]
        };


        var docDecWindow = {
            xtype: 'datawindow',
            title: '',
            store: store,
            resizable: false,
            items: [{
                xtype: 'panel',
                border: false,
                items: [{
                    xtype: 'toolbar',
                    border: false,
                    items: [{
                        text: '保存',
                        name: 'btnSave',
                        iconCls: "icon-save",
                        xtype: 'button',
                        handler: function () {
                            
                            //参数：货物申报
                            var huowushenbao = Ext.ComponentQuery.query('grid[itemId="huowushenbao"]')[0].getStore();
                            var huowushenbaoArr = [];
                            for (var i = 0; i < huowushenbao.getCount() ; i++) {
                                var recordHWSB = huowushenbao.getAt(i);
                                //alert(recordHWSB.get('EQUIPMENT_SIZE_TYPE'));
                                //return;
                                huowushenbaoArr[i] = {
                                    LOADING_PLACE_CODE: recordHWSB.get('LOADING_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordHWSB.get('DISCHARGE_PLACE_CODE'),
                                    SHIP_MARK: recordHWSB.get('SHIP_MARK'),
                                    GOODS_TYPE: recordHWSB.get('GOODS_TYPE'),
                                    EQUIPMENT_SIZE_TYPE: recordHWSB.get('EQUIPMENT_SIZE_TYPE'),
                                    EQUIPMENT_LOADED_STATUS: recordHWSB.get('EQUIPMENT_LOADED_STATUS'),
                                    PACKAGE_TYPE: recordHWSB.get('PACKAGE_TYPE'),
                                    GOODS_TOTAL_NUMBER: recordHWSB.get('GOODS_TOTAL_NUMBER'),
                                    CARGO_DISCRIPTION: recordHWSB.get('CARGO_DISCRIPTION'),
                                    GROSS_WEIGHT: recordHWSB.get('GROSS_WEIGHT'),
                                    QUENTITY_UNIT: recordHWSB.get('QUENTITY_UNIT'),
                                    FREE_TEXT: recordHWSB.get('FREE_TEXT')
                                };
                            }

                            //参数：船用物品
                            var chuanyongwupin = Ext.ComponentQuery.query('grid[itemId="chuanyongwupin"]')[0].getStore();
                            var chuanyongwupinArr = [];
                            for (var i = 0; i < chuanyongwupin.getCount() ; i++) {
                                var recordCYWP = chuanyongwupin.getAt(i);
                                chuanyongwupinArr[i] = {
                                    STORE_TYPE: recordCYWP.get('STORE_TYPE'),
                                    STORE_NAME: recordCYWP.get('STORE_NAME'),
                                    STORE_QUENTITY: recordCYWP.get('STORE_QUENTITY'),
                                    QUENTITY_UNIT: recordCYWP.get('QUENTITY_UNIT'),
                                    STOWAGE_PLACE: recordCYWP.get('STOWAGE_PLACE'),
                                    FREE_TEXT: recordCYWP.get('FREE_TEXT')
                                };
                            }

                            //参数：航次摘要
                            var hangcizhaiyao = Ext.ComponentQuery.query('grid[itemId="hangcizhaiyao"]')[0].getStore();
                            var hangcizhaiyaoArr = [];
                            for (var i = 0; i < hangcizhaiyao.getCount() ; i++) {
                                var recordHCZY = hangcizhaiyao.getAt(i);
                                //var hczy = recordHCZY.get('DEPARTURE_DATE');
                                //alert(hczy);
                                //return;
                                hangcizhaiyaoArr[i] = {
                                    ITINERARY_CODE: recordHCZY.get('ITINERARY_CODE'),
                                    ARRIVAL_DATE: dateFormatOwn(recordHCZY.get('ARRIVAL_DATE'), 'YmdHiO'),
                                    DEPARTURE_DATE: dateFormatOwn(recordHCZY.get('DEPARTURE_DATE'), 'YmdHiO'),
                                    FREE_TEXT: recordHCZY.get('FREE_TEXT')
                                };
                            }

                            //参数：船员名单
                            var chuanyuanmingdan = Ext.ComponentQuery.query('grid[itemId="chuanyuanmingdan"]')[0].getStore();
                            var chuanyuanmingdanArr = [];
                            for (var i = 0; i < chuanyuanmingdan.getCount() ; i++) {
                                var recordCYMD = chuanyuanmingdan.getAt(i);
                                chuanyuanmingdanArr[i] = {
                                    PERESON_NAME: recordCYMD.get('PERESON_NAME'),
                                    GENDER: recordCYMD.get('GENDER'),
                                    NATIONALITY: recordCYMD.get('NATIONALITY'),
                                    RANK: recordCYMD.get('RANK'),
                                    BIRTHDAY: dateFormatOwn(recordCYMD.get('BIRTHDAY'),'Ymd'),
                                    BIRTHPLACE: recordCYMD.get('BIRTHPLACE'),
                                    ADDITIONAL_TYPE: recordCYMD.get('ADDITIONAL_TYPE'),
                                    ADDITIONAL_NUMBER: recordCYMD.get('ADDITIONAL_NUMBER'),
                                    FREE_TEXT: recordCYMD.get('FREE_TEXT')
                                }
                            }

                            //参数:船员物品
                            var chuanyuanwupin = Ext.ComponentQuery.query('grid[itemId="chuanyuanwupin"]')[0].getStore();
                            var chuanyuanwupinArr = [];
                            for (var i = 0; i < chuanyuanwupin.getCount() ; i++) {
                                var recordCYuanWP = chuanyuanwupin.getAt(i);
                                chuanyuanwupinArr[i] = {
                                    ADDITIONAL_TYPE: recordCYuanWP.get('ADDITIONAL_TYPE'),
                                    ADDITIONAL_NUMBER: recordCYuanWP.get('ADDITIONAL_NUMBER'),
                                    STORE_TYPE: recordCYuanWP.get('STORE_TYPE'),
                                    STORE_NAME: recordCYuanWP.get('STORE_NAME'),
                                    STORE_QUENTITY: recordCYuanWP.get('STORE_QUENTITY'),
                                    QUENTITY_UNIT: recordCYuanWP.get('QUENTITY_UNIT'),
                                    FREE_TEXT: recordCYuanWP.get('FREE_TEXT')
                                }
                            }

                            //参数：沿海空箱
                            var yanhaikongxiang = Ext.ComponentQuery.query('grid[itemId="yanhaikongxiang"]')[0].getStore();
                            var yanhaikongxiangArr = [];
                            for (var i = 0; i < yanhaikongxiang.getCount() ; i++) {
                                var recordYHKX = yanhaikongxiang.getAt(i);
                                yanhaikongxiangArr[i] = {
                                    CROSS_BORDER_SHIP: recordYHKX.get('CROSS_BORDER_SHIP'),
                                    CROSS_BORDER_VOYAGE: recordYHKX.get('CROSS_BORDER_VOYAGE'),
                                    CROSS_BORDER_DATE: dateFormatOwn(recordYHKX.get('CROSS_BORDER_DATE'),'YmdHiO'),
                                    EQUIPMENT_NUMBER: recordYHKX.get('EQUIPMENT_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordYHKX.get('EQUIPMENT_SIZE_TYPE'),
                                    LOAD_PLACE_CODE: recordYHKX.get('LOAD_PLACE_CODE'),
                                    DISCHARG_PLACE_CODE: recordYHKX.get('DISCHARG_PLACE_CODE'),
                                    FREE_TEXT: recordYHKX.get('FREE_TEXT')
                                }
                            }

                            //参数：转关货物
                            var zhuanguanhuowu = Ext.ComponentQuery.query('grid[itemId="zhuanguanhuowu"]')[0].getStore();
                            var zhuanguanhuowuArr = [];
                            for (var i = 0; i < zhuanguanhuowu.getCount() ; i++) {
                                var recordZGHW = zhuanguanhuowu.getAt(i);
                                zhuanguanhuowuArr[i] = {
                                    TRAN_DOC_NUMBER: recordZGHW.get('TRAN_DOC_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordZGHW.get('EQUIPMENT_SIZE_TYPE'),
                                    CONTAINER_NUMBER: recordZGHW.get('CONTAINER_NUMBER'),
                                    LOAD_PLACE_CODE: recordZGHW.get('LOAD_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordZGHW.get('DISCHARGE_PLACE_CODE'),
                                    FREE_TEXT: recordZGHW.get('FREE_TEXT')
                                }
                            }

                            //参数：内贸集装箱货物
                            var neimaojizhuangxianghuowu = Ext.ComponentQuery.query('grid[itemId="neimaojizhuangxianghuowu"]')[0].getStore();
                            var neimaojizhuangxianghuowuArr = [];
                            for (var i = 0; i < neimaojizhuangxianghuowu.getCount() ; i++) {
                                var recordNMJZXHW = neimaojizhuangxianghuowu.getAt(i);
                                neimaojizhuangxianghuowuArr[i] = {
                                    EQUIPMENT_NUMBER: recordNMJZXHW.get('EQUIPMENT_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordNMJZXHW.get('EQUIPMENT_SIZE_TYPE'),
                                    CONTAINER_NUMBER: recordNMJZXHW.get('CONTAINER_NUMBER'),
                                    SEAL_NUMBER: recordNMJZXHW.get('SEAL_NUMBER'),
                                    CARGO_DESCRIPTION: recordNMJZXHW.get('CARGO_DESCRIPTION'),
                                    GORSS_WEIGHT: recordNMJZXHW.get('GORSS_WEIGHT'),
                                    CONSIGNEE_NAME: recordNMJZXHW.get('CONSIGNEE_NAME'),
                                    CONSIGNOR_NAME: recordNMJZXHW.get('CONSIGNOR_NAME'),
                                    LOAD_PLACE_CODE: recordNMJZXHW.get('LOAD_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordNMJZXHW.get('DISCHARGE_PLACE_CODE'),
                                    FREE_TEXT: recordNMJZXHW.get('FREE_TEXT'),
                                    TRAN_DOC_NUMBER: recordNMJZXHW.get('TRAN_DOC_NUMBER')
                                }
                            }

                            //参数：危险货物申报
                            var weiyanhuowushenbao = Ext.ComponentQuery.query('grid[itemId="weiyanhuowushenbao"]')[0].getStore();
                            var weiyanhuowushenbaoArr = [];
                            for (var i = 0; i < weiyanhuowushenbao.getCount() ; i++) {
                                var recordWXHWSB = weiyanhuowushenbao.getAt(i);
                                weiyanhuowushenbaoArr[i] = {
                                    TRAN_DOC_NUMBER: recordWXHWSB.get('TRAN_DOC_NUMBER'),
                                    MCV_NUMBER: recordWXHWSB.get('MCV_NUMBER'),
                                    PACKAGE_KIND_NUMBER: recordWXHWSB.get('PACKAGE_KIND_NUMBER'),
                                    PROPER_SHIP_NAME: recordWXHWSB.get('PROPER_SHIP_NAME'),
                                    DCLASS: recordWXHWSB.get('DCLASS'),
                                    UN_NUMBER: recordWXHWSB.get('UN_NUMBER'),
                                    PACK_GROUP: recordWXHWSB.get('PACK_GROUP'),
                                    SUBSIDIARY_RISK: recordWXHWSB.get('SUBSIDIARY_RISK'),
                                    FLASH_POINT: recordWXHWSB.get('FLASH_POINT'),
                                    MARINE_POLLUTANT: recordWXHWSB.get('MARINE_POLLUTANT'),
                                    GORSS_NET_WEIGHT: recordWXHWSB.get('GORSS_NET_WEIGHT'),
                                    EMS: recordWXHWSB.get('EMS'),
                                    STOWAGE_POSITION: recordWXHWSB.get('STOWAGE_POSITION'),
                                    FREE_TEXT: recordWXHWSB.get('FREE_TEXT')
                                }
                            }

                            //获取总申报form表单值
                            var currentWindow = this.up('window');
                            var form = currentWindow.down('form').getForm();
                            if (!form.isValid()) {
                                return;
                            }
                            else {
                                var formValues = form.getValues();
                                //formValues.SHIP_NO = me.BasicInfoPK;
                                if (this.up('window').operationType == "add") {
                                    if (me.BasicInfoPK == null) {
                                        store[currentWindow.operationType + "Data"]({
                                            entity: formValues, type: 0,
                                            btmList: chuanyuanmingdanArr,
                                            btmStoreList: chuanyuanwupinArr, danger: weiyanhuowushenbaoArr, emptyBox: yanhaikongxiangArr, entryGoods: zhuanguanhuowuArr, equipmentStore: neimaojizhuangxianghuowuArr, goodsReport: huowushenbaoArr, marineStore: chuanyongwupinArr, voyage: hangcizhaiyaoArr
                                        }, function (value) {
                                            if (value == 'true') {
                                                me.BasicInfoPK = value;
                                                Ext.shortAlert('操作成功');
                                                store.load();
                                                currentWindow.close();
                                                Ext.getCmp('shipWindow').close();
                                            } else {
                                                Ext.shortAlert('操作失败');
                                            }
                                        });
                                    }
                                    else {
                                        store["updateData"]({
                                            entity: formValues, type: 0,
                                            btmList: chuanyuanmingdanArr,
                                            btmStoreList: chuanyuanwupinArr,
                                            danger: weiyanhuowushenbaoArr,
                                            emptyBox: yanhaikongxiangArr,
                                            entryGoods: zhuanguanhuowuArr,
                                            equipmentStore: neimaojizhuangxianghuowuArr,
                                            goodsReport: huowushenbaoArr,
                                            marineStore: chuanyongwupinArr,
                                            voyage: hangcizhaiyaoArr
                                        }, function (value) {
                                            if (value != '') {
                                                me.BasicInfoPK = value;
                                                Ext.shortAlert('操作成功');
                                                store.load();
                                                currentWindow.close();
                                                Ext.getCmp('shipWindow').close();
                                            } else {
                                                Ext.shortAlert('操作失败');
                                            }
                                        });
                                    }
                                }
                                else {
                                    store["updateData"]({
                                        entity: formValues, type: 0,
                                        btmList: chuanyuanmingdanArr,
                                        btmStoreList: chuanyuanwupinArr,
                                        danger: weiyanhuowushenbaoArr,
                                        emptyBox: yanhaikongxiangArr,
                                        entryGoods: zhuanguanhuowuArr,
                                        equipmentStore: neimaojizhuangxianghuowuArr,
                                        goodsReport: huowushenbaoArr,
                                        marineStore: chuanyongwupinArr,
                                        voyage: hangcizhaiyaoArr
                                    }, function (value) {
                                        if (value != '') {
                                            me.BasicInfoPK = value;
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                            currentWindow.close();
                                            Ext.getCmp('shipWindow').close();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        text: '申报',
                        name: 'btnApply',
                        iconCls: "icon-save",
                        xtype: 'button',
                        handler: function () {
                            //参数：货物申报
                            var huowushenbao = Ext.ComponentQuery.query('grid[itemId="huowushenbao"]')[0].getStore();
                            var huowushenbaoArr = [];
                            for (var i = 0; i < huowushenbao.getCount() ; i++) {
                                var recordHWSB = huowushenbao.getAt(i);
                                //alert(recordHWSB.get('EQUIPMENT_SIZE_TYPE'));
                                //return;
                                huowushenbaoArr[i] = {
                                    LOADING_PLACE_CODE: recordHWSB.get('LOADING_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordHWSB.get('DISCHARGE_PLACE_CODE'),
                                    SHIP_MARK: recordHWSB.get('SHIP_MARK'),
                                    GOODS_TYPE: recordHWSB.get('GOODS_TYPE'),
                                    EQUIPMENT_SIZE_TYPE: recordHWSB.get('EQUIPMENT_SIZE_TYPE'),
                                    EQUIPMENT_LOADED_STATUS: recordHWSB.get('EQUIPMENT_LOADED_STATUS'),
                                    PACKAGE_TYPE: recordHWSB.get('PACKAGE_TYPE'),
                                    GOODS_TOTAL_NUMBER: recordHWSB.get('GOODS_TOTAL_NUMBER'),
                                    CARGO_DISCRIPTION: recordHWSB.get('CARGO_DISCRIPTION'),
                                    GROSS_WEIGHT: recordHWSB.get('GROSS_WEIGHT'),
                                    QUENTITY_UNIT: recordHWSB.get('QUENTITY_UNIT'),
                                    FREE_TEXT: recordHWSB.get('FREE_TEXT')
                                };
                            }

                            //参数：船用物品
                            var chuanyongwupin = Ext.ComponentQuery.query('grid[itemId="chuanyongwupin"]')[0].getStore();
                            var chuanyongwupinArr = [];
                            for (var i = 0; i < chuanyongwupin.getCount() ; i++) {
                                var recordCYWP = chuanyongwupin.getAt(i);
                                chuanyongwupinArr[i] = {
                                    STORE_TYPE: recordCYWP.get('STORE_TYPE'),
                                    STORE_NAME: recordCYWP.get('STORE_NAME'),
                                    STORE_QUENTITY: recordCYWP.get('STORE_QUENTITY'),
                                    QUENTITY_UNIT: recordCYWP.get('QUENTITY_UNIT'),
                                    STOWAGE_PLACE: recordCYWP.get('STOWAGE_PLACE'),
                                    FREE_TEXT: recordCYWP.get('FREE_TEXT')
                                };
                            }

                            //参数：航次摘要
                            var hangcizhaiyao = Ext.ComponentQuery.query('grid[itemId="hangcizhaiyao"]')[0].getStore();
                            var hangcizhaiyaoArr = [];
                            for (var i = 0; i < hangcizhaiyao.getCount() ; i++) {
                                var recordHCZY = hangcizhaiyao.getAt(i);
                                //var hczy = recordHCZY.get('DEPARTURE_DATE');
                                //alert(hczy);
                                //return;
                                hangcizhaiyaoArr[i] = {
                                    ITINERARY_CODE: recordHCZY.get('ITINERARY_CODE'),
                                    ARRIVAL_DATE: dateFormatOwn(recordHCZY.get('ARRIVAL_DATE'), 'YmdHiO'),
                                    DEPARTURE_DATE: dateFormatOwn(recordHCZY.get('DEPARTURE_DATE'), 'YmdHiO'),
                                    FREE_TEXT: recordHCZY.get('FREE_TEXT')
                                };
                            }

                            //参数：船员名单
                            var chuanyuanmingdan = Ext.ComponentQuery.query('grid[itemId="chuanyuanmingdan"]')[0].getStore();
                            var chuanyuanmingdanArr = [];
                            for (var i = 0; i < chuanyuanmingdan.getCount() ; i++) {
                                var recordCYMD = chuanyuanmingdan.getAt(i);
                                chuanyuanmingdanArr[i] = {
                                    PERESON_NAME: recordCYMD.get('PERESON_NAME'),
                                    GENDER: recordCYMD.get('GENDER'),
                                    NATIONALITY: recordCYMD.get('NATIONALITY'),
                                    RANK: recordCYMD.get('RANK'),
                                    BIRTHDAY: dateFormatOwn(recordCYMD.get('BIRTHDAY'), 'Ymd'),
                                    BIRTHPLACE: recordCYMD.get('BIRTHPLACE'),
                                    ADDITIONAL_TYPE: recordCYMD.get('ADDITIONAL_TYPE'),
                                    ADDITIONAL_NUMBER: recordCYMD.get('ADDITIONAL_NUMBER'),
                                    FREE_TEXT: recordCYMD.get('FREE_TEXT')
                                }
                            }

                            //参数:船员物品
                            var chuanyuanwupin = Ext.ComponentQuery.query('grid[itemId="chuanyuanwupin"]')[0].getStore();
                            var chuanyuanwupinArr = [];
                            for (var i = 0; i < chuanyuanwupin.getCount() ; i++) {
                                var recordCYuanWP = chuanyuanwupin.getAt(i);
                                chuanyuanwupinArr[i] = {
                                    ADDITIONAL_TYPE: recordCYuanWP.get('ADDITIONAL_TYPE'),
                                    ADDITIONAL_NUMBER: recordCYuanWP.get('ADDITIONAL_NUMBER'),
                                    STORE_TYPE: recordCYuanWP.get('STORE_TYPE'),
                                    STORE_NAME: recordCYuanWP.get('STORE_NAME'),
                                    STORE_QUENTITY: recordCYuanWP.get('STORE_QUENTITY'),
                                    QUENTITY_UNIT: recordCYuanWP.get('QUENTITY_UNIT'),
                                    FREE_TEXT: recordCYuanWP.get('FREE_TEXT')
                                }
                            }

                            //参数：沿海空箱
                            var yanhaikongxiang = Ext.ComponentQuery.query('grid[itemId="yanhaikongxiang"]')[0].getStore();
                            var yanhaikongxiangArr = [];
                            for (var i = 0; i < yanhaikongxiang.getCount() ; i++) {
                                var recordYHKX = yanhaikongxiang.getAt(i);
                                yanhaikongxiangArr[i] = {
                                    CROSS_BORDER_SHIP: recordYHKX.get('CROSS_BORDER_SHIP'),
                                    CROSS_BORDER_VOYAGE: recordYHKX.get('CROSS_BORDER_VOYAGE'),
                                    CROSS_BORDER_DATE: dateFormatOwn(recordYHKX.get('CROSS_BORDER_DATE'), 'YmdHiO'),
                                    EQUIPMENT_NUMBER: recordYHKX.get('EQUIPMENT_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordYHKX.get('EQUIPMENT_SIZE_TYPE'),
                                    LOAD_PLACE_CODE: recordYHKX.get('LOAD_PLACE_CODE'),
                                    DISCHARG_PLACE_CODE: recordYHKX.get('DISCHARG_PLACE_CODE'),
                                    FREE_TEXT: recordYHKX.get('FREE_TEXT')
                                }
                            }

                            //参数：转关货物
                            var zhuanguanhuowu = Ext.ComponentQuery.query('grid[itemId="zhuanguanhuowu"]')[0].getStore();
                            var zhuanguanhuowuArr = [];
                            for (var i = 0; i < zhuanguanhuowu.getCount() ; i++) {
                                var recordZGHW = zhuanguanhuowu.getAt(i);
                                zhuanguanhuowuArr[i] = {
                                    TRAN_DOC_NUMBER: recordZGHW.get('TRAN_DOC_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordZGHW.get('EQUIPMENT_SIZE_TYPE'),
                                    CONTAINER_NUMBER: recordZGHW.get('CONTAINER_NUMBER'),
                                    LOAD_PLACE_CODE: recordZGHW.get('LOAD_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordZGHW.get('DISCHARGE_PLACE_CODE'),
                                    FREE_TEXT: recordZGHW.get('FREE_TEXT')
                                }
                            }

                            //参数：内贸集装箱货物
                            var neimaojizhuangxianghuowu = Ext.ComponentQuery.query('grid[itemId="neimaojizhuangxianghuowu"]')[0].getStore();
                            var neimaojizhuangxianghuowuArr = [];
                            for (var i = 0; i < neimaojizhuangxianghuowu.getCount() ; i++) {
                                var recordNMJZXHW = neimaojizhuangxianghuowu.getAt(i);
                                neimaojizhuangxianghuowuArr[i] = {
                                    EQUIPMENT_NUMBER: recordNMJZXHW.get('EQUIPMENT_NUMBER'),
                                    EQUIPMENT_SIZE_TYPE: recordNMJZXHW.get('EQUIPMENT_SIZE_TYPE'),
                                    CONTAINER_NUMBER: recordNMJZXHW.get('CONTAINER_NUMBER'),
                                    SEAL_NUMBER: recordNMJZXHW.get('SEAL_NUMBER'),
                                    CARGO_DESCRIPTION: recordNMJZXHW.get('CARGO_DESCRIPTION'),
                                    GORSS_WEIGHT: recordNMJZXHW.get('GORSS_WEIGHT'),
                                    CONSIGNEE_NAME: recordNMJZXHW.get('CONSIGNEE_NAME'),
                                    CONSIGNOR_NAME: recordNMJZXHW.get('CONSIGNOR_NAME'),
                                    LOAD_PLACE_CODE: recordNMJZXHW.get('LOAD_PLACE_CODE'),
                                    DISCHARGE_PLACE_CODE: recordNMJZXHW.get('DISCHARGE_PLACE_CODE'),
                                    FREE_TEXT: recordNMJZXHW.get('FREE_TEXT'),
                                    TRAN_DOC_NUMBER: recordNMJZXHW.get('TRAN_DOC_NUMBER')
                                }
                            }

                            //参数：危险货物申报
                            var weiyanhuowushenbao = Ext.ComponentQuery.query('grid[itemId="weiyanhuowushenbao"]')[0].getStore();
                            var weiyanhuowushenbaoArr = [];
                            for (var i = 0; i < weiyanhuowushenbao.getCount() ; i++) {
                                var recordWXHWSB = weiyanhuowushenbao.getAt(i);
                                weiyanhuowushenbaoArr[i] = {
                                    TRAN_DOC_NUMBER: recordWXHWSB.get('TRAN_DOC_NUMBER'),
                                    MCV_NUMBER: recordWXHWSB.get('MCV_NUMBER'),
                                    PACKAGE_KIND_NUMBER: recordWXHWSB.get('PACKAGE_KIND_NUMBER'),
                                    PROPER_SHIP_NAME: recordWXHWSB.get('PROPER_SHIP_NAME'),
                                    DCLASS: recordWXHWSB.get('DCLASS'),
                                    UN_NUMBER: recordWXHWSB.get('UN_NUMBER'),
                                    PACK_GROUP: recordWXHWSB.get('PACK_GROUP'),
                                    SUBSIDIARY_RISK: recordWXHWSB.get('SUBSIDIARY_RISK'),
                                    FLASH_POINT: recordWXHWSB.get('FLASH_POINT'),
                                    MARINE_POLLUTANT: recordWXHWSB.get('MARINE_POLLUTANT'),
                                    GORSS_NET_WEIGHT: recordWXHWSB.get('GORSS_NET_WEIGHT'),
                                    EMS: recordWXHWSB.get('EMS'),
                                    STOWAGE_POSITION: recordWXHWSB.get('STOWAGE_POSITION'),
                                    FREE_TEXT: recordWXHWSB.get('FREE_TEXT')
                                }
                            }
                            var currentWindow = this.up('window');
                            var form = currentWindow.down('form').getForm();
                            if (!form.isValid()) {
                                return;
                            }
                            else {
                                var formValues = form.getValues();
                                //formValues.SHIP_NO = me.BasicInfoPK;
                                Ext.Msg.confirm('提示', '确定申报？', function (check) {
                                    if (check == 'yes') {
                                        if (currentWindow.operationType == "add") {
                                            if (me.BasicInfoPK == null) {
                                                store[currentWindow.operationType + "Data"]({
                                                    entity: formValues, type: 1,
                                                    btmList: chuanyuanmingdanArr,
                                                    btmStoreList: chuanyuanwupinArr, danger: weiyanhuowushenbaoArr, emptyBox: yanhaikongxiangArr, entryGoods: zhuanguanhuowuArr, equipmentStore: neimaojizhuangxianghuowuArr, goodsReport: huowushenbaoArr, marineStore: chuanyongwupinArr, voyage: hangcizhaiyaoArr
                                                }, function (value) {
                                                    if (value == 'true') {
                                                        me.BasicInfoPK = value;
                                                        Ext.shortAlert('操作成功');
                                                        store.load();
                                                        currentWindow.close();
                                                        Ext.getCmp('shipWindow').close();
                                                    } else {
                                                        Ext.shortAlert('操作失败');
                                                    }
                                                });
                                            }
                                            else {
                                                store["updateData"]({
                                                    entity: formValues, type: 1,
                                                    btmList: chuanyuanmingdanArr,
                                                    btmStoreList: chuanyuanwupinArr,
                                                    danger: weiyanhuowushenbaoArr,
                                                    emptyBox: yanhaikongxiangArr,
                                                    entryGoods: zhuanguanhuowuArr,
                                                    equipmentStore: neimaojizhuangxianghuowuArr,
                                                    goodsReport: huowushenbaoArr,
                                                    marineStore: chuanyongwupinArr,
                                                    voyage: hangcizhaiyaoArr
                                                }, function (value) {
                                                    if (value != '') {
                                                        me.BasicInfoPK = value;
                                                        Ext.shortAlert('操作成功');
                                                        store.load();
                                                        currentWindow.close();
                                                        Ext.getCmp('shipWindow').close();
                                                    } else {
                                                        Ext.shortAlert('操作失败');
                                                    }
                                                });
                                            }
                                        }
                                        else {
                                            store["updateData"]({
                                                entity: formValues, type: 1,
                                                btmList: chuanyuanmingdanArr,
                                                btmStoreList: chuanyuanwupinArr,
                                                danger: weiyanhuowushenbaoArr,
                                                emptyBox: yanhaikongxiangArr,
                                                entryGoods: zhuanguanhuowuArr,
                                                equipmentStore: neimaojizhuangxianghuowuArr,
                                                goodsReport: huowushenbaoArr,
                                                marineStore: chuanyongwupinArr,
                                                voyage: hangcizhaiyaoArr
                                            }, function (value) {
                                                if (value != '') {
                                                    me.BasicInfoPK = value;
                                                    Ext.shortAlert('操作成功');
                                                    store.load();
                                                    currentWindow.close();
                                                    Ext.getCmp('shipWindow').close();
                                                } else {
                                                    Ext.shortAlert('操作失败');
                                                }
                                            });
                                        }
                                    }
                                });
                                
                            }
                        }
                    }, {
                        text: '取消',
                        xtype: 'button',
                        iconCls: "icon-back",
                        handler: function () {
                            this.up('window').close();
                        }
                    }]
                }]
            }, {
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
                width: 1000,
                //height: 415,
                autoScroll: true,
                id:'formId',
                //layout:'column',
                items: [{
                    xtype: 'fieldset',
                    layout: 'column',
                    collapsible: true,
                    columnWidth: 1,
                    title: '总申报',
                    items: [{
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'SHIP_NO',
                            margin: '5 0 5 0',
                            fieldLabel: '船舶编号',
                            readOnly:true,
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'IMO',
                            margin: '5 0 5 0',
                            fieldLabel: 'IMO',
                            readOnly: true,
                            labelWidth: 90,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'IN_OUT_STATUE',
                            margin: '5 0 5 0',
                            fieldLabel: '抵港/离港状态',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'IN_OUT_VOYAGE',
                            margin: '5 0 5 0',
                            fieldLabel: '抵港/离港航次',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'lineCodeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //xtype:'textfield',
                            name: 'ROUTE',
                            margin: '5 0 5 0',
                            fieldLabel: '经营航线',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('ROUTE'));
                                            tigger.setValue(record.get('ROUTE_TEXT'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'datefield',
                            name: 'IN_OUT_DATE',
                            format:'Ymd',
                            margin: '5 0 5 0',
                            fieldLabel: '抵/离日期及时间',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 90,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'CARGO_DRAFT',
                            margin: '5 0 5 0',
                            fieldLabel: '载货吃水',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .25,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'datefield',
                            name: 'DECLARATION_DATE',
                            format: 'Ymd',
                            editable: false,
                            margin: '5 0 5 0',
                            fieldLabel: '申报时间',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'portCodeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //xtype: 'textfield',
                            name: 'DECLARATION_PLACE_CODE',
                            margin: '5 0 5 0',
                            fieldLabel: '申报港口代码',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('DECLARATION_PLACE_CODE'));
                                            tigger.setValue(record.get('DECLARATION_PLACE_CODE_TEXT'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'CREW_NUMBER',
                            margin: '5 0 5 0',
                            fieldLabel: '船员人数',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'PASSENGERS_NUMBER',
                            margin: '5 0 5 0',
                            fieldLabel: '旅客人数',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'bussinessTypeStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //xtype: 'textfield',
                            name: 'GOVENMENT_PROC_CODE',
                            margin: '5 0 5 0',
                            fieldLabel: '海关业务类型',
                            labelWidth: 85,
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            //width: 250,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('GOVENMENT_PROC_CODE'));
                                            tigger.setValue(record.get('GOVENMENT_PROC_CODE_TEXT'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'purposeOfCallStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //xtype: 'textfield',
                            name: 'CALL_PURPOSE',
                            margin: '5 0 5 0',
                            fieldLabel: '来港目的',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('CALL_PURPOSE'));
                                            tigger.setValue(record.get('CALL_PURPOSE_TEXT'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'OPERATOR_CODE',
                            margin: '5 0 5 0',
                            fieldLabel: '船舶经营人',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'searchfield',
                            store: 'enterprisePropertyStore',
                            displayField: 'KEY_TEXT',
                            valueField: 'KEY_VALUE',
                            //xtype: 'textfield',
                            name: 'OPERATOR_TYPE',
                            margin: '5 0 5 0',
                            fieldLabel: '经营人性质',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6',
                            listeners: {
                                beforerender:
                                    function (tigger, opt) {
                                        if (record) {
                                            tigger.setHiddenValue(record.get('OPERATOR_TYPE'));
                                            tigger.setValue(record.get('OPERATOR_TYPE_TEXT'));
                                        }
                                    }

                            }
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'AGENT_CODE',
                            margin: '5 0 5 0',
                            fieldLabel: '申报人代码',
                            allowBlank: false,
                            fieldStyle: 'background-color:#FFFFB9; background-image: none;',
                            blankText: '该输入项为必输项',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'CONTEXT_NAME',
                            margin: '5 0 5 0',
                            fieldLabel: '申报人姓名',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'AGENT_ADDRESS',
                            margin: '5 0 5 0',
                            fieldLabel: '申报人地址',
                            labelWidth: 85,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    },  {
                        columnWidth: 1,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textarea',
                            name: 'FREE_TEXT',
                            margin: '5 0 5 0',
                            fieldLabel: '备注',
                            labelWidth: 80,
                            //width: 250,
                            style: 'background-color:#dfe8f6'
                        }]
                    }, {
                        columnWidth: .2,
                        layout: 'form',
                        border: false,
                        items: [{
                            xtype: 'textfield',
                            name: 'SCHEDULE_ID',
                            margin: '5 0 5 0',
                            fieldLabel: 'SCHEDULE_ID',
                            hidden: true,
                            //labelWidth: 85,
                            //width: 250,
                            //style: 'background-color:#dfe8f6'
                        }]
                    }]
                }//itmes包含关系:datewindow→form→fieldset结束标记                
                ]
            }//form结束
            , {
                xtype: 'panel',
                border: false,
                forceFit: false,
                layout: 'column',
                height:420,
                //autoScroll: true,
                //enableTabScroll:true,
                bodyStyle: 'overflow-x:auto; overflow-y:hidden',
                items: [{
                    xtype: 'tabpanel',
                    width: 1000,
                    //height: 200,
                    autoScroll: true,
                    items: [
                        {
                            title: '货物申报',
                            store: storeHWSB,
                            xtype: 'grid',
                            forceFit: false,
                            autoScroll: true,
                            columnWidth: .99,
                            width: 500,
                            height: 150,
                            itemId: 'huowushenbao',
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                text: '装货港代码',
                                dataIndex: 'LOADING_PLACE_CODE',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'

                                }
                            }, {
                                text: '卸货港代码',
                                dataIndex: 'DISCHARGE_PLACE_CODE',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'

                                }
                            }, {
                                text: '标记唛码',
                                dataIndex: 'SHIP_MARK',
                                editor: {
                                    xtype: 'textfield'

                                }
                            }, {
                                text: '货物类型',
                                dataIndex: 'GOODS_TYPE',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'goodsTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                text: '集装箱(器)尺寸和类型',
                                dataIndex: 'EQUIPMENT_SIZE_TYPE',
                                width: 150,
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'containerTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                text: '重箱或空箱标识代码',
                                dataIndex: 'EQUIPMENT_LOADED_STATUS',
                                width: 150,
                                editor: {
                                    xtype: 'textfield'
                                }
                            }, {
                                text: '包装种类代码',
                                dataIndex: 'PACKAGE_TYPE',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'packTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                text: '货物数量',
                                dataIndex: 'GOODS_TOTAL_NUMBER',
                                editor: {
                                    xtype: 'numberfield'
                                }
                            }, {
                                text: '货物摘要说明',
                                dataIndex: 'CARGO_DISCRIPTION',
                                editor: {
                                    xtype: 'textfield'
                                }
                            }, {
                                text: '毛重',
                                dataIndex: 'GROSS_WEIGHT',
                                editor: {
                                    xtype: 'textfield'
                                }
                            }, {
                                text: '数量单位',
                                dataIndex: 'QUENTITY_UNIT',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'meteringUnitStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                text: '备注',
                                dataIndex: 'FREE_TEXT',
                                editor: {
                                    xtype: 'textfield'
                                }
                            }],
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (grid, rowIndex, colIndex) {
                                    var rec = new Object({
                                        LOADING_PLACE_CODE: '',
                                        DISCHARGE_PLACE_CODE: '',
                                        SHIP_MARK: '',
                                        GOODS_TYPE: '',
                                        EQUIPMENT_SIZE_TYPE: '',
                                        EQUIPMENT_LOADED_STATUS: '',
                                        PACKAGE_TYPE: '',
                                        GOODS_TOTAL_NUMBER: '',
                                        CARGO_DISCRIPTION: '',
                                        GROSS_WEIGHT: '',
                                        QUENTITY_UNIT: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="huowushenbao"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                      //  storeHWSB.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('LOADING_PLACE_CODE', e.value);
                                        //alert(e.record.get('LOADING_PLACE_CODE'));
                                        //var findRecord = docGoodsReport.findRecord("LOADING_PLACE_CODE", e.value);
                                        ////alert(findRecord);
                                        //if (findRecord == undefined) {
                                        //    //alert('ccc');
                                        //    e.record.set('LOADING_PLACE_CODE', '');
                                        //} else {
                                        //    e.record.set('LOADING_PLACE_CODE', findRecord.data.LOADING_PLACE_CODE);
                                        //    alert(e.record);
                                        //    alert('aaaa');
                                        //}
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('DISCHARGE_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('SHIP_MARK', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('GOODS_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('EQUIPMENT_SIZE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('EQUIPMENT_LOADED_STATUS', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('PACKAGE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 8) {
                                        e.record.set('GOODS_TOTAL_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 9) {
                                        e.record.set('CARGO_DISCRIPTION', e.value);
                                    } else { }
                                    if (e.colIdx == 10) {
                                        e.record.set('GROSS_WEIGHT', e.value);
                                    } else { }
                                    if (e.colIdx == 11) {
                                        e.record.set('QUENTITY_UNIT', e.value);
                                    } else { }
                                    if (e.colIdx == 12) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '船用物品',
                            store: storeCYWP,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'chuanyongwupin',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (grid, rowIndex, colIndex) {
                                    var rec = new Object({
                                        STORE_TYPE: '',
                                        STORE_NAME: '',
                                        STORE_QUENTITY: '',
                                        QUENTITY_UNIT: '',
                                        STOWAGE_PLACE: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            columns: [
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    width: 20,
                                    items: [
                                    {
                                        iconCls: 'icon-no',
                                        tooltip: '删除',
                                        scope: this,
                                        handler: function (grid, rowIndex, colIndex) {
                                            grid.store.removeAt(rowIndex);
                                        }
                                    }]
                                },
                                {
                                    dataIndex: 'STORE_TYPE',
                                    text: '物品类型',
                                    editor: { xtype: 'textfield' }
                                }, {
                                    dataIndex: 'STORE_NAME',
                                    text: '物品名称',
                                    editor: { xtype: 'textfield' }
                                }, {
                                    dataIndex: 'STORE_QUENTITY',
                                    text: '物品数量',
                                    editor: { xtype: 'numberfield' }
                                }, {
                                    dataIndex: 'QUENTITY_UNIT',
                                    text: '数量单位',
                                    editor: {
                                        xtype: 'searchfield',
                                        store: 'meteringUnitStore',
                                        hideTrigger: true,
                                        selectOnFocus: false,
                                        displayField: 'KEY_VALUE',
                                        valueField: 'KEY_VALUE'
                                    }
                                }, {
                                    dataIndex: 'STOWAGE_PLACE',
                                    text: '存放地点',
                                    editor: { xtype: 'textfield' }
                                }, {
                                    dataIndex: 'FREE_TEXT',
                                    text: '备注',
                                    editor: { xtype: 'textfield' }
                                }
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="chuanyongwupin"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                       // storeCYWP.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('STORE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('STORE_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('STORE_QUENTITY', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('QUENTITY_UNIT', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('STOWAGE_PLACE', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '航次摘要',
                            xtype: 'grid',
                            store: storeHCZY,
                            forceFit: false,
                            //width: 500,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'hangcizhaiyao',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        ITINERARY_CODE: '',
                                        ARRIVAL_DATE: '',
                                        DEPARTURE_DATE: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'ITINERARY_CODE',
                                text: '停靠港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'ARRIVAL_DATE',
                                text: '抵达时间',
                                renderer: Ext.util.Format.dateRenderer('YmdHiO'),
                                editor: { xtype: 'datetimefield', format: 'YmdHiO' }
                            }, {
                                dataIndex: 'DEPARTURE_DATE',
                                text: '驶离时间',
                                renderer: Ext.util.Format.dateRenderer('YmdHiO'),
                                editor: { xtype: 'datetimefield', format: 'YmdHiO' }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="hangcizhaiyao"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeHCZY.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store

                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('ITINERARY_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('ARRIVAL_DATE', e.value);
                                        //alert(editor.getValue());
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('DEPARTURE_DATE', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '船员名单',
                            store: storeCYuanMD,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'chuanyuanmingdan',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        PERESON_NAME: '',
                                        GENDER: '',
                                        NATIONALITY: '',
                                        RANK: '',
                                        BIRTHDAY: '',
                                        BIRTHPLACE: '',
                                        ADDITIONAL_TYPE: '',
                                        ADDITIONAL_NUMBER: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'PERESON_NAME',
                                text: '姓名',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'GENDER',
                                text: '性别',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'NATIONALITY',
                                text: '国籍',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'nationalityStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'RANK',
                                text: '职务',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'dutyProfessionStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'BIRTHDAY',
                                text: '出生日期',
                                renderer: Ext.util.Format.dateRenderer('Ymd'),
                                editor: { xtype: 'datefield', format: 'Ymd' }
                            }, {
                                dataIndex: 'BIRTHPLACE',
                                text: '出生地',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'ADDITIONAL_TYPE',
                                text: '船员证件类型',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'documentTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'ADDITIONAL_NUMBER',
                                text: '船员证件号码',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="chuanyuanmingdan"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeCYuanMD.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('PERESON_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('GENDER', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('NATIONALITY', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('RANK', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('BIRTHDAY', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('BIRTHPLACE', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('ADDITIONAL_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 8) {
                                        e.record.set('ADDITIONAL_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 9) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '船员物品',
                            store: storeCYuanWP,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'chuanyuanwupin',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        ADDITIONAL_TYPE: '',
                                        ADDITIONAL_NUMBER: '',
                                        STORE_TYPE: '',
                                        STORE_NAME: '',
                                        STORE_QUENTITY: '',
                                        QUENTITY_UNIT: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'ADDITIONAL_TYPE',
                                text: '船员证件类型',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'documentTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'ADDITIONAL_NUMBER',
                                text: '船员证件号码',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'STORE_TYPE',
                                text: '物品类型',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'STORE_NAME',
                                text: '物品名称',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'STORE_QUENTITY',
                                text: '物品数量',
                                editor: { xtype: 'numberfield' }
                            }, {
                                dataIndex: 'QUENTITY_UNIT',
                                text: '数量单位',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'meteringUnitStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="chuanyuanwupin"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeCYuanWP.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('ADDITIONAL_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('ADDITIONAL_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('STORE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('STORE_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('STORE_QUENTITY', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('QUENTITY_UNIT', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '沿海空箱',
                            xtype: 'grid',
                            store: storeYHKX,
                            forceFit: false,
                            columnWidth: 1,
                            itemId: 'yanhaikongxiang',
                            height: 150,
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        CROSS_BORDER_SHIP: '',
                                        CROSS_BORDER_VOYAGE: '',
                                        CROSS_BORDER_DATE: '',
                                        EQUIPMENT_NUMBER: '',
                                        EQUIPMENT_SIZE_TYPE: '',
                                        LOAD_PLACE_CODE: '',
                                        DISCHARG_PLACE_CODE: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'CROSS_BORDER_SHIP',
                                text: '原进境船舶',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'CROSS_BORDER_VOYAGE',
                                text: '原进境航次',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'CROSS_BORDER_DATE',
                                text: '原进境日期',
                                renderer: Ext.util.Format.dateRenderer('YmdHiO'),
                                editor: { xtype: 'datetimefield',format:'YmdHiO' }
                            }, {
                                dataIndex: 'EQUIPMENT_NUMBER',
                                text: '箱号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'EQUIPMENT_SIZE_TYPE',
                                text: '集装箱(器)尺寸和类型',
                                width:150,
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'containerTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'LOAD_PLACE_CODE',
                                text: '装货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'DISCHARG_PLACE_CODE',
                                text: '卸货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="yanhaikongxiang"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeYHKX.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('CROSS_BORDER_SHIP', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('CROSS_BORDER_VOYAGE', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('CROSS_BORDER_DATE', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('EQUIPMENT_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('EQUIPMENT_SIZE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('LOAD_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('DISCHARG_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 8) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '转关货物',
                            store: storeZGHW,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'zhuanguanhuowu',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        TRAN_DOC_NUMBER: '',
                                        EQUIPMENT_SIZE_TYPE: '',
                                        CONTAINER_NUMBER: '',
                                        LOAD_PLACE_CODE: '',
                                        DISCHARGE_PLACE_CODE: '',
                                        FREE_TEXT: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'TRAN_DOC_NUMBER',
                                text: '转关单编号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'EQUIPMENT_SIZE_TYPE',
                                text: '集装箱(器)尺寸和类型',
                                width:150,
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'containerTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'CONTAINER_NUMBER',
                                text: '自然箱数',
                                editor: { xtype: 'numberfield' }
                            }, {
                                dataIndex: 'LOAD_PLACE_CODE',
                                text: '装货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'DISCHARGE_PLACE_CODE',
                                text: '卸货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="zhuanguanhuowu"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeZGHW.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('TRAN_DOC_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('EQUIPMENT_SIZE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('CONTAINER_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('LOAD_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('DISCHARGE_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '内贸集装箱货物',
                            store: storeNMJZXHW,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            height: 150,
                            itemId: 'neimaojizhuangxianghuowu',
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        EQUIPMENT_NUMBER: '',
                                        EQUIPMENT_SIZE_TYPE: '',
                                        CONTAINER_NUMBER: '',
                                        SEAL_NUMBER: '',
                                        CARGO_DESCRIPTION: '',
                                        GORSS_WEIGHT: '',
                                        CONSIGNEE_NAME: '',
                                        CONSIGNOR_NAME: '',
                                        LOAD_PLACE_CODE: '',
                                        DISCHARGE_PLACE_CODE: '',
                                        FREE_TEXT: '',
                                        TRAN_DOC_NUMBER: ''
                                    });
                                    this.up('grid').getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'EQUIPMENT_NUMBER',
                                text: '箱号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'EQUIPMENT_SIZE_TYPE',
                                text: '集装箱(器)尺寸和类型',
                                width:150,
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'containerTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'CONTAINER_NUMBER',
                                text: '自然箱数',
                                editor: { xtype: 'numberfield' }
                            }, {
                                dataIndex: 'SEAL_NUMBER',
                                text: '铅封号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'CARGO_DESCRIPTION',
                                text: '货名',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'GORSS_WEIGHT',
                                text: '毛重',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'CONSIGNEE_NAME',
                                text: '收货人',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'CONSIGNOR_NAME',
                                text: '发货人',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'LOAD_PLACE_CODE',
                                text: '装货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'DISCHARGE_PLACE_CODE',
                                text: '卸货港代码',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'portCodeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'TRAN_DOC_NUMBER',
                                text: '提(运)单号',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="neimaojizhuangxianghuowu"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeNMJZXHW.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('EQUIPMENT_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('EQUIPMENT_SIZE_TYPE', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('CONTAINER_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('SEAL_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('CARGO_DESCRIPTION', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('GORSS_WEIGHT', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('CONSIGNEE_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 8) {
                                        e.record.set('CONSIGNOR_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 9) {
                                        e.record.set('LOAD_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 10) {
                                        e.record.set('DISCHARGE_PLACE_CODE', e.value);
                                    } else { }
                                    if (e.colIdx == 11) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                    if (e.colIdx == 12) {
                                        e.record.set('TRAN_DOC_NUMBER', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }, {
                            title: '危险货物申报',
                            store: storeWXHWSB,
                            xtype: 'grid',
                            forceFit: false,
                            columnWidth: 1,
                            itemId: 'weiyanhuowushenbao',
                            height: 150,
                            tbar: [{
                                text: '添加',
                                xtype: 'button',
                                iconCls: 'icon-add',
                                handler: function (sender) {
                                    var rec = new Object({
                                        TRAN_DOC_NUMBER: '',
                                        MCV_NUMBER: '',
                                        PACKAGE_KIND_NUMBER: '',
                                        PROPER_SHIP_NAME: '',
                                        DCLASS: '',
                                        UN_NUMBER: '',
                                        PACK_GROUP: '',
                                        SUBSIDIARY_RISK: '',
                                        FLASH_POINT: '',
                                        MARINE_POLLUTANT: '',
                                        GORSS_NET_WEIGHT: '',
                                        EMS: '',
                                        STOWAGE_POSITION: '',
                                        FREE_TEXT: ''
                                    });
                                    //this.up('grid').getStore().insert(0, rec);
                                    Ext.ComponentQuery.query('grid[itemId="weiyanhuowushenbao"]')[0].getStore().insert(0, rec);
                                }
                            }],
                            columns: [{
                                xtype: 'actioncolumn',
                                menuDisabled: true,
                                width: 20,
                                items: [
                                {
                                    iconCls: 'icon-no',
                                    tooltip: '删除',
                                    scope: this,
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.store.removeAt(rowIndex);
                                    }
                                }]
                            }, {
                                dataIndex: 'TRAN_DOC_NUMBER',
                                text: '提单号/相关单证号',
                                width:120,
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'MCV_NUMBER',
                                text: '标记和编号/集装箱箱号/车牌号',
                                width: 180,
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'PACKAGE_KIND_NUMBER',
                                text: '包件的数量和种类',
                                width: 120,
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'PROPER_SHIP_NAME',
                                text: '正确运输名称',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'DCLASS',
                                text: '类别',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'UN_NUMBER',
                                text: '联合国编号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'PACK_GROUP',
                                text: '包件种类',
                                editor: {
                                    xtype: 'searchfield',
                                    store: 'packTypeStore',
                                    hideTrigger: true,
                                    selectOnFocus: false,
                                    displayField: 'KEY_VALUE',
                                    valueField: 'KEY_VALUE'
                                }
                            }, {
                                dataIndex: 'SUBSIDIARY_RISK',
                                text: '副危险性',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'FLASH_POINT',
                                text: '闪点',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'MARINE_POLLUTANT',
                                text: '是否海洋污染物',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'GORSS_NET_WEIGHT',
                                text: '重量(毛重/净重)',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'EMS',
                                text: '应急措施表号',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'STOWAGE_POSITION',
                                text: '船上积载位置',
                                editor: { xtype: 'textfield' }
                            }, {
                                dataIndex: 'FREE_TEXT',
                                text: '备注',
                                editor: { xtype: 'textfield' }
                            }],
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            listeners: {
                                activate: function (panel, b) {
                                    var gridValue = Ext.ComponentQuery.query('grid[itemId="weiyanhuowushenbao"]')[0].getStore().getCount();
                                    if (gridValue == 0) {
                                        //storeWXHWSB.load({ param: record.get('SCHEDULE_ID') });//当前标签被激活时加载对应store
                                    }
                                },
                                edit: function (editor, e) {
                                    if (e.colIdx == 1) {
                                        e.record.set('TRAN_DOC_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 2) {
                                        e.record.set('MCV_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 3) {
                                        e.record.set('PACKAGE_KIND_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 4) {
                                        e.record.set('PROPER_SHIP_NAME', e.value);
                                    } else { }
                                    if (e.colIdx == 5) {
                                        e.record.set('DCLASS', e.value);
                                    } else { }
                                    if (e.colIdx == 6) {
                                        e.record.set('UN_NUMBER', e.value);
                                    } else { }
                                    if (e.colIdx == 7) {
                                        e.record.set('PACK_GROUP', e.value);
                                    } else { }
                                    if (e.colIdx == 8) {
                                        e.record.set('SUBSIDIARY_RISK', e.value);
                                    } else { }
                                    if (e.colIdx == 9) {
                                        e.record.set('FLASH_POINT', e.value);
                                    } else { }
                                    if (e.colIdx == 10) {
                                        e.record.set('MARINE_POLLUTANT', e.value);
                                    } else { }
                                    if (e.colIdx == 11) {
                                        e.record.set('GORSS_NET_WEIGHT', e.value);
                                    } else { }
                                    if (e.colIdx == 12) {
                                        e.record.set('EMS', e.value);
                                    } else { }
                                    if (e.colIdx == 13) {
                                        e.record.set('STOWAGE_POSITION', e.value);
                                    } else { }
                                    if (e.colIdx == 14) {
                                        e.record.set('FREE_TEXT', e.value);
                                    } else { }
                                }
                            },
                            selType: 'cellmodel'
                        }]
                }]
            }
            ]
        };


        this.add({
            border: false,
            store: store,
            xtype: 'form',
            itemId: 'shipDataRecordSelect',
            //title: '查询条件',
            collapsible: true,
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
                    width: '15%'
                },
                tbar: [{
                    xtype: 'textfield',
                    name: 'SHIP_NO',
                    fieldLabel: '船舶编号'
                }, {
                    xtype: 'textfield',
                    name: 'IMO',
                    fieldLabel: 'IMO'
                }]
            }]

        });



        this.add({
            xtype: 'datagrid',
            store: store,
            forceFit: false,
            tbar: [{
                text: '查询',
                xtype: 'button',
                handler: function (sender) {
                    var object = Ext.ComponentQuery.query('[itemId="shipDataRecordSelect"]')[0]
                    var form = object.getForm();
                    var obj = form.getValues();

                    store.load({
                        params: obj
                    });

                }
            }, {
                text: '新增',
                xtype: 'addbutton',
                handler: function (sender) {
                    var addWindow = Ext.ComponentMgr.create(shipWindow);
                    addWindow.setOperationType('add');
                    addWindow.callerComp = sender;
                    addWindow.show(this);
                    storeShip.load();
                    me.BasicInfoPK = null;
                }
            }],
            //multiSelect: true,
            //selModel: {
            //    mode: 'SINGLE',  //多选multi,simple,单选single;
            //    selType: 'checkboxmodel',
            //    showHeaderCheckbox: false,  //不显示标题栏中的一键全选按键
            //    allowDeselect: true  //允许取消选中状态
            //},
            columns: [{
                xtype: 'linkColumn',//这里就是放置按钮的地方
                text: '操作',
                width: 100,
                items: [{
                    linkText: '修改',
                    handler: function (grid, rowIndex, colIndex, sender) {
                        record = grid.getStore().getAt(rowIndex);
                        var updateWindow = Ext.ComponentMgr.create(docDecWindow);
                        updateWindow.setOperationType('update');
                        updateWindow.callerComp = sender;
                        updateWindow.down('form').loadRecord(record);
                        me.BasicInfoPK = record.get('SCHEDULE_ID');
                        storeHWSB.load({ param: record.get('SCHEDULE_ID') });
                        storeCYuanMD.load({ param: record.get('SCHEDULE_ID') });
                        storeCYuanWP.load({ param: record.get('SCHEDULE_ID') });
                        storeHCZY.load({ param: record.get('SCHEDULE_ID') });
                        storeYHKX.load({ param: record.get('SCHEDULE_ID') });
                        storeCYWP.load({ param: record.get('SCHEDULE_ID') });
                        storeZGHW.load({ param: record.get('SCHEDULE_ID') });
                        storeNMJZXHW.load({ param: record.get('SCHEDULE_ID') });
                        storeWXHWSB.load({ param: record.get('SCHEDULE_ID') });
                        updateWindow.show(this);
                    }
                }, {
                    linkText: '删除',
                    disabled: true,
                    handler: function (grid, rowIndex, colIndex) {
                        var records = grid.getStore().getAt(rowIndex);
                        if (records != null) {
                            Ext.Msg.confirm('提示', '确认删除吗?', function (check) {
                                if (check == "yes") {
                                    var array = [];
                                    Ext.Array.each(records, function (item) {
                                        array.push("'" + item.get('SCHEDULE_ID') + "'");
                                    });
                                    store.deleteData({ strID: array.join(',') }, function (value) {
                                        if (value == 'true') {
                                            Ext.shortAlert('操作成功');
                                            store.load();
                                        } else {
                                            Ext.shortAlert('操作失败');
                                        }
                                    });
                                }
                            });
                        } else {
                            Ext.Msg.alert('提示', '请先选中一条信息！');
                        }
                    }
                }]
            }, {
                dataIndex: 'SCHEDULE_ID',
                text: 'SCHEDULE_ID',
                hidden:true
            }, {
                dataIndex: 'SHIP_NO',
                text: '船舶编号'
            }, {
                dataIndex: 'IMO',
                text: 'IMO'
            }, {
                text: '抵港/离港状态',
                dataIndex: 'IN_OUT_STATUE'
            }, {
                text: '抵港/离港航次',
                dataIndex: 'IN_OUT_VOYAGE'
            }, {
                text: '申报港口代码',
                dataIndex: 'DECLARATION_PLACE_CODE'
            }, {
                text: '船员人数',
                dataIndex: 'CREW_NUMBER'
            }, {
                text: '旅客人数',
                dataIndex: 'PASSENGERS_NUMBER'
            }, {
                text: '海关业务类型',
                dataIndex: 'GOVENMENT_PROC_CODE'
            }, {
                text: '来港目的',
                dataIndex: 'CALL_PURPOSE'
            }, {
                text: '船舶经营人',
                dataIndex: 'OPERATOR_CODE'
            }, {
                text: '船舶经营人性质',
                dataIndex: 'OPERATOR_TYPE'
            }, {
                text: '海关业务类型',
                dataIndex: 'GOVENMENT_PROC_CODE'
            }, {
                text: '申报人代码',
                dataIndex: 'AGENT_CODE'
            }, {
                text: '申报联系人姓名',
                dataIndex: 'CONTEXT_NAME'
            }, {
                text: '申报时间',
                dataIndex: 'DECLARATION_DATE'
            }, {
                text: '备注',
                dataIndex: 'FREE_TEXT'
            }, {
                text: '经营航线',
                dataIndex: 'ROUTE'
            }, {
                text: '抵/离日期及时间',
                dataIndex: 'IN_OUT_DATE'
            }, {
                text: '申报人地址',
                dataIndex: 'AGENT_ADDRESS'
            }, {
                text: '载货吃水',
                dataIndex: 'CARGO_DRAFT'
            }]
        });

    }
});