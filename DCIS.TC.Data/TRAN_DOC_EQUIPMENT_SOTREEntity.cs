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
    [SqlTable("TRAN_DOC_EQUIPMENT_SOTRE")]
   public class TRAN_DOC_EQUIPMENT_SOTREEntity:BaseEntity
    {
          public sealed class Consts
        {
              public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_EQUIPMENT_NUMBER = "EQUIPMENT_NUMBER";
            public const string F_EQUIPMENT_SIZE_TYPE = "EQUIPMENT_SIZE_TYPE";
            public const string F_CONTAINER_NUMBER = "CONTAINER_NUMBER";
            public const string F_SEAL_NUMBER = "SEAL_NUMBER";
            public const string F_CARGO_DESCRIPTION = "CARGO_DESCRIPTION";
            public const string F_GORSS_WEIGHT = "GORSS_WEIGHT";
            public const string F_CONSIGNEE_NAME = "CONSIGNEE_NAME";
            public const string F_CONSIGNOR_NAME = "CONSIGNOR_NAME";
            public const string F_LOAD_PLACE_CODE = "LOAD_PLACE_CODE";
            public const string F_DISCHARGE_PLACE_CODE = "DISCHARGE_PLACE_CODE";
            public const string F_FREE_TEXT = "FREE_TEXT";
            public const string F_TRAN_DOC_NUMBER = "TRAN_DOC_NUMBER";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_EQUIPMENT_SOTREEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_EQUIPMENT_SOTREEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_EQUIPMENT_SOTREEntity(string schedule_id, string connectionKey)
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

        private string _EQUIPMENT_NUMBER;
        [SqlColumn(Consts.F_EQUIPMENT_NUMBER)]
        public string EQUIPMENT_NUMBER
        {
            get { return this._EQUIPMENT_NUMBER; }
            set { this._EQUIPMENT_NUMBER = value; this.SetValue(Consts.F_EQUIPMENT_NUMBER, true); }
        }

        private string _EQUIPMENT_SIZE_TYPE;
        [SqlColumn(Consts.F_EQUIPMENT_SIZE_TYPE)]
        public string EQUIPMENT_SIZE_TYPE
        {
            get { return this._EQUIPMENT_SIZE_TYPE; }
            set { this._EQUIPMENT_SIZE_TYPE = value; this.SetValue(Consts.F_EQUIPMENT_SIZE_TYPE, true); }
        }

        private decimal _CONTAINER_NUMBER;
        [SqlColumn(Consts.F_CONTAINER_NUMBER)]
        public decimal CONTAINER_NUMBER
        {
            get { return this._CONTAINER_NUMBER; }
            set { this._CONTAINER_NUMBER = value; this.SetValue(Consts.F_CONTAINER_NUMBER, true); }
        }

        private string _SEAL_NUMBER;
        [SqlColumn(Consts.F_SEAL_NUMBER)]
        public string SEAL_NUMBER
        {
            get { return this._SEAL_NUMBER; }
            set { this._SEAL_NUMBER = value; this.SetValue(Consts.F_SEAL_NUMBER, true); }
        }

        private string _CARGO_DESCRIPTION;
        [SqlColumn(Consts.F_CARGO_DESCRIPTION)]
        public string CARGO_DESCRIPTION
        {
            get { return this._CARGO_DESCRIPTION; }
            set { this._CARGO_DESCRIPTION = value; this.SetValue(Consts.F_CARGO_DESCRIPTION, true); }
        }

        private decimal _GORSS_WEIGHT;
        [SqlColumn(Consts.F_GORSS_WEIGHT)]
        public decimal GORSS_WEIGHT
        {
            get { return this._GORSS_WEIGHT; }
            set { this._GORSS_WEIGHT = value; this.SetValue(Consts.F_GORSS_WEIGHT, true); }
        }

        private string _CONSIGNEE_NAME;
        [SqlColumn(Consts.F_CONSIGNEE_NAME)]
        public string CONSIGNEE_NAME
        {
            get { return this._CONSIGNEE_NAME; }
            set { this._CONSIGNEE_NAME = value; this.SetValue(Consts.F_CONSIGNEE_NAME, true); }
        }

        private string _CONSIGNOR_NAME;
        [SqlColumn(Consts.F_CONSIGNOR_NAME)]
        public string CONSIGNOR_NAME
        {
            get { return this._CONSIGNOR_NAME; }
            set { this._CONSIGNOR_NAME = value; this.SetValue(Consts.F_CONSIGNOR_NAME, true); }
        }

        private string _LOAD_PLACE_CODE;
        [SqlColumn(Consts.F_LOAD_PLACE_CODE)]
        public string LOAD_PLACE_CODE
        {
            get { return this._LOAD_PLACE_CODE; }
            set { this._LOAD_PLACE_CODE = value; this.SetValue(Consts.F_LOAD_PLACE_CODE, true); }
        }

        private string _DISCHARGE_PLACE_CODE;
        [SqlColumn(Consts.F_DISCHARGE_PLACE_CODE)]
        public string DISCHARGE_PLACE_CODE
        {
            get { return this._DISCHARGE_PLACE_CODE; }
            set { this._DISCHARGE_PLACE_CODE = value; this.SetValue(Consts.F_DISCHARGE_PLACE_CODE, true); }
        }

        private string _FREE_TEXT;
        [SqlColumn(Consts.F_FREE_TEXT)]
        public string FREE_TEXT
        {
            get { return this._FREE_TEXT; }
            set { this._FREE_TEXT = value; this.SetValue(Consts.F_FREE_TEXT, true); }
        }

        private string _TRAN_DOC_NUMBER;
        [SqlColumn(Consts.F_TRAN_DOC_NUMBER)]
        public string TRAN_DOC_NUMBER
        {
            get { return this._TRAN_DOC_NUMBER; }
            set { this._TRAN_DOC_NUMBER = value; this.SetValue(Consts.F_TRAN_DOC_NUMBER, true); }
        }
    }
}
