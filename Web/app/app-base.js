/// <reference path="../../Resources/ext-all-dev.js" />
function callapi(url, params, callback, scope, error) {
    if (url == null) {
        throw new Error('[' + Ext.getDisplayName(arguments.callee) + '] 请输入调用的url地址');
    }
    var option = {
        method: "POST",
         url: baseUrl + "/api/" + url + "?_dc=" + new Date().getTime(),
         //url: url + "&_dc=" + new Date().getTime(),
        jsonData: params,
        failure: function (response) {
            if (response.status == 500 && error != null) {
                if (Ext.String.startWith(response.responseText, "TCEPORTError-")) {
                    var text = response.responseText.substr(10, response.responseText.length - 10);
                    errorObj = Ext.decode(text);
                    error(errorObj);
                }
            }
            if (error != null) {
                error.call(scope, response);
            }
            else {
                Ext.Msg.alert("错误", "调用服务器发生错误<br>错误代码为:" + response.status + "<br>错误信息为:" + response.statusText + "<br>服务器出错内容为:" + response.responseText);
                //Ext.Msg.alert("提示", "网络连接已断开<br>请刷新页面或者重新登陆");
            }

        },
        success: function (result) {
            if (callback == null) {
                return;
            }
            var data = Ext.decode(result.responseText);
            if (data == null) {
                callback.call(scope, data);
            }
            else if (data.success == true) {
                if (callback != null) {
                    callback.call(scope, data.data);
                }
            }
            else if (data.success == false) {
                if (error != null) {
                    error.call(scope, data.value);
                } else {
                    var errorData = data.value;
                    if (Ext.typeOf(errorData) != "array") {
                        errorData = [errorData];
                        Ext.Msg.alert('提示', '服务器端出现异常，错误信息为：' + errorData[0]["Message"]);
                    }
                }
            }
            else {
                callback.call(scope, data);
            }
        }
    };
    Ext.Ajax.request(option);
};

function logout() {
    Ext.Msg.confirm('系统提示', '您确认退出系统', function (btn) {
        if (btn == 'yes') {
            top.location.href = "Logout.aspx";
        }
        else {
            return;
        }
    }, this)
};
function callapiAsync(url, params) {
    var obj;
    if (url == null) {
        throw new Error('[' + Ext.getDisplayName(arguments.callee) + '] 请输入调用的url地址');
    }
    var option = {
        method: "POST",
        url: baseUrl + "/api/" + url,
        jsonData: params,
        async: false,
        failure: function (response) { },
        success: function (result) { var data = Ext.decode(result.responseText); obj = data; }
    };
    Ext.Ajax.request(option);
    return obj;
};
Ext.onReady(function () {


    Ext.Loader.setConfig({ enabled: true });

    Ext.Loader.setPath({
        "TCEPORT": "app/TCEPORT",
        "Ext.ux": "resources/ux"
    });

    Ext.Loader.require([
        "TCEPORT.Proxy",
        "TCEPORT.Store",
        "TCEPORT.buttons.AddButton",
        "TCEPORT.buttons.UpdateButton",
        "TCEPORT.buttons.DeleteButton",
        "TCEPORT.ComboBox",
        "TCEPORT.SearchPanel",
        "TCEPORT.DataGrid",
        "TCEPORT.DataWindow",
        "TCEPORT.DropDownList",
        "TCEPORT.SearchField",
        "TCEPORT.SearchWindow",
        "TCEPORT.LinkColumn",
        "TCEPORT.TabCloseMenu",
        "TCEPORT.SearchWindowMultiSelect",
        "TCEPORT.SearchBoxNoField",
        "TCEPORT.SearchBoxNoWindow",
        "TCEPORT.buttons.SaveButton",
        "TCEPORT.buttons.SearchButton",
        "TCEPORT.StoreMgr",
        "TCEPORT.DateTimePicker",
        "TCEPORT.DateTimeField",
        "TCEPORT.MyLinkCol"
    ]);

    //设置默认文本宽度为60,文本框长度为200
    Ext.apply(Ext.form.field.Base.prototype, {
        labelWidth: 60,
        width: 230,
        labelAlign: "right",
        labelSeparator: "",
        msgTarget: "side"
    });

    Ext.apply(Ext.window.Window.prototype, {
        constrainHeader: true
    });

    Ext.apply(Ext.form.field.ComboBox.prototype, {
        listConfig: {
            loadingText: "正在加载数据",
            emptyText: "未找到匹配值",
            maxHeight: 400
        },
        displayName: null
    });

    //chenjd update:grid加载出现数据加载体验,并给出中文提示。
    Ext.override(Ext.view.AbstractView, {
        onRender: function () {
            var me = this;
            me.loadingText = '数据加载中,请稍候...',
			this.callOverridden();

            if (me.mask && Ext.isObject(me.store)) {
                me.setMaskBind(me.store);
            }
        }
    });

    Ext.apply(Ext.form.FieldContainer.prototype, {
        labelAlign: "right",
        labelWidth: 60,
        labelSeparator: "",
        combineErrors: true,
        msgTarget: "side"
    });
    //设置basic的getValues,如果不输入任何参数默认按照asString=false,dirtyOnly=true的方式进行,否则按照普通方式进行
    Ext.apply(Ext.form.Basic.prototype, {
        getValues: function () {
            if (arguments.length == 0) {
                return this.getValuesCustom(false, false, true);
            }
            else {
                return this.getValuesCustom(arguments);
            }
        },
        setValues: function (values) {
            var me = this,
            v, vLen, val, field;

            function setVal(fieldId, val) {
                var field = me.findField(fieldId);
                if (field) {
                    if (field instanceof TCEPORT.SearchField) {
                        field.setRecord(values);
                    }
                    else {
                        field.setValue(val);
                    }
                    if (me.trackResetOnLoad) {
                        field.resetOriginalValue();
                    }
                }
            }

            // Suspend here because setting the value on a field could trigger
            // a layout, for example if an error gets set, or it's a display field
            Ext.suspendLayouts();
            if (Ext.isArray(values)) {
                // array of objects
                vLen = values.length;

                for (v = 0; v < vLen; v++) {
                    val = values[v];
                    setVal(val.id, val.value);
                }
            } else {
                // object hash
                Ext.iterate(values, setVal);
            }
            Ext.resumeLayouts(true);
            return this;
        },
        getValuesCustom: function (asString, dirtyOnly, includeEmptyText, useDataValues) {
            var values = {},
            fields = this.getFields().items,
            f,
            fLen = fields.length,
            isArray = Ext.isArray,
            field, data, val, bucket, name;
//            includeEmptyText = true;
            for (f = 0; f < fLen; f++) {
                field = fields[f];

                if (!dirtyOnly || field.isDirty()) {
                    data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);

                    if (Ext.isObject(data)) {
                        for (name in data) {
                            if (data.hasOwnProperty(name)) {
                                val = data[name];

                                if (includeEmptyText && val === '') {
                                    val = field.emptyText || '';
                                }

                                if (values.hasOwnProperty(name)) {
                                    bucket = values[name];

                                    if (!isArray(bucket)) {
                                        bucket = values[name] = [bucket];
                                    }

                                    if (isArray(val)) {
                                        values[name] = bucket.concat(val);
                                    } else {
                                        bucket.push(val);
                                    }
                                } else {
                                    values[name] = val;
                                }
                            }
                        }
                    }
                }
            }

            if (asString) {
                values = Ext.Object.toQueryString(values);
            }
            return values;
        }
    });

    Ext.apply(Ext.toolbar.Paging.prototype, {
        isShowRefresh: true,
        getPagingItems: function () {
            var me = this;
            var items = [{
                itemId: 'first',
                tooltip: me.firstText,
                overflowText: me.firstText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
                disabled: true,
                handler: me.moveFirst,
                scope: me
            }, {
                itemId: 'prev',
                tooltip: me.prevText,
                overflowText: me.prevText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
                disabled: true,
                handler: me.movePrevious,
                scope: me
            },
        '-',
        me.beforePageText,
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margins: '-1 2 3 2',
            listeners: {
                scope: me,
                keydown: me.onPagingKeyDown,
                blur: me.onPagingBlur
            }
        }, {
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        }, {
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        }, '-', {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            handler: me.doRefresh,
            scope: me
        }];
            if (!this.isShowRefresh) {
                items[items.length - 1].style = "display:none";
            }
            return items;
        }
    });

    //初始化QuickTips
    Ext.QuickTips.init();

    Ext.shortAlert = function (title, format) {
        var msgCt;
        function createBox(t, s) {
            return '<div class="msg"><center><h3>' + t + '</h3><p>' + s + '</p></center></div>';
        }

        if (format == null || format == "" || format == undefined) {
            format = "";
        }
        if (!msgCt) {
            msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call([title, format], 1));
        var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
        m.hide();
        m.slideIn('t').ghost("t", { delay: 1000, remove: true });
    };


});

Ext.EventManager.on(Ext.isIE ? document : window, 'keydown', function (e, target, o) {

    //禁用掉backspace防止回退页面
    //if (e.getKey() == e.BACKSPACE && e.browserEvent.srcElement.type != 'text' &&
    //    e.browserEvent.srcElement.type != 'textarea' && e.browserEvent.srcElement.type != 'password') {
    //    e.stopEvent();
    //}
    //禁用掉backspace防止回退页面
    //if (e.getKey() == e.BACKSPACE && e.getTarget().type != 'text' &&
    //    e.getTarget().type != 'textarea' && e.getTarget().type != 'password') {
    //    e.stopEvent();
    //}
    if (e.getKey() == e.BACKSPACE) {
        if (e.getTarget().type != 'text' && e.getTarget().type != 'textarea' && e.getTarget().type != 'password') {
            e.stopEvent();
        }
            //只读情况也禁用
        else if (e.getTarget().getAttribute('readOnly') == 'readonly') {
            e.stopEvent();
        }
    }
    else if (e.getKey() == e.ENTER) {
        //回车转TAB键
        if (Ext.isIE) {
            event.keyCode = Ext.EventObject.TAB;
        }
        else {
            var targetEl = Ext.get(target.id),
            fieldEl = targetEl.up('[class*=x-field]') || {},
            field = Ext.getCmp(fieldEl.id);
            if (field.getXType() == 'textarea' || field.getXType() == 'textareafield') {
                return;
            }
            var next = field.nextNode('textfield[hidden="false"][readOnly="false"][disabled="false"]');

            if (next) {
                e.stopEvent();
                next.focus();
                next.selectText();
            }
        }
    }
});

Ext.Ajax.on('requestexception', function (conn, response, options) {
    //session过期
    if (response.status == "999") {
        Ext.Msg.alert('提示', '会话超时，请重新登录!', function () {
            //  var url = document.getElementById("atsurlid").value;
            top.location.href = "Logout.aspx";
        });
    }
});

/**
 * 表单全键盘导航功能 index:可选参数，用于设定页面加载完成后默认获取焦点的表单项，支持索引号和id/dom类型参数传入。
 */
function keyNav(e) {
    if (Ext.isIE) {
        e.browserEvent.keyCode = Ext.EventObject.TAB;
    } else {
        var all = Ext.DomQuery.select('input[type!=hidden]'); // 查找所有非隐藏的录入向（ext中select都是用input模拟的所以这里不用找select）
        Ext.each(all, function (o, i, all) { // 遍历并添加enter的监听
            Ext.get(o).addKeyMap({
                key: 13,
                fn: function () {
                    try {
                        all[i + 1].focus()
                    } catch (e) {
                        event.keyCode = 9
                    }
                    if (all[i + 1]
                            && /button|reset|submit/
                                    .test(all[i + 1].type))
                        all[i + 1].click(); // 如果是按钮则触发click事件

                    return
                    true;
                }
            })
        });
        document.body.focus(); // 使页面获取焦点，否则下面设定默认焦点的功能有时不灵验
        try {
            var el;
            if (typeof eval(xFocus) == 'object') { // 如果传入的是id或dom节点
                el = Ext.getDom(xFocus).tagName == 'input'
						? Ext.getDom(xFocus)
						: Ext.get(xFocus).first('input', true); // 找到input框
            } else {
                el = all[xFocus || 0]; // 通过索引号找
            }
            el.focus();
        } catch (e) {
        }
    }
}


function download(url, params) {
    if (!url)
        return;
    var form = Ext.fly('frmDummy');
    if (!form) {
        form = document.createElement('form');
        form.id = 'frmDummy';
        form.className = 'x-hidden';
        document.body.appendChild(form);
        form = Ext.fly('frmDummy');
    }
    var domform = Ext.getDom(form)

    if (Ext.isSafari && Ext.isMac) {
        var hiddens = [];
        var encoding = 'multipart/form-data';
        var buf = {
            target: domform.target,
            method: domform.method,
            encoding: form.encoding,
            enctype: form.enctype,
            action: domform.action
        };

        form.set({
            target: '_blank',
            method: 'POST',
            enctype: encoding,
            encoding: encoding,
            action: url || buf.action
        });
        Ext.iterate(params, function (k, v) {
            var hd = document.createElement('input');
            Ext.fly(hd).set({
                type: 'hidden',
                value: v,
                name: k
            });
            domform.appendChild(hd);
            hiddens.push(hd);
        });

        domform.submit();

        form.set(buf);
        Ext.each(hiddens, function (h) {
            Ext.removeNode(h);
        });
    }
    else {
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            form: form,
            isUpload: true,
            params: params,
            success: function (response, opts) {
                if (response.responseText) {
                    var rv = Ext.decode(response.responseText);
                    alert(rv.errorMessage);
                }
            }
        });
    }
}
function MsgConfirm(title,text,fun)
{
   var win=Ext.create('TCEPORT.MsgWindow',{msgText:text,callback:fun,title:title});
	win.show();
};


//通过系统标识加载菜单及首页
function setOnclickDivNew(eName, cName, surlIndex) {
    var west = Ext.ComponentQuery.query('[name="maincontent_west"]')[0];
    west.funGroup = null;
    west.init(eName);
   // west.setTitle(cName);
    var centerPanel = Ext.ComponentQuery.query('[name="tabCenterPanel"]')[0];
    var length = centerPanel.items.length;
    var homePage = Ext.ComponentQuery.query('[name="homepagedataview"]')[0];
    homePage.getStore().removeAll();
    homePage.getStore().load({ params: { type: eName } });
    for (var i = length; i > 0; i--) {
        centerPanel.remove(i);
    }
    centerPanel.setActiveTab(0);
}

function dateFormatOwn(value, df) {
    if (null != value) {
        return Ext.Date.format(new Date(value), df);
    } else {
        return null;
    }
}