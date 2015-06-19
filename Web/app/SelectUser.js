var vp=new Ext.Viewport({
    layout: "border",
    requires: ["ZCJK.unpacking.test"],
    items:[{  
        region:'center',  
        items:[
                 Ext.create("ZCJK.user.User")
              ]  
        }    
    ]  
});