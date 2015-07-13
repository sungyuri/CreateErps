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
    [SqlTable("SysCustomer")]
    public class SysCustomer_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_CustomerNo = "CustomerNo";
            public const string F_CustomerName = "CustomerName";
            public const string F_CPerson = "CPerson";
            public const string F_CPhone = "CPhone";
            public const string F_CTelPhone = "CTelPhone";
            public const string F_CFAX = "CFAX";
            public const string F_ADRESS = "ADRESS";
            public const string F_AreaCode = "AreaCode";
            public const string F_Email = "Email";
            public const string F_Tariff = "Tariff";
            public const string F_BANK = "BANK";
            public const string F_BANKNO = "BANKNO";
            public const string F_Remarks = "Remarks";

        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysCustomer_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysCustomer_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysCustomer_Entity(int customerNo,  string connectionKey)
            : base(connectionKey)
        {
            this.CustomerNo = customerNo;
            this.SelectByPKeys();
        }


        private int _CustomerNo;
        [SqlColumn(Consts.F_CustomerNo, true)]
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

        private string _CPerson;
        [SqlColumn(Consts.F_CPerson)]
        public string CPerson
        {
            get { return this._CPerson; }
            set { this._CPerson = value; this.SetValue(Consts.F_CPerson, true); }
        }

        private string _CPhone;
        [SqlColumn(Consts.F_CPhone)]
        public string CPhone
        {
            get { return this._CPhone; }
            set { this._CPhone = value; this.SetValue(Consts.F_CPhone, true); }
        }

        private string _CTelPhone;
        [SqlColumn(Consts.F_CTelPhone)]
        public string CTelPhone
        {
            get { return this._CTelPhone; }
            set { this._CTelPhone = value; this.SetValue(Consts.F_CTelPhone, true); }
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

        private string _CFAX;
        [SqlColumn(Consts.F_CFAX)]
        public string CFAX
        {
            get { return this._CFAX; }
            set { this._CFAX = value; this.SetValue(Consts.F_CFAX, true); }
        }
        private string _ADRESS;
        [SqlColumn(Consts.F_ADRESS)]
        public string ADRESS
        {
            get { return this._ADRESS; }
            set { this._ADRESS = value; this.SetValue(Consts.F_ADRESS, true); }
        }

        private int _AreaCode;
        [SqlColumn(Consts.F_AreaCode)]
        public int AreaCode
        {
            get { return this._AreaCode; }
            set { this._AreaCode = value; this.SetValue(Consts.F_AreaCode, true); }
        }


        private string _Email;
        [SqlColumn(Consts.F_Email)]
        public string Email
        {
            get { return this._Email; }
            set { this._Email = value; this.SetValue(Consts.F_Email, true); }
        }

        private string _Tariff;
        [SqlColumn(Consts.F_Tariff)]
        public string Tariff
        {
            get { return this._Tariff; }
            set { this._Tariff = value; this.SetValue(Consts.F_Tariff, true); }
        }

    }
}