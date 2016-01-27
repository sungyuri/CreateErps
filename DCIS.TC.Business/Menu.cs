using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCEPORT.TC.Business
{
    [Serializable]
   public   class Menu
    {
        private String menuId;
        private String menuNam;
        private String menuUrl;
        private String menuLvl;
        private String parentId;
        private int orderNum;
       public Menu()
       {
       }
       public String getParentId()
       {
           return parentId;
       }
       public void setParentId(String parentId)
       {
           this.parentId = parentId;
       }
       public String getMenuId()
       {
           return menuId;
       }
       public void setMenuId(String menuId)
       {
           this.menuId = menuId;
       }
       public String getMenuLvl()
       {
           return menuLvl;
       }
       public void setMenuLvl(String menuLvl)
       {
           this.menuLvl = menuLvl;
       }
       public String getMenuNam()
       {
           return menuNam;
       }
       public void setMenuNam(String menuNam)
       {
           this.menuNam = menuNam;
       }
       public String getMenuUrl()
       {
           return menuUrl;
       }
       public void setMenuUrl(String menuUrl)
       {
           this.menuUrl = menuUrl;
       }
       public int getOrderNum()
       {
           return orderNum;
       }
       public void setOrderNum(int orderNum)
       {
           this.orderNum = orderNum;
       }


    }
}
