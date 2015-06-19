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
    [SqlTable("TRAN_DOC_VOYAGE")]
   public class TRAN_DOC_VOYAGEEntity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_ITINERARY_CODE = "ITINERARY_CODE";
            public const string F_ARRIVAL_DATE = "ARRIVAL_DATE";
            public const string F_DEPARTURE_DATE = "DEPARTURE_DATE";
            public const string F_FREE_TEXT = "FREE_TEXT";

        }

              /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_VOYAGEEntity()
            : base()
        {
        }
        
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_VOYAGEEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_VOYAGEEntity(string schedule_id, string connectionKey)
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


        private string _ITINERARY_CODE;
        [SqlColumn(Consts.F_ITINERARY_CODE)]
        public string ITINERARY_CODE
        {
            get { return this._ITINERARY_CODE; }
            set { this._ITINERARY_CODE = value; this.SetValue(Consts.F_ITINERARY_CODE, true); }
        }

        private string _ARRIVAL_DATE;
        [SqlColumn(Consts.F_ARRIVAL_DATE)]
        public string ARRIVAL_DATE
        {
            get { return this._ARRIVAL_DATE; }
            set { this._ARRIVAL_DATE = value; this.SetValue(Consts.F_ARRIVAL_DATE, true); }
        }

        private string _DEPARTURE_DATE;
        [SqlColumn(Consts.F_DEPARTURE_DATE)]
        public string DEPARTURE_DATE
        {
            get { return this._DEPARTURE_DATE; }
            set { this._DEPARTURE_DATE = value; this.SetValue(Consts.F_DEPARTURE_DATE, true); }
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
