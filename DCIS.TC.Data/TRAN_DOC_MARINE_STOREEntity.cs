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
    [SqlTable("TRAN_DOC_MARINE_STORE")]
   public class TRAN_DOC_MARINE_STOREEntity:BaseEntity
    {
         public sealed class Consts
        {
             public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_STORE_TYPE = "STORE_TYPE";
            public const string F_STORE_NAME = "STORE_NAME";
            public const string F_STORE_QUENTITY = "STORE_QUENTITY";
            public const string F_QUENTITY_UNIT = "QUENTITY_UNIT";
            public const string F_STOWAGE_PLACE = "STOWAGE_PLACE";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_MARINE_STOREEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_MARINE_STOREEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_MARINE_STOREEntity(string schedule_id, string connectionKey)
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

        private string _STORE_TYPE;
        [SqlColumn(Consts.F_STORE_TYPE)]
        public string STORE_TYPE
        {
            get { return this._STORE_TYPE; }
            set { this._STORE_TYPE = value; this.SetValue(Consts.F_STORE_TYPE, true); }
        }

        private string _STORE_NAME;
        [SqlColumn(Consts.F_STORE_NAME)]
        public string STORE_NAME
        {
            get { return this._STORE_NAME; }
            set { this._STORE_NAME = value; this.SetValue(Consts.F_STORE_NAME, true); }
        }

        private decimal _STORE_QUENTITY;
        [SqlColumn(Consts.F_STORE_QUENTITY)]
        public decimal STORE_QUENTITY
        {
            get { return this._STORE_QUENTITY; }
            set { this._STORE_QUENTITY = value; this.SetValue(Consts.F_STORE_QUENTITY, true); }
        }

        private string _QUENTITY_UNIT;
        [SqlColumn(Consts.F_QUENTITY_UNIT)]
        public string QUENTITY_UNIT
        {
            get { return this._QUENTITY_UNIT; }
            set { this._QUENTITY_UNIT = value; this.SetValue(Consts.F_QUENTITY_UNIT, true); }
        }

        private string _STOWAGE_PLACE;
        [SqlColumn(Consts.F_STOWAGE_PLACE)]
        public string STOWAGE_PLACE
        {
            get { return this._STOWAGE_PLACE; }
            set { this._STOWAGE_PLACE = value; this.SetValue(Consts.F_STOWAGE_PLACE, true); }
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
