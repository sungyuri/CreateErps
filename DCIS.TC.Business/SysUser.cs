using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TCEPORT.TC.Business
{
   public  class SysUser
    {
       public SysUser()
       {

       }
        private String userGUID;
        private String loginName;
        private String name;
        private String cmpGUID;
        private String cmpNameFull;
        private String cmpNameShort;
        private String cmpTypeCod;
        private String cmpTypeName;
        private String approvalLev;
        private String unitCod;
        private String deptGuid;

        public string UserGUID
        {
            get { return userGUID; }
            set { userGUID = value; }
        }

        public string LoginName
        {
            get { return loginName; }
            set { loginName = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public string CmpGUID
        {
            get { return cmpGUID; }
            set { cmpGUID = value; }
        }
        public string CmpNameFull
        {
            get { return cmpNameFull; }
            set { cmpNameFull = value; }
        }
        public string CmpNameShort
        {
            get { return cmpNameShort; }
            set { cmpNameShort = value; }
        }
        public string CmpTypeCod
        {
            get { return cmpTypeCod; }
            set { cmpTypeCod = value; }
        }
        public string CmpTypeName
        {
            get { return cmpTypeName; }
            set { cmpTypeName = value; }
        }
        public string ApprovalLev
        {
            get { return approvalLev; }
            set { approvalLev = value; }
        }
        public string UnitCod
        {
            get { return unitCod; }
            set { unitCod = value; }
        }
        public string DeptGuid
        {
            get { return deptGuid; }
            set { deptGuid = value; }
        }

    }
}
