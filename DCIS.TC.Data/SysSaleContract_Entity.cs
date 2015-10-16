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
    [SqlTable("SysSaleContract")]
    public class SysSaleContract_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_BillNo = "BillNo";
            public const string F_ContractCode = "ContractCode";
            public const string F_CustomerNo = "CustomerNo";
            public const string F_CustomerName = "CustomerName";
            public const string F_SignPlace = "SignPlace";
            public const string F_SignDate = "SignDate";
            public const string F_ContractAmount = "ContractAmount";
            public const string F_ContractAmountBig = "ContractAmountBig";
            public const string F_DeliveryTime = "DeliveryTime";
            public const string F_QA = "QA";
            public const string F_DeliveryWay = "DeliveryWay";
            public const string F_PayWay = "PayWay";
            public const string F_OtherNote = "OtherNote";
            public const string F_Remarks = "Remarks";
            public const string F_PurUserCode = "PurUserCode";
            public const string F_PurUserName = "PurUserName";
            public const string F_StepNo = "StepNo";
            public const string F_StepName = "StepName";
            public const string F_AppUserCode = "AppUserCode";
            public const string F_AppUserName = "AppUserName";
            public const string F_IsPayoff = "IsPayoff";
            public const string F_IsAppEnd = "IsAppEnd";
            public const string F_PaidAmount = "PaidAmount";
            public const string F_IsStorage = "IsStorage";
            public const string F_CreateTime = "CreateTime";
            public const string F_DETAILEDINFO = "DETAILEDINFO";
            public const string F_ContractCodeA = "ContractCodeA";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysSaleContract_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysSaleContract_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysSaleContract_Entity(string billNo, string connectionKey)
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

        private int _CustomerNo;
        [SqlColumn(Consts.F_CustomerNo)]
        public int CustomerNo
        {
            get { return this._CustomerNo; }
            set { this._CustomerNo = value; this.SetValue(Consts.F_CustomerNo, true); }
        }


        private string _CustomerName;
        [SqlColumn(Consts.F_CustomerName)]
        public string CustomerName
        {
            get { return this._CustomerName; }
            set { this._CustomerName = value; this.SetValue(Consts.F_CustomerName, true); }
        }

        private string _SignPlace;
        [SqlColumn(Consts.F_SignPlace)]
        public string SignPlace
        {
            get { return this._SignPlace; }
            set { this._SignPlace = value; this.SetValue(Consts.F_SignPlace, true); }
        }

        private string _SignDate;
        [SqlColumn(Consts.F_SignDate)]
        public string SignDate
        {
            get { return this._SignDate; }
            set { this._SignDate = value; this.SetValue(Consts.F_SignDate, true); }
        }

        private decimal _ContractAmount;
        [SqlColumn(Consts.F_ContractAmount)]
        public decimal ContractAmount
        {
            get { return this._ContractAmount; }
            set { this._ContractAmount = value; this.SetValue(Consts.F_ContractAmount, true); }
        }

        private string _ContractAmountBig;
        [SqlColumn(Consts.F_ContractAmountBig)]
        public string ContractAmountBig
        {
            get { return this._ContractAmountBig; }
            set { this._ContractAmountBig = value; this.SetValue(Consts.F_ContractAmountBig, true); }
        }

        private string _DeliveryTime;
        [SqlColumn(Consts.F_DeliveryTime)]
        public string DeliveryTime
        {
            get { return this._DeliveryTime; }
            set { this._DeliveryTime = value; this.SetValue(Consts.F_DeliveryTime, true); }
        }


        private string _QA;
        [SqlColumn(Consts.F_QA)]
        public string QA
        {
            get { return this._QA; }
            set { this._QA = value; this.SetValue(Consts.F_QA, true); }
        }


        private string _DeliveryWay;
        [SqlColumn(Consts.F_DeliveryWay)]
        public string DeliveryWay
        {
            get { return this._DeliveryWay; }
            set { this._DeliveryWay = value; this.SetValue(Consts.F_DeliveryWay, true); }
        }

        private string _PayWay;
        [SqlColumn(Consts.F_PayWay)]
        public string PayWay
        {
            get { return this._PayWay; }
            set { this._PayWay = value; this.SetValue(Consts.F_PayWay, true); }
        }

        private string _OtherNote;
        [SqlColumn(Consts.F_OtherNote)]
        public string OtherNote
        {
            get { return this._OtherNote; }
            set { this._OtherNote = value; this.SetValue(Consts.F_OtherNote, true); }
        }

        private string _Remarks;
        [SqlColumn(Consts.F_Remarks)]
        public string Remarks
        {
            get { return this._Remarks; }
            set { this._Remarks = value; this.SetValue(Consts.F_Remarks, true); }
        }

        private string _PurUserCode;
        [SqlColumn(Consts.F_PurUserCode)]
        public string PurUserCode
        {
            get { return this._PurUserCode; }
            set { this._PurUserCode = value; this.SetValue(Consts.F_PurUserCode, true); }
        }

        private string _PurUserName;
        [SqlColumn(Consts.F_PurUserName)]
        public string PurUserName
        {
            get { return this._PurUserName; }
            set { this._PurUserName = value; this.SetValue(Consts.F_PurUserName, true); }
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


        private decimal _PaidAmount;
        [SqlColumn(Consts.F_PaidAmount)]
        public decimal PaidAmount
        {
            get { return this._PaidAmount; }
            set { this._PaidAmount = value; this.SetValue(Consts.F_PaidAmount, true); }
        }


        private string _IsStorage;
        [SqlColumn(Consts.F_IsStorage)]
        public string IsStorage
        {
            get { return this._IsStorage; }
            set { this._IsStorage = value; this.SetValue(Consts.F_IsStorage, true); }
        }


        private DateTime _CreateTime;
        [SqlColumn(Consts.F_CreateTime)]
        public DateTime CreateTime
        {
            get { return this._CreateTime; }
            set { this._CreateTime = value; this.SetValue(Consts.F_CreateTime, true); }
        }

        private string _DETAILEDINFO;
        [SqlColumn(Consts.F_DETAILEDINFO)]
        public string DETAILEDINFO
        {
            get { return this._DETAILEDINFO; }
            set { this._DETAILEDINFO = value; this.SetValue(Consts.F_DETAILEDINFO, true); }
        }
        private string _ContractCodeA;
        [SqlColumn(Consts.F_ContractCodeA)]
        public string ContractCodeA
        {
            get { return this._ContractCodeA; }
            set { this._ContractCodeA = value; this.SetValue(Consts.F_ContractCodeA, true); }
        }
       
    }
}
