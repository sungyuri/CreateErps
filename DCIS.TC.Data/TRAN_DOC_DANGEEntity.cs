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
    [SqlTable("TRAN_DOC_DANGE")]
   public   class TRAN_DOC_DANGEEntity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_TRAN_DOC_NUMBER = "TRAN_DOC_NUMBER";
            public const string F_MCV_NUMBER = "MCV_NUMBER";
            public const string F_DCLASS = "DCLASS";
            public const string F_PACKAGE_KIND_NUMBER = "PACKAGE_KIND_NUMBER";
            public const string F_PROPER_SHIP_NAME = "PROPER_SHIP_NAME";
            public const string F_UN_NUMBER = "UN_NUMBER";
            public const string F_PACK_GROUP = "PACK_GROUP";
            public const string F_SUBSIDIARY_RISK = "SUBSIDIARY_RISK";
            public const string F_FLASH_POINT = "FLASH_POINT";
            public const string F_MARINE_POLLUTANT = "MARINE_POLLUTANT";
            public const string F_GORSS_NET_WEIGHT = "GORSS_NET_WEIGHT";
            public const string F_EMS = "EMS";
            public const string F_STOWAGE_POSITION = "STOWAGE_POSITION";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_DANGEEntity()
            : base()
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_DANGEEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_DANGEEntity(string schedule_id, string connectionKey)
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

        private string _TRAN_DOC_NUMBER;
        [SqlColumn(Consts.F_TRAN_DOC_NUMBER)]
        public string TRAN_DOC_NUMBER
        {
            get { return this._TRAN_DOC_NUMBER; }
            set { this._TRAN_DOC_NUMBER = value; this.SetValue(Consts.F_TRAN_DOC_NUMBER, true); }
        }

        private string _MCV_NUMBER;
        [SqlColumn(Consts.F_MCV_NUMBER)]
        public string MCV_NUMBER
        {
            get { return this._MCV_NUMBER; }
            set { this._MCV_NUMBER = value; this.SetValue(Consts.F_MCV_NUMBER, true); }
        }

        private string _PACKAGE_KIND_NUMBER;
        [SqlColumn(Consts.F_PACKAGE_KIND_NUMBER)]
        public string PACKAGE_KIND_NUMBER
        {
            get { return this._PACKAGE_KIND_NUMBER; }
            set { this._PACKAGE_KIND_NUMBER = value; this.SetValue(Consts.F_PACKAGE_KIND_NUMBER, true); }
        }

        private string _PROPER_SHIP_NAME;
        [SqlColumn(Consts.F_PROPER_SHIP_NAME)]
        public string PROPER_SHIP_NAME
        {
            get { return this._PROPER_SHIP_NAME; }
            set { this._PROPER_SHIP_NAME = value; this.SetValue(Consts.F_PROPER_SHIP_NAME, true); }
        }

        private string _DCLASS;
        [SqlColumn(Consts.F_DCLASS)]
        public string DCLASS
        {
            get { return this._DCLASS; }
            set { this._DCLASS = value; this.SetValue(Consts.F_DCLASS, true); }
        }

        private string _UN_NUMBER;
        [SqlColumn(Consts.F_UN_NUMBER)]
        public string UN_NUMBER
        {
            get { return this._UN_NUMBER; }
            set { this._UN_NUMBER = value; this.SetValue(Consts.F_UN_NUMBER, true); }
        }

        private string _PACK_GROUP;
        [SqlColumn(Consts.F_PACK_GROUP)]
        public string PACK_GROUP
        {
            get { return this._PACK_GROUP; }
            set { this._PACK_GROUP = value; this.SetValue(Consts.F_PACK_GROUP, true); }
        }

        private string _SUBSIDIARY_RISK;
        [SqlColumn(Consts.F_SUBSIDIARY_RISK)]
        public string SUBSIDIARY_RISK
        {
            get { return this._SUBSIDIARY_RISK; }
            set { this._SUBSIDIARY_RISK = value; this.SetValue(Consts.F_SUBSIDIARY_RISK, true); }
        }

        private string _FLASH_POINT;
        [SqlColumn(Consts.F_FLASH_POINT)]
        public string FLASH_POINT
        {
            get { return this._FLASH_POINT; }
            set { this._FLASH_POINT = value; this.SetValue(Consts.F_FLASH_POINT, true); }
        }

        private decimal _MARINE_POLLUTANT;
        [SqlColumn(Consts.F_MARINE_POLLUTANT)]
        public decimal MARINE_POLLUTANT
        {
            get { return this._MARINE_POLLUTANT; }
            set { this._MARINE_POLLUTANT = value; this.SetValue(Consts.F_MARINE_POLLUTANT, true); }
        }

        private decimal _GORSS_NET_WEIGHT;
        [SqlColumn(Consts.F_GORSS_NET_WEIGHT)]
        public decimal GORSS_NET_WEIGHT
        {
            get { return this._GORSS_NET_WEIGHT; }
            set { this._GORSS_NET_WEIGHT = value; this.SetValue(Consts.F_GORSS_NET_WEIGHT, true); }
        }

        private string _EMS;
        [SqlColumn(Consts.F_EMS)]
        public string EMS
        {
            get { return this._EMS; }
            set { this._EMS = value; this.SetValue(Consts.F_EMS, true); }
        }

        private string _STOWAGE_POSITION;
        [SqlColumn(Consts.F_STOWAGE_POSITION)]
        public string STOWAGE_POSITION
        {
            get { return this._STOWAGE_POSITION; }
            set { this._STOWAGE_POSITION = value; this.SetValue(Consts.F_STOWAGE_POSITION, true); }
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
