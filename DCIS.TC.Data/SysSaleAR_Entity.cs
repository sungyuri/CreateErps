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
    [SqlTable("SysSaleAR")]
   public class SysSaleAR_Entity:BaseEntity
    {
        public sealed class Consts
        {

            public const string F_ARID = "ARID";
            public const string F_BillNo = "BillNo";
            public const string F_ARName = "ARName";
            public const string F_ARWAY = "ARWAY";
            public const string F_TotalAmount = "TotalAmount";
            public const string F_PayAmount = "PayAmount";
            public const string F_PaidAmount = "PaidAmount";
            public const string F_Remarks = "Remarks";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysSaleAR_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysSaleAR_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysSaleAR_Entity(int aRID, string connectionKey)
            : base(connectionKey)
        {
            this.ARID = aRID;
            this.SelectByPKeys();
        }


        //ARID, BillNo, ARName, ARWAY, TotalAmount, PayAmount, PaidAmount, Remarks
        private int _ARID;
        [SqlColumn(Consts.F_ARID, true)]
        public int ARID
        {
            get { return this._ARID; }
            set { this._ARID = value; this.SetValue(Consts.F_ARID, true); }
        }

        private string _BillNo;
        [SqlColumn(Consts.F_BillNo)]
        public string BillNo
        {
            get { return this._BillNo; }
            set { this._BillNo = value; this.SetValue(Consts.F_BillNo, true); }
        }


        private string _ARName;
        [SqlColumn(Consts.F_ARName)]
        public string ARName
        {
            get { return this._ARName; }
            set { this._ARName = value; this.SetValue(Consts.F_ARName, true); }
        }

        private string _ARWAY;
        [SqlColumn(Consts.F_ARWAY)]
        public string ARWAY
        {
            get { return this._ARWAY; }
            set { this._ARWAY = value; this.SetValue(Consts.F_ARWAY, true); }
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

        private decimal _PaidAmount;
        [SqlColumn(Consts.F_PaidAmount)]
        public decimal PaidAmount
        {
            get { return this._PaidAmount; }
            set { this._PaidAmount = value; this.SetValue(Consts.F_PaidAmount, true); }
        }

        private string _Remarks;
        [SqlColumn(Consts.F_Remarks)]
        public string Remarks
        {
            get { return this._Remarks; }
            set { this._Remarks = value; this.SetValue(Consts.F_Remarks, true); }
        }
    }
}
