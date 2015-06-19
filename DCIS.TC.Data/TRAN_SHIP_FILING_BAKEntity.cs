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
    [SqlTable("TRAN_SHIP_FILING_BAK")]
    public class TRAN_SHIP_FILING_BAKEntity : BaseEntity
    {
         public sealed class Consts
        {
            public const string F_SHIP_NO = "SHIP_NO";
            public const string F_CREATORID = "CREATORID";
            public const string F_COMPANYID = "COMPANYID";
            public const string F_SENDID = "SENDID";
            public const string F_SENDTIME = "SENDTIME";
            public const string F_FLAG = "FLAG";
           
        }

        
          /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_SHIP_FILING_BAKEntity()
            : base()
        {
        }
        
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SHIP_FILING_BAKEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SHIP_FILING_BAKEntity(string ship_no, string connectionKey)
            : base(connectionKey)
        {
            this.SHIP_NO = ship_no;
            this.SelectByPKeys();
        }

        private string _SHIP_NO;
        [SqlColumn(Consts.F_SHIP_NO, true)]
        public string SHIP_NO
        {
            get { return this._SHIP_NO; }
            set { this._SHIP_NO = value; this.SetValue(Consts.F_SHIP_NO, true); }
        }
        /// <summary>
        /// 创建人代码
        /// </summary>
        private string _CREATORID;
        [SqlColumn(Consts.F_CREATORID)]
        public string CREATORID
        {
            get { return this._CREATORID; }
            set { this._CREATORID = value; this.SetValue(Consts.F_CREATORID, true); }
        }

        private string _COMPANYID;
        [SqlColumn(Consts.F_COMPANYID)]
        public string COMPANYID
        {
            get { return this._COMPANYID; }
            set { this._COMPANYID = value; this.SetValue(Consts.F_COMPANYID, true); }
        }

        private string _SENDID;
        [SqlColumn(Consts.F_SENDID)]
        public string SENDID
        {
            get { return this._SENDID; }
            set { this._SENDID = value; this.SetValue(Consts.F_SENDID, true); }
        }

        private string _SENDTIME;
        [SqlColumn(Consts.F_SENDTIME)]
        public string SENDTIME
        {
            get { return this._SENDTIME; }
            set { this._SENDTIME = value; this.SetValue(Consts.F_SENDTIME, true); }
        }

        private string _FLAG;
        [SqlColumn(Consts.F_FLAG)]
        public string FLAG
        {
            get { return this._FLAG; }
            set { this._FLAG = value; this.SetValue(Consts.F_FLAG, true); }
        }
      
    }
}
