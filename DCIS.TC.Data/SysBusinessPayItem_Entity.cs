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
    [SqlTable("SysBusinessPayItem")]
  public  class SysBusinessPayItem_Entity:BaseEntity
    {
          public sealed class Consts
        {
            public const string F_CommonPayNo = "CommonPayNo";
            public const string F_ReceiveName = "ReceiveName";
            public const string F_PayReason = "PayReason";
            public const string F_TotalAmount = "TotalAmount";
            public const string F_PaidAmount = "PaidAmount";
            public const string F_BANK = "BANK";
            public const string F_BANKNO = "BANKNO";
            public const string F_Remarks = "Remarks";
            public const string F_CreateUserCode = "CreateUserCode";
            public const string F_CreateUserName = "CreateUserName";
            public const string F_IsPayoff = "IsPayoff";
            public const string F_CreateTime = "CreateTime";
            public const string F_LastUpdateTime = "LastUpdateTime";

        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysBusinessPayItem_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysBusinessPayItem_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysBusinessPayItem_Entity(int commonPayNo, string connectionKey)
            : base(connectionKey)
        {
            this.CommonPayNo = commonPayNo;
            this.SelectByPKeys();
        }


        private int _CommonPayNo;
        [SqlColumn(Consts.F_CommonPayNo, true)]
        public int CommonPayNo
        {
            get { return this._CommonPayNo; }
            set { this._CommonPayNo = value; this.SetValue(Consts.F_CommonPayNo, true); }
        }

        private string _ReceiveName;
        [SqlColumn(Consts.F_ReceiveName)]
        public string ReceiveName
        {
            get { return this._ReceiveName; }
            set { this._ReceiveName = value; this.SetValue(Consts.F_ReceiveName, true); }
        }

        private string _PayReason;
        [SqlColumn(Consts.F_PayReason)]
        public string PayReason
        {
            get { return this._PayReason; }
            set { this._PayReason = value; this.SetValue(Consts.F_PayReason, true); }
        }

        private decimal _TotalAmount;
        [SqlColumn(Consts.F_TotalAmount)]
        public decimal TotalAmount
        {
            get { return this._TotalAmount; }
            set { this._TotalAmount = value; this.SetValue(Consts.F_TotalAmount, true); }
        }

        private decimal _PaidAmount;
        [SqlColumn(Consts.F_PaidAmount)]
        public decimal PaidAmount
        {
            get { return this._PaidAmount; }
            set { this._PaidAmount = value; this.SetValue(Consts.F_PaidAmount, true); }
        }

        private string _BANK;
        [SqlColumn(Consts.F_BANK)]
        public string BANK
        {
            get { return this._BANK; }
            set { this._BANK = value; this.SetValue(Consts.F_BANK, true); }
        }

        private string _BANKNO;
        [SqlColumn(Consts.F_BANKNO)]
        public string BANKNO
        {
            get { return this._BANKNO; }
            set { this._BANKNO = value; this.SetValue(Consts.F_BANKNO, true); }
        }

        private string _Remarks;
        [SqlColumn(Consts.F_Remarks)]
        public string Remarks
        {
            get { return this._Remarks; }
            set { this._Remarks = value; this.SetValue(Consts.F_Remarks, true); }
        }

        private string _CreateUserCode;
        [SqlColumn(Consts.F_CreateUserCode)]
        public string CreateUserCode
        {
            get { return this._CreateUserCode; }
            set { this._CreateUserCode = value; this.SetValue(Consts.F_CreateUserCode, true); }
        }
        private string _CreateUserName;
        [SqlColumn(Consts.F_CreateUserName)]
        public string CreateUserName
        {
            get { return this._CreateUserName; }
            set { this._CreateUserName = value; this.SetValue(Consts.F_CreateUserName, true); }
        }

        private string _IsPayoff;
        [SqlColumn(Consts.F_IsPayoff)]
        public string IsPayoff
        {
            get { return this._IsPayoff; }
            set { this._IsPayoff = value; this.SetValue(Consts.F_IsPayoff, true); }
        }


        private DateTime _CreateTime;
        [SqlColumn(Consts.F_CreateTime)]
        public DateTime CreateTime
        {
            get { return this._CreateTime; }
            set { this._CreateTime = value; this.SetValue(Consts.F_CreateTime, true); }
        }

        private DateTime _LastUpdateTime;
        [SqlColumn(Consts.F_LastUpdateTime)]
        public DateTime LastUpdateTime
        {
            get { return this._LastUpdateTime; }
            set { this._LastUpdateTime = value; this.SetValue(Consts.F_LastUpdateTime, true); }
        }

    }
}