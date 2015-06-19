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
    [SqlTable("TRAN_DELETE_UPDATE")]
   public class TRAN_DELETE_UPDATEEntity:BaseEntity
    {
            public sealed class Consts
        {
            public const string F_ID = "ID";
            public const string F_AMENDMENT_TYPE = "AMENDMENT_TYPE";
            public const string F_AMENDMENT_ITEM = "AMENDMENT_ITEM";
            public const string F_IMO = "IMO";
            public const string F_VOYAGE = "VOYAGE";
            public const string F_IN_OUT_SIGN = "IN_OUT_SIGN";
            public const string F_CUSTOM_OFFICE_CODE = "CUSTOM_OFFICE_CODE";
            public const string F_AMENDMENT_TITLE = "AMENDMENT_TITLE";
            public const string F_AMENDMENT_CODE = "AMENDMENT_CODE";
            public const string F_AMENDMENT_CONTENT = "AMENDMENT_CONTENT";
            public const string F_AGENT_CODE = "AGENT_CODE";
            public const string F_CONTACT_NAME = "CONTACT_NAME";
            public const string F_APPLICATION_DATE = "APPLICATION_DATE";
            public const string F_FREE_TEXT = "FREE_TEXT";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_DELETE_UPDATEEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DELETE_UPDATEEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_DELETE_UPDATEEntity(string id, string connectionKey)
            : base(connectionKey)
        {
            this.ID = id;
            this.SelectByPKeys();
        }

        private string _ID;
        [SqlColumn(Consts.F_ID, true)]
        public string ID
        {
            get { return this._ID; }
            set { this._ID = value; this.SetValue(Consts.F_ID, true); }
        }

        private string _AMENDMENT_TYPE;
        [SqlColumn(Consts.F_AMENDMENT_TYPE)]
        public string AMENDMENT_TYPE
        {
            get { return this._AMENDMENT_TYPE; }
            set { this._AMENDMENT_TYPE = value; this.SetValue(Consts.F_AMENDMENT_TYPE, true); }
        }

        private string _AMENDMENT_ITEM;
        [SqlColumn(Consts.F_AMENDMENT_ITEM)]
        public string AMENDMENT_ITEM
        {
            get { return this._AMENDMENT_ITEM; }
            set { this._AMENDMENT_ITEM = value; this.SetValue(Consts.F_AMENDMENT_ITEM, true); }
        }

        private string _IMO;
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get { return this._IMO; }
            set { this._IMO = value; this.SetValue(Consts.F_IMO, true); }
        }

        private string _VOYAGE;
        [SqlColumn(Consts.F_VOYAGE)]
        public string VOYAGE
        {
            get { return this._VOYAGE; }
            set { this._VOYAGE = value; this.SetValue(Consts.F_VOYAGE, true); }
        }

        private string _IN_OUT_SIGN;
        [SqlColumn(Consts.F_IN_OUT_SIGN)]
        public string IN_OUT_SIGN
        {
            get { return this._IN_OUT_SIGN; }
            set { this._IN_OUT_SIGN = value; this.SetValue(Consts.F_IN_OUT_SIGN, true); }
        }

        private string _CUSTOM_OFFICE_CODE;
        [SqlColumn(Consts.F_CUSTOM_OFFICE_CODE)]
        public string CUSTOM_OFFICE_CODE
        {
            get { return this._CUSTOM_OFFICE_CODE; }
            set { this._CUSTOM_OFFICE_CODE = value; this.SetValue(Consts.F_CUSTOM_OFFICE_CODE, true); }
        }

        private string _AMENDMENT_TITLE;
        [SqlColumn(Consts.F_AMENDMENT_TITLE)]
        public string AMENDMENT_TITLE
        {
            get { return this._AMENDMENT_TITLE; }
            set { this._AMENDMENT_TITLE = value; this.SetValue(Consts.F_AMENDMENT_TITLE, true); }
        }

        private string _AMENDMENT_CODE;
        [SqlColumn(Consts.F_AMENDMENT_CODE)]
        public string AMENDMENT_CODE
        {
            get { return this._AMENDMENT_CODE; }
            set { this._AMENDMENT_CODE = value; this.SetValue(Consts.F_AMENDMENT_CODE, true); }
        }

        private string _AMENDMENT_CONTENT;
        [SqlColumn(Consts.F_AMENDMENT_CONTENT)]
        public string AMENDMENT_CONTENT
        {
            get { return this._AMENDMENT_CONTENT; }
            set { this._AMENDMENT_CONTENT = value; this.SetValue(Consts.F_AMENDMENT_CONTENT, true); }
        }

        private string _AGENT_CODE;
        [SqlColumn(Consts.F_AGENT_CODE)]
        public string AGENT_CODE
        {
            get { return this._AGENT_CODE; }
            set { this._AGENT_CODE = value; this.SetValue(Consts.F_AGENT_CODE, true); }
        }

        private string _CONTACT_NAME;
        [SqlColumn(Consts.F_CONTACT_NAME)]
        public string CONTACT_NAME
        {
            get { return this._CONTACT_NAME; }
            set { this._CONTACT_NAME = value; this.SetValue(Consts.F_CONTACT_NAME, true); }
        }

        private string _APPLICATION_DATE;
        [SqlColumn(Consts.F_APPLICATION_DATE)]
        public string APPLICATION_DATE
        {
            get { return this._APPLICATION_DATE; }
            set { this._APPLICATION_DATE = value; this.SetValue(Consts.F_APPLICATION_DATE, true); }
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
