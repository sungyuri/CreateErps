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
    [SqlTable("TRAN_REACHPORT")]
  public  class TRAN_REACHPORTEntity:BaseEntity
    {
          public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";//SCHEDULE_ID
            public const string F_SHIP_NO = "SHIP_NO";
            public const string F_IMO = "IMO";
            public const string F_SHIP_NAME = "SHIP_NAME";
            public const string F_ENTER_NUMBER = "ENTER_NUMBER";
            public const string F_ABROAD_NUMBER = "ABROAD_NUMBER";
            public const string F_ARRIVAL_DATE = "ARRIVAL_DATE";
            public const string F_BERTH_CODE = "BERTH_CODE";
            public const string F_DEPARTURE_PORT_CODE = "DEPARTURE_PORT_CODE";
            public const string F_ARRIVAL_PORT_CODE = "ARRIVAL_PORT_CODE";
            public const string F_AGENT_CODE = "AGENT_CODE";
            public const string F_CONTEXT_NAME = "CONTEXT_NAME";
            public const string F_DECLARATION_DATE = "DECLARATION_DATE";
            public const string F_FREE_TEXT = "FREE_TEXT";
            public const string F_R_STATUE = "R_STATUE";//R_STATUE
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_REACHPORTEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_REACHPORTEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_REACHPORTEntity(string schedule_id, string connectionKey)
            : base(connectionKey)
        {
            this.SCHEDULE_ID = schedule_id;
            this.SelectByPKeys();
        }

        private string _SCHEDULE_ID;
        [SqlColumn(Consts.F_SCHEDULE_ID,true)]
        public string SCHEDULE_ID
        {
            get { return this._SCHEDULE_ID; }
            set { this._SCHEDULE_ID = value; this.SetValue(Consts.F_SCHEDULE_ID, true); }
        }
       

        private string _SHIP_NO;
        [SqlColumn(Consts.F_SHIP_NO)]
        public string SHIP_NO
        {
            get { return this._SHIP_NO; }
            set { this._SHIP_NO = value; this.SetValue(Consts.F_SHIP_NO, true); }
        }

        private string _IMO;
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get { return this._IMO; }
            set { this._IMO = value; this.SetValue(Consts.F_IMO, true); }
        }

        private string _SHIP_NAME;
        [SqlColumn(Consts.F_SHIP_NAME)]
        public string SHIP_NAME
        {
            get { return this._SHIP_NAME; }
            set { this._SHIP_NAME = value; this.SetValue(Consts.F_SHIP_NAME, true); }
        }

        private string _ENTER_NUMBER;
        [SqlColumn(Consts.F_ENTER_NUMBER)]
        public string ENTER_NUMBER
        {
            get { return this._ENTER_NUMBER; }
            set { this._ENTER_NUMBER = value; this.SetValue(Consts.F_ENTER_NUMBER, true); }
        }

        private string _ABROAD_NUMBER;
        [SqlColumn(Consts.F_ABROAD_NUMBER)]
        public string ABROAD_NUMBER
        {
            get { return this._ABROAD_NUMBER; }
            set { this._ABROAD_NUMBER = value; this.SetValue(Consts.F_ABROAD_NUMBER, true); }
        }

        private string _ARRIVAL_DATE;
        [SqlColumn(Consts.F_ARRIVAL_DATE)]
        public string ARRIVAL_DATE
        {
            get { return this._ARRIVAL_DATE; }
            set { this._ARRIVAL_DATE = value; this.SetValue(Consts.F_ARRIVAL_DATE, true); }
        }

        private string _BERTH_CODE;
        [SqlColumn(Consts.F_BERTH_CODE)]
        public string BERTH_CODE
        {
            get { return this._BERTH_CODE; }
            set { this._BERTH_CODE = value; this.SetValue(Consts.F_BERTH_CODE, true); }
        }

        private string _DEPARTURE_PORT_CODE;
        [SqlColumn(Consts.F_DEPARTURE_PORT_CODE)]
        public string DEPARTURE_PORT_CODE
        {
            get { return this._DEPARTURE_PORT_CODE; }
            set { this._DEPARTURE_PORT_CODE = value; this.SetValue(Consts.F_DEPARTURE_PORT_CODE, true); }
        }

        private string _ARRIVAL_PORT_CODE;
        [SqlColumn(Consts.F_ARRIVAL_PORT_CODE)]
        public string ARRIVAL_PORT_CODE
        {
            get { return this._ARRIVAL_PORT_CODE; }
            set { this._ARRIVAL_PORT_CODE = value; this.SetValue(Consts.F_ARRIVAL_PORT_CODE, true); }
        }

        private string _AGENT_CODE;
        [SqlColumn(Consts.F_AGENT_CODE)]
        public string AGENT_CODE
        {
            get { return this._AGENT_CODE; }
            set { this._AGENT_CODE = value; this.SetValue(Consts.F_AGENT_CODE, true); }
        }

        private string _CONTEXT_NAME;
        [SqlColumn(Consts.F_CONTEXT_NAME)]
        public string CONTEXT_NAME
        {
            get { return this._CONTEXT_NAME; }
            set { this._CONTEXT_NAME = value; this.SetValue(Consts.F_CONTEXT_NAME, true); }
        }

        private decimal _DECLARATION_DATE;
        [SqlColumn(Consts.F_DECLARATION_DATE)]
        public decimal DECLARATION_DATE
        {
            get { return this._DECLARATION_DATE; }
            set { this._DECLARATION_DATE = value; this.SetValue(Consts.F_DECLARATION_DATE, true); }
        }

        private string _FREE_TEXT;
        [SqlColumn(Consts.F_FREE_TEXT)]
        public string FREE_TEXT
        {
            get { return this._FREE_TEXT; }
            set { this._FREE_TEXT = value; this.SetValue(Consts.F_FREE_TEXT, true); }
        
        }


     

        private string _R_STATUE;
        [SqlColumn(Consts.F_R_STATUE)]
        public string R_STATUE
        {
            get { return this._R_STATUE; }
            set { this._R_STATUE = value; this.SetValue(Consts.F_R_STATUE, true); }
        }
    }
}
