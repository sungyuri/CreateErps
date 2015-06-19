Ext.define("TCEPORT.Store", {
    extend: "Ext.data.JsonStore",
    alias: "widget.TCEPORTstore",
	pageSize:20,
    constructor: function (cfg) {
        var config = Ext.apply({}, cfg);
        this.url = config.url = config.url || this.url;
        this.model = config.model = config.model || this.model;
        if (this.model == null) {
            delete this.model;
            delete config.model;
            config.fields = config.fields || this.fields;
        }
        if (config.data != null || this.data != null) {
            Ext.applyIf(config, {
                proxy: {
                    type: "memory",
                    reader: { type: "json" },
                    writer: "json"
                }
            });
        }
        else {
            Ext.applyIf(config, {
                proxy: {
                    type: "TCEPORTproxy",
                    url: config.url,
                    reader: {
                        type: "json",
                        idProperty: "",
                        root: "data",
                        listeners: {
                            "exception": function (aaa, bbb, ccc, ddd) {
                                alert(ccc.message);
                            }
                        }
                    },
                    writer: "json"
                }
            });
        }
        if (this.model != null && typeof config.model == 'string') {
            Ext.syncRequire(config.model);
        }
        if (config.needPage == false) {
            config.proxy.pageParam = undefined;
            config.proxy.startParam = undefined;
            config.proxy.limitParam = undefined;
        }
        
        if (config.pageSize!=null){
        	this.pageSize = config.pageSize;
       }
        
        this.callParent([config]);
               
    },
    listeners: {
        //chenjd  用于分页时记录searchPanel查询的值
        beforeLoad: { 
    		fn: function (store, operation, eOpts) {
	            if (store.isLoadPage==true){
	            	store.isLoadPage=false;
	            	return;
	            }
	            if (this.pageSize!=null){
	        		this.getProxy().pageSize = this.pageSize;
	       		}
	            operation.page=1;
	            operation.start=0;
	            
	            store.currentPage=1;
	    		store.lastSearchValue = operation.params;
	        },
	        scope: this
        }
    },
    initComponent:function(){
        this.callParent(arguments);
    	if (this.pageSize!=null){
        	this.getProxy().pageSize = this.pageSize;
        }
    },
    loadPage:function(){
    	this.isLoadPage=true;
    	this.proxy.extraParams=this.lastSearchValue;
    	this.callParent(arguments);
    },
    addData: function (values, fn, error) {
        callapi(this.addUrl, values, function (result) {
		    fn(result);       
        }, this, error);
    },
    updateData: function (values, fn, error) {
        callapi(this.updateUrl, values, function (result) {
            fn(result);	
        }, this, error);
    },
    deleteData: function (values, fn, error) {
        callapi(this.deleteUrl, values, function (result) {
            fn(result);
        }, this, error);
    },
    approvalData: function (values, fn, error) {
        callapi(this.approvalUrl, values, function (result) {
		    fn(result);       
        }, this, error);
    },
    addDetailData: function (values, fn, error) {
        callapi(this.addDetailUrl, values, function (result) {
           fn(result);
        }, this, error);
    },
   updateDetailData: function (values, fn, error) {
       callapi(this.updateDetailUrl, values, function (result) {
           fn(result);
       }, this, error);
   },
   deleteDetailData: function (values, fn, error) {
       callapi(this.updateDetailUrl, values, function (result) {
           fn(result);
       }, this, error);
   }

});