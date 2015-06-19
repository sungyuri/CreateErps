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
    [SqlTable("TRAN_DOC_GOODS_REPORT")]
   public class TRAN_DOC_GOODS_REPORTEntity:BaseEntity
    {
           public sealed class Consts
        {
               public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_LOADING_PLACE_CODE = "LOADING_PLACE_CODE";
            public const string F_DISCHARGE_PLACE_CODE = "DISCHARGE_PLACE_CODE";
            public const string F_SHIP_MARK = "SHIP_MARK";
            public const string F_GOODS_TYPE = "GOODS_TYPE";
            public const string F_EQUIPMENT_SIZE_TYPE = "EQUIPMENT_SIZE_TYPE";
            public const string F_EQUIPMENT_LOADED_STATUS = "EQUIPMENT_LOADED_STATUS";
            public const string F_PACKAGE_TYPE = "PACKAGE_TYPE";
            public const string F_GOODS_TOTAL_NUMBER = "GOODS_TOTAL_NUMBER";
            public const string F_CARGO_DISCRIPTION = "CARGO_DISCRIPTION";
            public const string F_GROSS_WEIGHT = "GROSS_WEIGHT";
            public const string F_QUENTITY_UNIT = "QUENTITY_UNIT";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_GOODS_REPORTEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_GOODS_REPORTEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_GOODS_REPORTEntity(string schedule_id, string connectionKey)
            : base(connectionKey)
        {
            this.SCHEDULE_ID = schedule_id;
            this.SelectByPKeys();
        }

        private string _SCHEDULE_ID;
        [SqlColumn(Consts.F_SCHEDULE_ID, true)]
        public string SCHEDULE_ID
        {
            get { return this._SCHEDULE_ID; }
            set { this._SCHEDULE_ID = value; this.SetValue(Consts.F_SCHEDULE_ID, true); }
        }

        private decimal _SEQUENCE_NUMBER;
        [SqlColumn(Consts.F_SEQUENCE_NUMBER)]
        public decimal SEQUENCE_NUMBER
        {
            get { return this._SEQUENCE_NUMBER; }
            set { this._SEQUENCE_NUMBER = value; this.SetValue(Consts.F_SEQUENCE_NUMBER, true); }
        }

        private string _LOADING_PLACE_CODE;
        [SqlColumn(Consts.F_LOADING_PLACE_CODE)]
        public string LOADING_PLACE_CODE
        {
            get { return this._LOADING_PLACE_CODE; }
            set { this._LOADING_PLACE_CODE = value; this.SetValue(Consts.F_LOADING_PLACE_CODE, true); }
        }

        private string _DISCHARGE_PLACE_CODE;
        [SqlColumn(Consts.F_DISCHARGE_PLACE_CODE)]
        public string DISCHARGE_PLACE_CODE
        {
            get { return this._DISCHARGE_PLACE_CODE; }
            set { this._DISCHARGE_PLACE_CODE = value; this.SetValue(Consts.F_DISCHARGE_PLACE_CODE, true); }
        }

        private string _SHIP_MARK;
        [SqlColumn(Consts.F_SHIP_MARK)]
        public string SHIP_MARK
        {
            get { return this._SHIP_MARK; }
            set { this._SHIP_MARK = value; this.SetValue(Consts.F_SHIP_MARK, true); }
        }

        private string _GOODS_TYPE;
        [SqlColumn(Consts.F_GOODS_TYPE)]
        public string GOODS_TYPE
        {
            get { return this._GOODS_TYPE; }
            set { this._GOODS_TYPE = value; this.SetValue(Consts.F_GOODS_TYPE, true); }
        }

        private string _EQUIPMENT_SIZE_TYPE;
        [SqlColumn(Consts.F_EQUIPMENT_SIZE_TYPE)]
        public string EQUIPMENT_SIZE_TYPE
        {
            get { return this._EQUIPMENT_SIZE_TYPE; }
            set { this._EQUIPMENT_SIZE_TYPE = value; this.SetValue(Consts.F_EQUIPMENT_SIZE_TYPE, true); }
        }

        private decimal _EQUIPMENT_LOADED_STATUS;
        [SqlColumn(Consts.F_EQUIPMENT_LOADED_STATUS)]
        public decimal EQUIPMENT_LOADED_STATUS
        {
            get { return this._EQUIPMENT_LOADED_STATUS; }
            set { this._EQUIPMENT_LOADED_STATUS = value; this.SetValue(Consts.F_EQUIPMENT_LOADED_STATUS, true); }
        }

        private string _PACKAGE_TYPE;
        [SqlColumn(Consts.F_PACKAGE_TYPE)]
        public string PACKAGE_TYPE
        {
            get { return this._PACKAGE_TYPE; }
            set { this._PACKAGE_TYPE = value; this.SetValue(Consts.F_PACKAGE_TYPE, true); }
        }

        private decimal _GOODS_TOTAL_NUMBER;
        [SqlColumn(Consts.F_GOODS_TOTAL_NUMBER)]
        public decimal GOODS_TOTAL_NUMBER
        {
            get { return this._GOODS_TOTAL_NUMBER; }
            set { this._GOODS_TOTAL_NUMBER = value; this.SetValue(Consts.F_GOODS_TOTAL_NUMBER, true); }
        }

        private string _CARGO_DISCRIPTION;
        [SqlColumn(Consts.F_CARGO_DISCRIPTION)]
        public string CARGO_DISCRIPTION
        {
            get { return this._CARGO_DISCRIPTION; }
            set { this._CARGO_DISCRIPTION = value; this.SetValue(Consts.F_CARGO_DISCRIPTION, true); }
        }

        private decimal _GROSS_WEIGHT;
        [SqlColumn(Consts.F_GROSS_WEIGHT)]
        public decimal GROSS_WEIGHT
        {
            get { return this._GROSS_WEIGHT; }
            set { this._GROSS_WEIGHT = value; this.SetValue(Consts.F_GROSS_WEIGHT, true); }
        }

        private string _QUENTITY_UNIT;
        [SqlColumn(Consts.F_QUENTITY_UNIT)]
        public string QUENTITY_UNIT
        {
            get { return this._QUENTITY_UNIT; }
            set { this._QUENTITY_UNIT = value; this.SetValue(Consts.F_QUENTITY_UNIT, true); }
        }

        private string _FREE_TEXT;
        [SqlColumn(Consts.F_FREE_TEXT)]
        public string FREE_TEXT
        {
            get { return this._FREE_TEXT; }
            set { this._FREE_TEXT = value; this.SetValue(Consts.F_FREE_TEXT, true); }
        }
    }
}
