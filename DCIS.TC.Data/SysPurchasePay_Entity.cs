﻿using System;
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
    [SqlTable("SysPurchasePay")]
   public class SysPurchasePay_Entity:BaseEntity
    {
        public sealed class Consts
        {

            public const string F_BillNo = "BillNo";
            public const string F_CreateDate = "CreateDate";
            public const string F_PurBillNo = "PurBillNo";
            public const string F_ContractCode = "ContractCode";
            public const string F_ReceiveName = "ReceiveName";
            public const string F_PayReason = "PayReason";
            public const string F_TotalAmount = "TotalAmount";
            public const string F_PayAmount = "PayAmount";
            public const string F_PayAmountBig = "PayAmountBig";
            public const string F_PaidAmount = "PaidAmount";
            public const string F_BANK = "BANK";
            public const string F_BANKNO = "BANKNO";
            public const string F_Remarks = "Remarks";
            public const string F_PayUserCode = "PayUserCode";
            public const string F_PayUserName = "PayUserName";
            public const string F_StepNo = "StepNo";
            public const string F_StepName = "StepName";
            public const string F_AppUserCode = "AppUserCode";
            public const string F_AppUserName = "AppUserName";
            public const string F_IsPayoff = "IsPayoff";
            public const string F_IsAppEnd = "IsAppEnd";
            public const string F_PayWayCode = "PayWayCode";
            public const string F_PayWayText = "PayWayText";
            public const string F_UpdateTime = "UpdateTime";//UpdateTime
         
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysPurchasePay_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysPurchasePay_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysPurchasePay_Entity(string billNo, string connectionKey)
            : base(connectionKey)
        {
            this.BillNo = billNo;
            this.SelectByPKeys();
        }


        private string _BillNo;
        [SqlColumn(Consts.F_BillNo, true)]
        public string BillNo
        {
            get { return this._BillNo; }
            set { this._BillNo = value; this.SetValue(Consts.F_BillNo, true); }
        }       

        private string _ContractCode;
        [SqlColumn(Consts.F_ContractCode)]
        public string ContractCode
        {
            get { return this._ContractCode; }
            set { this._ContractCode = value; this.SetValue(Consts.F_ContractCode, true); }
        }

        private string _CreateDate;
        [SqlColumn(Consts.F_CreateDate)]
        public string CreateDate
        {
            get { return this._CreateDate; }
            set { this._CreateDate = value; this.SetValue(Consts.F_CreateDate, true); }
        }


        private string _PurBillNo;
        [SqlColumn(Consts.F_PurBillNo)]
        public string PurBillNo
        {
            get { return this._PurBillNo; }
            set { this._PurBillNo = value; this.SetValue(Consts.F_PurBillNo, true); }
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

        private decimal _PayAmount;
        [SqlColumn(Consts.F_PayAmount)]
        public decimal PayAmount
        {
            get { return this._PayAmount; }
            set { this._PayAmount = value; this.SetValue(Consts.F_PayAmount, true); }
        }

        private string _PayAmountBig;
        [SqlColumn(Consts.F_PayAmountBig)]
        public string PayAmountBig
        {
            get { return this._PayAmountBig; }
            set { this._PayAmountBig = value; this.SetValue(Consts.F_PayAmountBig, true); }
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

        private string _PayUserCode;
        [SqlColumn(Consts.F_PayUserCode)]
        public string PayUserCode
        {
            get { return this._PayUserCode; }
            set { this._PayUserCode = value; this.SetValue(Consts.F_PayUserCode, true); }
        }

        private string _PayUserName;
        [SqlColumn(Consts.F_PayUserName)]
        public string PayUserName
        {
            get { return this._PayUserName; }
            set { this._PayUserName = value; this.SetValue(Consts.F_PayUserName, true); }
        }

        private int _StepNo;
        [SqlColumn(Consts.F_StepNo)]
        public int StepNo
        {
            get { return this._StepNo; }
            set { this._StepNo = value; this.SetValue(Consts.F_StepNo, true); }
        }

        private string _StepName;
        [SqlColumn(Consts.F_StepName)]
        public string StepName
        {
            get { return this._StepName; }
            set { this._StepName = value; this.SetValue(Consts.F_StepName, true); }
        }


        private string _AppUserCode;
        [SqlColumn(Consts.F_AppUserCode)]
        public string AppUserCode
        {
            get { return this._AppUserCode; }
            set { this._AppUserCode = value; this.SetValue(Consts.F_AppUserCode, true); }
        }


        private string _AppUserName;
        [SqlColumn(Consts.F_AppUserName)]
        public string AppUserName
        {
            get { return this._AppUserName; }
            set { this._AppUserName = value; this.SetValue(Consts.F_AppUserName, true); }
        }


        private string _IsPayoff;
        [SqlColumn(Consts.F_IsPayoff)]
        public string IsPayoff
        {
            get { return this._IsPayoff; }
            set { this._IsPayoff = value; this.SetValue(Consts.F_IsPayoff, true); }
        }


        private string _IsAppEnd;
        [SqlColumn(Consts.F_IsAppEnd)]
        public string IsAppEnd
        {
            get { return this._IsAppEnd; }
            set { this._IsAppEnd = value; this.SetValue(Consts.F_IsAppEnd, true); }
        }

        private int _PayWayCode;
        [SqlColumn(Consts.F_PayWayCode)]
        public int PayWayCode
        {
            get { return this._PayWayCode; }
            set { this._PayWayCode = value; this.SetValue(Consts.F_PayWayCode, true); }
        }

        private string _PayWayText;
        [SqlColumn(Consts.F_PayWayText)]
        public string PayWayText
        {
            get { return this._PayWayText; }
            set { this._PayWayText = value; this.SetValue(Consts.F_PayWayText, true); }
        }


        private DateTime _UpdateTime;
        [SqlColumn(Consts.F_UpdateTime)]
        public DateTime UpdateTime
        {
            get { return this._UpdateTime; }
            set { this._UpdateTime = value; this.SetValue(Consts.F_UpdateTime, true); }
        }
 
    }
}
