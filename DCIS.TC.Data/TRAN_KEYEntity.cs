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
    [SqlTable("TRAN_KEY")]
   public  class TRAN_KEYEntity:BaseEntity
    {
         public sealed class Consts
        {
            public const string F_KEY_VALUE = "KEY_VALUE";
            public const string F_KEY_TEXT = "KEY_TEXT";
            public const string F_KEY_TEXT_EN = "KEY_TEXT_EN";
            public const string F_KEY_ORDER = "KEY_ORDER";
            public const string F_DEL_FLAG = "DEL_FLAG";
            public const string F_KEY_TYPE = "KEY_TYPE";
            public const string F_REMARK = "REMARK";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_KEYEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_KEYEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_KEYEntity(string key_value,string key_type ,string connectionKey)
            : base(connectionKey)
        {
            this.KEY_VALUE = key_value;
            this.KEY_TYPE = key_type;
            this.SelectByPKeys();
        }



        private string _KEY_VALUE;
        [SqlColumn(Consts.F_KEY_VALUE,true)]
        public string KEY_VALUE
        {
            get { return this._KEY_VALUE; }
            set { this._KEY_VALUE = value; this.SetValue(Consts.F_KEY_VALUE, true); }
        }

        private string _KEY_TEXT;
        [SqlColumn(Consts.F_KEY_TEXT)]
        public string KEY_TEXT
        {
            get { return this._KEY_TEXT; }
            set { this._KEY_TEXT = value; this.SetValue(Consts.F_KEY_TEXT, true); }
        }

        private string _KEY_TEXT_EN;
        [SqlColumn(Consts.F_KEY_TEXT_EN)]
        public string KEY_TEXT_EN
        {
            get { return this._KEY_TEXT_EN; }
            set { this._KEY_TEXT_EN = value; this.SetValue(Consts.F_KEY_TEXT_EN, true); }
        }

        private decimal _KEY_ORDER;
        [SqlColumn(Consts.F_KEY_ORDER)]
        public decimal KEY_ORDER
        {
            get { return this._KEY_ORDER; }
            set { this._KEY_ORDER = value; this.SetValue(Consts.F_KEY_ORDER, true); }
        }

        private string _DEL_FLAG;
        [SqlColumn(Consts.F_DEL_FLAG)]
        public string DEL_FLAG
        {
            get { return this._DEL_FLAG; }
            set { this._DEL_FLAG = value; this.SetValue(Consts.F_DEL_FLAG, true); }
        }

        private string _KEY_TYPE;
        [SqlColumn(Consts.F_KEY_TYPE,true)]
        public string KEY_TYPE
        {
            get { return this._KEY_TYPE; }
            set { this._KEY_TYPE = value; this.SetValue(Consts.F_KEY_TYPE, true); }
        }

        private string _REMARK;
        [SqlColumn(Consts.F_REMARK)]
        public string REMARK
        {
            get { return this._REMARK; }
            set { this._REMARK = value; this.SetValue(Consts.F_REMARK, true); }
        }
    }
}
