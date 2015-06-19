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
    [SqlTable("TRAN_SCHEDULE_INFO")]
    public class TRAN_SCHEDULE_INFOEntity : BaseEntity
    {
         public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SHIP_NO = "SHIP_NO";
            public const string F_SHIP_NAME = "SHIP_NAME";
            public const string F_IMO = "IMO";
            public const string F_DEL_FLAG = "DEL_FLAG";
            public const string F_SHIP_STATUE = "SHIP_STATUE";//SHIP_STATUE
            public const string F_BERTH_CODE = "BERTH_CODE";//BERTH_CODE


        }

               /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_SCHEDULE_INFOEntity()
            : base()
        {
        }
        
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SCHEDULE_INFOEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SCHEDULE_INFOEntity(string schedule_id, string connectionKey)
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

        private string _SHIP_NO;
        [SqlColumn(Consts.F_SHIP_NO)]
        public string SHIP_NO
        {
            get { return this._SHIP_NO; }
            set { this._SHIP_NO = value; this.SetValue(Consts.F_SHIP_NO, true); }
        }

        private string _SHIP_NAME;
        [SqlColumn(Consts.F_SHIP_NAME)]
        public string SHIP_NAME
        {
            get { return this._SHIP_NAME; }
            set { this._SHIP_NAME = value; this.SetValue(Consts.F_SHIP_NAME, true); }
        }

        private string _IMO;
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get { return this._IMO; }
            set { this._IMO = value; this.SetValue(Consts.F_IMO, true); }
        }

        private string _DEL_FLAG;
        [SqlColumn(Consts.F_DEL_FLAG)]
        public string DEL_FLAG
        {
            get { return this._DEL_FLAG; }
            set { this._DEL_FLAG = value; this.SetValue(Consts.F_DEL_FLAG, true); }
        }

        private string _SHIP_STATUE;
        [SqlColumn(Consts.F_SHIP_STATUE)]
        public string SHIP_STATUE
        {
            get { return this._SHIP_STATUE; }
            set { this._SHIP_STATUE = value; this.SetValue(Consts.F_SHIP_STATUE, true); }
        }
        //BERTH_CODE
        private string _BERTH_CODE;
        [SqlColumn(Consts.F_BERTH_CODE)]
        public string BERTH_CODE
        {
            get { return this._BERTH_CODE; }
            set { this._BERTH_CODE = value; this.SetValue(Consts.F_BERTH_CODE, true); }
        }
    }
}
