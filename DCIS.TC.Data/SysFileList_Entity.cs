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
    [SqlTable("SysFileList")]
   public class SysFileList_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_FILEGUID = "FILEGUID";
            public const string F_FILENAME = "FILENAME";
            public const string F_FILETYPE = "FILETYPE";
            public const string F_FILESIZE = "FILESIZE";
            public const string F_GROUPID = "GROUPID";
            public const string F_FILEUPLOADTIME = "FILEUPLOADTIME";
            public const string F_UPUSERCODE = "UPUSERCODE";
            public const string F_UPUSERNAME = "UPUSERNAME";
            public const string F_FILEPATH = "FILEPATH";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysFileList_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFileList_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFileList_Entity(string fILEGUID, string connectionKey)
            : base(connectionKey)
        {
            this.FILEGUID = fILEGUID;
            this.SelectByPKeys();
        }


        private string _FILEGUID;
        [SqlColumn(Consts.F_FILEGUID, true)]
        public string FILEGUID
        {
            get { return this._FILEGUID; }
            set { this._FILEGUID = value; this.SetValue(Consts.F_FILEGUID, true); }
        }

        private string _FILENAME;
        [SqlColumn(Consts.F_FILENAME)]
        public string FILENAME
        {
            get { return this._FILENAME; }
            set { this._FILENAME = value; this.SetValue(Consts.F_FILENAME, true); }
        }

        private string _FILETYPE;
        [SqlColumn(Consts.F_FILETYPE)]
        public string FILETYPE
        {
            get { return this._FILETYPE; }
            set { this._FILETYPE = value; this.SetValue(Consts.F_FILETYPE, true); }
        }

        private decimal _FILESIZE;
        [SqlColumn(Consts.F_FILESIZE)]
        public decimal FILESIZE
        {
            get { return this._FILESIZE; }
            set { this._FILESIZE = value; this.SetValue(Consts.F_FILESIZE, true); }
        }

        private string _GROUPID;
        [SqlColumn(Consts.F_GROUPID)]
        public string GROUPID
        {
            get { return this._GROUPID; }
            set { this._GROUPID = value; this.SetValue(Consts.F_GROUPID, true); }
        }

        private DateTime _FILEUPLOADTIME;
        [SqlColumn(Consts.F_FILEUPLOADTIME)]
        public DateTime FILEUPLOADTIME
        {
            get { return this._FILEUPLOADTIME; }
            set { this._FILEUPLOADTIME = value; this.SetValue(Consts.F_FILEUPLOADTIME, true); }
        }

        private string _UPUSERCODE;
        [SqlColumn(Consts.F_UPUSERCODE)]
        public string UPUSERCODE
        {
            get { return this._UPUSERCODE; }
            set { this._UPUSERCODE = value; this.SetValue(Consts.F_UPUSERCODE, true); }
        }

        private string _UPUSERNAME;
        [SqlColumn(Consts.F_UPUSERNAME)]
        public string UPUSERNAME
        {
            get { return this._UPUSERNAME; }
            set { this._UPUSERNAME = value; this.SetValue(Consts.F_UPUSERNAME, true); }
        }

        private string _FILEPATH;
        [SqlColumn(Consts.F_FILEPATH)]
        public string FILEPATH
        {
            get { return this._FILEPATH; }
            set { this._FILEPATH = value; this.SetValue(Consts.F_FILEPATH, true); }
        }
     

    }
}