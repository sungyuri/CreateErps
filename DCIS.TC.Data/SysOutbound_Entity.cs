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
    [SqlTable("SysOutbound")]
   public class SysOutbound_Entity:BaseEntity
    {
        public sealed class Consts
        {
            //OutboundID, LinkBillNo, OutboundTime, OUserCode, OUserName, OState, 
            //OCreateTime, ConfirmUserCode, ConfirmUserName, BillType, OutStatus
            //
            public const string F_OutboundID = "OutboundID";
            public const string F_LinkBillNo = "LinkBillNo";
            public const string F_OutboundTime = "OutboundTime";
            public const string F_OUserCode = "OUserCode";
            public const string F_OUserName = "OUserName";
            public const string F_OState = "OState";
            public const string F_OCreateTime = "OCreateTime";
            public const string F_ConfirmUserCode = "ConfirmUserCode";
            public const string F_ConfirmUserName = "ConfirmUserName";
            public const string F_BillType = "BillType";
            public const string F_OutStatus = "OutStatus";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysOutbound_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysOutbound_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysOutbound_Entity(string outboundID, string connectionKey)
            : base(connectionKey)
        {
            this.OutboundID = outboundID;
            this.SelectByPKeys();
        }



        private string _OutboundID;
        [SqlColumn(Consts.F_OutboundID, true)]
        public string OutboundID
        {
            get { return this._OutboundID; }
            set { this._OutboundID = value; this.SetValue(Consts.F_OutboundID, true); }
        }

        private string _LinkBillNo;
        [SqlColumn(Consts.F_LinkBillNo)]
        public string LinkBillNo
        {
            get { return this._LinkBillNo; }
            set { this._LinkBillNo = value; this.SetValue(Consts.F_LinkBillNo, true); }
        }

        private string _OutboundTime;
        [SqlColumn(Consts.F_OutboundTime)]
        public string OutboundTime
        {
            get { return this._OutboundTime; }
            set { this._OutboundTime = value; this.SetValue(Consts.F_OutboundTime, true); }
        }

        private string _OUserCode;
        [SqlColumn(Consts.F_OUserCode)]
        public string OUserCode
        {
            get { return this._OUserCode; }
            set { this._OUserCode = value; this.SetValue(Consts.F_OUserCode, true); }
        }

        private string _OUserName;
        [SqlColumn(Consts.F_OUserName)]
        public string OUserName
        {
            get { return this._OUserName; }
            set { this._OUserName = value; this.SetValue(Consts.F_OUserName, true); }
        }

        private string _OState;
        [SqlColumn(Consts.F_OState)]
        public string OState
        {
            get { return this._OState; }
            set { this._OState = value; this.SetValue(Consts.F_OState, true); }
        }

        private DateTime _OCreateTime;
        [SqlColumn(Consts.F_OCreateTime)]
        public DateTime OCreateTime
        {
            get { return this._OCreateTime; }
            set { this._OCreateTime = value; this.SetValue(Consts.F_OCreateTime, true); }
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

        private string _OutStatus;
        [SqlColumn(Consts.F_OutStatus)]
        public string OutStatus
        {
            get { return this._OutStatus; }
            set { this._OutStatus = value; this.SetValue(Consts.F_OutStatus, true); }
        }      

    }
}