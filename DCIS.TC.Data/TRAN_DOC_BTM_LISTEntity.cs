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
    [SqlTable("TRAN_DOC_BTM_LIST")]
   public class TRAN_DOC_BTM_LISTEntity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_SCHEDULE_ID = "SCHEDULE_ID";
            public const string F_SEQUENCE_NUMBER = "SEQUENCE_NUMBER";
            public const string F_PERSON_NAME = "PERSON_NAME";
            public const string F_GENDER = "GENDER";
            public const string F_NATIONALITY = "NATIONALITY";
            public const string F_RANK = "RANK";
            public const string F_BIRTHDAY = "BIRTHDAY";
            public const string F_BIRTHPLACE = "BIRTHPLACE";
            public const string F_ADDITIONAL_TYPE = "ADDITIONAL_TYPE";
            public const string F_ADDITIONAL_NUMBER = "ADDITIONAL_NUMBER";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }
        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DOC_BTM_LISTEntity()
            : base()
        {
        }
        
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_BTM_LISTEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DOC_BTM_LISTEntity(string schedule_id, string connectionKey)
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
            get{return this._SEQUENCE_NUMBER;}
            set { this._SEQUENCE_NUMBER = value; this.SetValue(Consts.F_SEQUENCE_NUMBER, true); }
        }

        private string _PERESON_NAME;
        [SqlColumn(Consts.F_PERSON_NAME)]
        public string PERESON_NAME
        {
            get { return this._PERESON_NAME; }
            set { this._PERESON_NAME = value; this.SetValue(Consts.F_PERSON_NAME, true); }
        }

        private string _GENDER;
        [SqlColumn(Consts.F_GENDER)]
        public string GENDER
        {
            get { return this._GENDER; }
            set { this._GENDER = value; this.SetValue(Consts.F_GENDER, true); }
        }

        private string _NATIONALITY;
        [SqlColumn(Consts.F_NATIONALITY)]
        public string NATIONALITY
        {
            get { return this._NATIONALITY; }
            set { this._NATIONALITY = value; this.SetValue(Consts.F_NATIONALITY, true); }
        }

        private string _RANK;
        [SqlColumn(Consts.F_RANK)]
        public string RANK
        {
            get { return this._RANK; }
            set { this._RANK = value; this.SetValue(Consts.F_RANK, true); }
        }

        private string _BIRTHDAY;
        [SqlColumn(Consts.F_BIRTHDAY)]
        public string BIRTHDAY
        {
            get { return this._BIRTHDAY; }
            set { this._BIRTHDAY = value; this.SetValue(Consts.F_BIRTHDAY, true); }
        }

        private string _BIRTHPLACE;
        [SqlColumn(Consts.F_BIRTHPLACE)]
        public string BIRTHPLACE
        {
            get { return this._BIRTHPLACE; }
            set { this._BIRTHPLACE = value; this.SetValue(Consts.F_BIRTHPLACE, true); }
        }

        private string _ADDITIONAL_TYPE;
        [SqlColumn(Consts.F_ADDITIONAL_TYPE)]
        public string ADDITIONAL_TYPE
        {
            get { return this._ADDITIONAL_TYPE; }
            set { this._ADDITIONAL_TYPE = value; this.SetValue(Consts.F_ADDITIONAL_TYPE, true); }
        }

        private string _ADDITIONAL_NUMBER;
        [SqlColumn(Consts.F_ADDITIONAL_NUMBER)]
        public string ADDITIONAL_NUMBER
        {
            get { return this._ADDITIONAL_NUMBER; }
            set { this._ADDITIONAL_NUMBER = value; this.SetValue(Consts.F_ADDITIONAL_NUMBER, true); }
        }
    }
}
