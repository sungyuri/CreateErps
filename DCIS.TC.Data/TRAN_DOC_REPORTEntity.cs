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
    [SqlTable("TRAN_DOC_REPORT")]
   public class TRAN_DOC_REPORTEntity:BaseEntity
    {
             /// <summary>
        /// 表字段字符串常量
        /// </summary>
        public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";//SCHEDULE_ID
            public const string F_SHIP_NO = "SHIP_NO";
            public const string F_IMO = "IMO";
            public const string F_IN_OUT_STATUE = "IN_OUT_STATUE";
            public const string F_IN_OUT_VOYAGE = "IN_OUT_VOYAGE";
            public const string F_DECLARATION_PLACE_CODE = "DECLARATION_PLACE_CODE";
            public const string F_CREW_NUMBER = "CREW_NUMBER";
            public const string F_PASSENGERS_NUMBER = "PASSENGERS_NUMBER";
            public const string F_GOVENMENT_PROC_CODE = "GOVENMENT_PROC_CODE";
            public const string F_CALL_PURPOSE = "CALL_PURPOSE";
            public const string F_OPERATOR_CODE = "OPERATOR_CODE";
            public const string F_OPERATOR_TYPE = "OPERATOR_TYPE";
            public const string F_AGENT_CODE = "AGENT_CODE";
            public const string F_CONTEXT_NAME = "CONTEXT_NAME";
            public const string F_DECLARATION_DATE = "DECLARATION_DATE";
            public const string F_FREE_TEXT = "FREE_TEXT";
            public const string F_ROUTE = "ROUTE";
            public const string F_IN_OUT_DATE = "IN_OUT_DATE";
            public const string F_AGENT_ADDRESS = "AGENT_ADDRESS";
            public const string F_CARGO_DRAFT = "CARGO_DRAFT";
            public const string F_R_STATUE = "R_STATUE";//R_STATUE
   
        }
        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_REPORTEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_REPORTEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="schedule_id">schedule_id</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_REPORTEntity(string schedule_id, string connectionKey)
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

        private string _IMO;
        /// <summary>
        /// F_IMO
        /// </summary>
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get
            {
                return this._IMO;
            }
            set
            {
                this._IMO = value;
                this.SetValue(Consts.F_IMO, true);
            }
        }

        private string _SHIP_NO;
        /// <summary>
        /// SHIP_NO
        /// </summary>
        [SqlColumn(Consts.F_SHIP_NO)]
        public string SHIP_NO
        {
            get
            {
                return this._SHIP_NO;
            }
            set
            {
                this._SHIP_NO = value;
                this.SetValue(Consts.F_SHIP_NO, true);
            }
        }

        private string _IN_OUT_STATUE;
        /// <summary>
        /// IN_OUT_STATUE
        /// </summary>
        [SqlColumn(Consts.F_IN_OUT_STATUE)]
        public string IN_OUT_STATUE
        {
            get
            {
                return this._IN_OUT_STATUE;
            }
            set
            {
                this._IN_OUT_STATUE = value;
                this.SetValue(Consts.F_IN_OUT_STATUE, true);
            }
        }

        private string _IN_OUT_VOYAGE;
        /// <summary>
        /// IN_OUT_VOYAGE
        /// </summary>
        [SqlColumn(Consts.F_IN_OUT_VOYAGE)]
        public string IN_OUT_VOYAGE
        {
            get
            {
                return this._IN_OUT_VOYAGE;
            }
            set
            {
                this._IN_OUT_VOYAGE = value;
                this.SetValue(Consts.F_IN_OUT_VOYAGE, true);
            }
        }

        private string _DECLARATION_PLACE_CODE;
        /// <summary>
        /// DECLARATION_PLACE_CODE
        /// </summary>
        [SqlColumn(Consts.F_DECLARATION_PLACE_CODE)]
        public string DECLARATION_PLACE_CODE
        {
            get
            {
                return this._DECLARATION_PLACE_CODE;
            }
            set
            {
                this._DECLARATION_PLACE_CODE = value;
                this.SetValue(Consts.F_DECLARATION_PLACE_CODE, true);
            }
        }

        private decimal _CREW_NUMBER;
        /// <summary>
        /// CREW_NUMBER
        /// </summary>
        [SqlColumn(Consts.F_CREW_NUMBER)]
        public decimal CREW_NUMBER
        {
            get
            {
                return this._CREW_NUMBER;
            }
            set
            {
                this._CREW_NUMBER = value;
                this.SetValue(Consts.F_CREW_NUMBER, true);
            }
        }

        private decimal _PASSENGERS_NUMBER;
        /// <summary>
        /// PASSENGERS_NUMBER
        /// </summary>
        [SqlColumn(Consts.F_PASSENGERS_NUMBER)]
        public decimal PASSENGERS_NUMBER
        {
            get
            {
                return this._PASSENGERS_NUMBER;
            }
            set
            {
                this._PASSENGERS_NUMBER = value;
                this.SetValue(Consts.F_PASSENGERS_NUMBER, true);
            }
        }

        private string _GOVENMENT_PROC_CODE;
        /// <summary>
        /// PASSENGERS_NUMBER
        /// </summary>
        [SqlColumn(Consts.F_GOVENMENT_PROC_CODE)]
        public string GOVENMENT_PROC_CODE
        {
            get
            {
                return this._GOVENMENT_PROC_CODE;
            }
            set
            {
                this._GOVENMENT_PROC_CODE = value;
                this.SetValue(Consts.F_GOVENMENT_PROC_CODE, true);
            }
        }

        private string _CALL_PURPOSE;
        /// <summary>
        /// _CALL_PURPOSE
        /// </summary>
        [SqlColumn(Consts.F_CALL_PURPOSE)]
        public string CALL_PURPOSE
        {
            get
            {
                return this._CALL_PURPOSE;
            }
            set
            {
                this._CALL_PURPOSE = value;
                this.SetValue(Consts.F_CALL_PURPOSE, true);
            }
        }

        private string _OPERATOR_CODE;
        /// <summary>
        /// _OPERATOR_CODE  
        /// </summary>
        [SqlColumn(Consts.F_OPERATOR_CODE)]
        public string OPERATOR_CODE
        {
            get
            {
                return this._OPERATOR_CODE;
            }
            set
            {
                this._OPERATOR_CODE = value;
                this.SetValue(Consts.F_OPERATOR_CODE, true);
            }
        }


        private decimal _OPERATOR_TYPE;
        /// <summary>
        /// OPERATOR_TYPE
        /// </summary>
        [SqlColumn(Consts.F_OPERATOR_TYPE)]
        public decimal OPERATOR_TYPE
        {
            get
            {
                return this._OPERATOR_TYPE;
            }
            set
            {
                this._OPERATOR_TYPE = value;
                this.SetValue(Consts.F_OPERATOR_TYPE, true);
            }
        }


        private string _AGENT_CODE;
        /// <summary>
        /// AGENT_CODE
        /// </summary>
        [SqlColumn(Consts.F_AGENT_CODE)]
        public string AGENT_CODE
        {
            get
            {
                return this._AGENT_CODE;
            }
            set
            {
                this._AGENT_CODE = value;
                this.SetValue(Consts.F_AGENT_CODE, true);
            }
        }

        private string _CONTEXT_NAME;
        /// <summary>
        /// _CONTEXT_NAME
        /// </summary>
        [SqlColumn(Consts.F_CONTEXT_NAME)]
        public string CONTEXT_NAME
        {
            get
            {
                return this._CONTEXT_NAME;
            }
            set
            {
                this._CONTEXT_NAME = value;
                this.SetValue(Consts.F_CONTEXT_NAME, true);
            }
        }

        private decimal _DECLARATION_DATE;
        /// <summary>
        /// DECLARATION_DATE
        /// </summary>
        [SqlColumn(Consts.F_DECLARATION_DATE)]
        public decimal DECLARATION_DATE
        {
            get
            {
                return this._DECLARATION_DATE;
            }
            set
            {
                this._DECLARATION_DATE = value;
                this.SetValue(Consts.F_DECLARATION_DATE, true);
            }
        }

        private string _FREE_TEXT;
        /// <summary>
        /// FREE_TEXT ROUTE
        /// </summary>
        [SqlColumn(Consts.F_FREE_TEXT)]
        public string FREE_TEXT
        {
            get
            {
                return this._FREE_TEXT;
            }
            set
            {
                this._FREE_TEXT = value;
                this.SetValue(Consts.F_FREE_TEXT, true);
            }
        }


        private string _ROUTE;
        /// <summary>
        /// ROUTE ROUTE
        /// </summary>
        [SqlColumn(Consts.F_ROUTE)]
        public string ROUTE
        {
            get
            {
                return this._ROUTE;
            }
            set
            {
                this._ROUTE = value;
                this.SetValue(Consts.F_ROUTE, true);
            }
        }


        private string _IN_OUT_DATE;
        /// <summary>
        /// IN_OUT_DATE AGENT_ADDRESS
        /// </summary>
        [SqlColumn(Consts.F_IN_OUT_DATE)]
        public string IN_OUT_DATE
        {
            get
            {
                return this._IN_OUT_DATE;
            }
            set
            {
                this._IN_OUT_DATE = value;
                this.SetValue(Consts.F_IN_OUT_DATE, true);
            }
        }

        private string _AGENT_ADDRESS;
        /// <summary>
        ///  AGENT_ADDRESS
        /// </summary>
        [SqlColumn(Consts.F_AGENT_ADDRESS)]
        public string AGENT_ADDRESS
        {
            get
            {
                return this._AGENT_ADDRESS;
            }
            set
            {
                this._AGENT_ADDRESS = value;
                this.SetValue(Consts.F_AGENT_ADDRESS, true);
            }
        }

        private string _CARGO_DRAFT;
        /// <summary>
        ///  CARGO_DRAFT
        /// </summary>
        [SqlColumn(Consts.F_CARGO_DRAFT)]
        public string CARGO_DRAFT
        {
            get
            {
                return this._CARGO_DRAFT;
            }
            set
            {
                this._CARGO_DRAFT = value;
                this.SetValue(Consts.F_CARGO_DRAFT, true);
            }
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
