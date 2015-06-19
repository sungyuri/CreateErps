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
    [SqlTable("TRAN_DOC_EMPTY_BOX")]
   public class TRAN_DOC_EMPTY_BOXEntity:BaseEntity
    {
         public sealed class Consts 
        {
                public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_CROSS_BORDER_SHIP = "CROSS_BORDER_SHIP";
            public const string F_CROSS_BORDER_VOYAGE = "CROSS_BORDER_VOYAGE";
            public const string F_CROSS_BORDER_DATE = "CROSS_BORDER_DATE";
            public const string F_EQUIPMENT_NUMBER = "EQUIPMENT_NUMBER";
            public const string F_EQUIPMENT_SIZE_TYPE = "EQUIPMENT_SIZE_TYPE";
            public const string F_LOAD_PLACE_CODE = "LOAD_PLACE_CODE";
            public const string F_DISCHARG_PLACE_CODE = "DISCHARG_PLACE_CODE";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_EMPTY_BOXEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_EMPTY_BOXEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_EMPTY_BOXEntity(string schedule_id, string connectionKey)
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

        private string _CROSS_BORDER_SHIP;
        [SqlColumn(Consts.F_CROSS_BORDER_SHIP)]
        public string CROSS_BORDER_SHIP
        {
            get { return this._CROSS_BORDER_SHIP; }
            set { this._CROSS_BORDER_SHIP = value; this.SetValue(Consts.F_CROSS_BORDER_SHIP, true); }
        }

        private string _CROSS_BORDER_VOYAGE;
        [SqlColumn(Consts.F_CROSS_BORDER_VOYAGE)]
        public string CROSS_BORDER_VOYAGE
        {
            get { return this._CROSS_BORDER_VOYAGE; }
            set { this._CROSS_BORDER_VOYAGE = value; this.SetValue(Consts.F_CROSS_BORDER_VOYAGE, true); }
        }

        private string _CROSS_BORDER_DATE;
        [SqlColumn(Consts.F_CROSS_BORDER_DATE)]
        public string CROSS_BORDER_DATE
        {
            get { return this._CROSS_BORDER_DATE; }
            set { this._CROSS_BORDER_DATE = value; this.SetValue(Consts.F_CROSS_BORDER_DATE, true); }
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

        private string _LOAD_PLACE_CODE;
        [SqlColumn(Consts.F_LOAD_PLACE_CODE)]
        public string LOAD_PLACE_CODE
        {
            get { return this._LOAD_PLACE_CODE; }
            set { this._LOAD_PLACE_CODE = value; this.SetValue(Consts.F_LOAD_PLACE_CODE, true); }
        }

        private string _DISCHARG_PLACE_CODE;
        [SqlColumn(Consts.F_DISCHARG_PLACE_CODE)]
        public string DISCHARG_PLACE_CODE
        {
            get { return this._DISCHARG_PLACE_CODE; }
            set { this._DISCHARG_PLACE_CODE = value; this.SetValue(Consts.F_DISCHARG_PLACE_CODE, true); }
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
