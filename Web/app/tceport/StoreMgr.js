Ext.define("TCEPORT.StoreMgr", {
    statics: {
        storeList: {}, 
        get: function (store, cfg) {
            if (store instanceof TCEPORT.Store || Ext.typeOf(store) == "array") {
                return store;
            }
            if (Ext.typeOf(store) == "string") {
                if (store.indexOf('.') == -1) {
                    store = window.applicationName + ".store." + store;
                }
                //return Ext.create(store, cfg);
                var cache = true;
                if (cfg) {
                    if (cfg.cache!=null) {
                        cache = cfg.cache;
                        delete cfg.cache;
                    }
                    if (cache == true && TCEPORT.StoreMgr.storeList[store]) {
                    	return Ext.create(store, cfg);
                        //return TCEPORT.StoreMgr.storeList[store];
                    }
                    TCEPORT.StoreMgr.storeList[store] = Ext.create(store, cfg);
                    return TCEPORT.StoreMgr.storeList[store];
                }
                if (TCEPORT.StoreMgr.storeList[store]) {
                    return TCEPORT.StoreMgr.storeList[store];
                }
                else {
                    TCEPORT.StoreMgr.storeList[store] = Ext.create(store, cfg);
                    return TCEPORT.StoreMgr.storeList[store];
                }
            }
        }
    }
});