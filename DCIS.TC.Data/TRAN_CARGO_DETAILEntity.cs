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
    [SqlTable("TRAN_CARGO_DETAIL")]
   public class TRAN_CARGO_DETAILEntity:BaseEntity
    {
          public sealed class Consts
        {
            public const string F_ID = "ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_MATERIEL_CODE = "MATERIEL_CODE";
            public const string F_MATERIEL_NAME = "MATERIEL_NAME";
            public const string F_DECLARED_QUANTITY = "DECLARED_QUANTITY";
            public const string F_ACTUAL_QUANTITY = "ACTUAL_QUANTITY";
            public const string F_QUANTITY_UNIT = "QUANTITY_UNIT";
            public const string F_AMOUNT = "AMOUNT";
            public const string F_VALUE = "VALUE";
            public const string F_CURRENCY_CODE = "CURRENCY_CODE";
            public const string F_FREE_TEXT = "FREE_TEXT";
            public const string F_WEIGHT = "WEIGHT";
            public const string F_ORIGIN_COUNTRY_CODE = "ORIGIN_COUNTRY_CODE";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_CARGO_DETAILEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_CARGO_DETAILEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_CARGO_DETAILEntity(string id, string connectionKey)
            : base(connectionKey)
        {
            this.ID = id;
            this.SelectByPKeys();
        }

        private string _ID;
        [SqlColumn(Consts.F_ID,true)]
        public string ID
        {
            get { return this._ID; }
            set { this._ID = value; this.SetValue(Consts.F_ID, true); }
        }

        private decimal _SEQUENCE_NUMBER;
        [SqlColumn(Consts.F_SEQUENCE_NUMBER)]
        public decimal SEQUENCE_NUMBER
        {
            get { return this._SEQUENCE_NUMBER; }
            set { this._SEQUENCE_NUMBER = value; this.SetValue(Consts.F_SEQUENCE_NUMBER, true); }
        }

        private string _MATERIEL_CODE;
        [SqlColumn(Consts.F_MATERIEL_CODE)]
        public string MATERIEL_CODE
        {
            get { return this._MATERIEL_CODE; }
            set { this._MATERIEL_CODE = value; this.SetValue(Consts.F_MATERIEL_CODE, true); }
        }

        private string _MATERIEL_NAME;
        [SqlColumn(Consts.F_MATERIEL_NAME)]
        public string MATERIEL_NAME
        {
            get { return this._MATERIEL_NAME; }
            set { this._MATERIEL_NAME = value; this.SetValue(Consts.F_MATERIEL_NAME, true); }
        }

        private decimal _DECLARED_QUANTITY;
        [SqlColumn(Consts.F_DECLARED_QUANTITY)]
        public decimal DECLARED_QUANTITY
        {
            get { return this._DECLARED_QUANTITY; }
            set { this._DECLARED_QUANTITY = value; this.SetValue(Consts.F_DECLARED_QUANTITY, true); }
        }

        private decimal _ACTUAL_QUANTITY;
        [SqlColumn(Consts.F_ACTUAL_QUANTITY)]
        public decimal ACTUAL_QUANTITY
        {
            get { return this._ACTUAL_QUANTITY; }
            set { this._ACTUAL_QUANTITY = value; this.SetValue(Consts.F_ACTUAL_QUANTITY, true); }
        }

        private string _QUANTITY_UNIT;
        [SqlColumn(Consts.F_QUANTITY_UNIT)]
        public string QUANTITY_UNIT
        {
            get { return this._QUANTITY_UNIT; }
            set { this._QUANTITY_UNIT = value; this.SetValue(Consts.F_QUANTITY_UNIT, true); }
        }

        private decimal _AMOUNT;
        [SqlColumn(Consts.F_AMOUNT)]
        public decimal AMOUNT
        {
            get { return this._AMOUNT; }
            set { this._AMOUNT = value; this.SetValue(Consts.F_AMOUNT, true); }
        }

        private decimal _VALUE;
        [SqlColumn(Consts.F_VALUE)]
        public decimal VALUE
        {
            get { return this._VALUE; }
            set { this._VALUE = value; this.SetValue(Consts.F_VALUE, true); }
        }

        private string _CURRENCY_CODE;
        [SqlColumn(Consts.F_CURRENCY_CODE)]
        public string CURRENCY_CODE
        {
            get { return this._CURRENCY_CODE; }
            set { this._CURRENCY_CODE = value; this.SetValue(Consts.F_CURRENCY_CODE, true); }
        }

        private string _FREE_TEXT;
        [SqlColumn(Consts.F_FREE_TEXT)]
        public string FREE_TEXT
        {
            get { return this._FREE_TEXT; }
            set { this._FREE_TEXT = value; this.SetValue(Consts.F_FREE_TEXT, true); }
        }

        private decimal _WEIGHT;
        [SqlColumn(Consts.F_WEIGHT)]
        public decimal WEIGHT
        {
            get { return this._WEIGHT; }
            set { this._WEIGHT = value; this.SetValue(Consts.F_WEIGHT, true); }
        }

        private string _ORIGIN_COUNTRY_CODE;
        [SqlColumn(Consts.F_ORIGIN_COUNTRY_CODE)]
        public string ORIGIN_COUNTRY_CODE
        {
            get { return this._ORIGIN_COUNTRY_CODE; }
            set { this._ORIGIN_COUNTRY_CODE = value; this.SetValue(Consts.F_ORIGIN_COUNTRY_CODE, true); }
        }
    }
}
