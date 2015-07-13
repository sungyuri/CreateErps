using System;
using System.IO;
using System.Data;
using System.Text;
using System.Reflection;
using System.Collections;
using DCIS.Lib;
using DCIS.DbAccess;
using DCIS.Persistence;


namespace TCEPORT.TC.Data
{
    [Serializable]
    [SqlTable("SysStorage")]
   public class SysStorage_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_StorageID = "StorageID";
            public const string F_LinkBillNo = "LinkBillNo";
            public const string F_StorageTime = "StorageTime";
            public const string F_SUserCode = "SUserCode";
            public const string F_SUserName = "SUserName";
            public const string F_OState = "OState";
            public const string F_SCreateTime = "SCreateTime";
            public const string F_ConfirmUserCode = "ConfirmUserCode";
            public const string F_ConfirmUserName = "ConfirmUserName";
            public const string F_BillType = "BillType";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysStorage_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysStorage_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysStorage_Entity(string storageID, string connectionKey)
            : base(connectionKey)
        {
            this.StorageID = storageID;
            this.SelectByPKeys();
        }



        private string _StorageID;
        [SqlColumn(Consts.F_StorageID, true)]
        public string StorageID
        {
            get { return this._StorageID; }
            set { this._StorageID = value; this.SetValue(Consts.F_StorageID, true); }
        }

        private string _LinkBillNo;
        [SqlColumn(Consts.F_LinkBillNo)]
        public string LinkBillNo
        {
            get { return this._LinkBillNo; }
            set { this._LinkBillNo = value; this.SetValue(Consts.F_LinkBillNo, true); }
        }

        private string _StorageTime;
        [SqlColumn(Consts.F_StorageTime)]
        public string StorageTime
        {
            get { return this._StorageTime; }
            set { this._StorageTime = value; this.SetValue(Consts.F_StorageTime, true); }
        }

        private string _SUserCode;
        [SqlColumn(Consts.F_SUserCode)]
        public string SUserCode
        {
            get { return this._SUserCode; }
            set { this._SUserCode = value; this.SetValue(Consts.F_SUserCode, true); }
        }

        private string _SUserName;
        [SqlColumn(Consts.F_SUserName)]
        public string SUserName
        {
            get { return this._SUserName; }
            set { this._SUserName = value; this.SetValue(Consts.F_SUserName, true); }
        }

        private string _OState;
        [SqlColumn(Consts.F_OState)]
        public string OState
        {
            get { return this._OState; }
            set { this._OState = value; this.SetValue(Consts.F_OState, true); }
        }

        private DateTime _SCreateTime;
        [SqlColumn(Consts.F_SCreateTime)]
        public DateTime SCreateTime
        {
            get { return this._SCreateTime; }
            set { this._SCreateTime = value; this.SetValue(Consts.F_SCreateTime, true); }
        }

        private string _ConfirmUserCode;
        [SqlColumn(Consts.F_ConfirmUserCode)]
        public string ConfirmUserCode
        {
            get { return this._ConfirmUserCode; }
            set { this._ConfirmUserCode = value; this.SetValue(Consts.F_ConfirmUserCode, true); }
        }

        private string _ConfirmUserName;
        [SqlColumn(Consts.F_ConfirmUserName)]
        public string ConfirmUserName
        {
            get { return this._ConfirmUserName; }
            set { this._ConfirmUserName = value; this.SetValue(Consts.F_ConfirmUserName, true); }
        }

        private string _BillType;
        [SqlColumn(Consts.F_BillType)]
        public string BillType
        {
            get { return this._BillType; }
            set { this._BillType = value; this.SetValue(Consts.F_BillType, true); }
        }     

    }
}