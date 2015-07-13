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
    [SqlTable("SysUser")]
    public class SysUser_Entity : BaseEntity
    {
        public sealed class Consts
        {
          
            public const string F_UserCode = "UserCode";
            public const string F_UserName = "UserName";
            public const string F_UserPassword = "UserPassword";
            public const string F_DepartCode = "DepartCode";
            public const string F_PositionCode = "PositionCode";
            public const string F_PositionDesc = "PositionDesc";
            public const string F_Uipaddress = "Uipaddress";
            public const string F_Rolelist = "Rolelist";
            public const string F_CreateTime = "CreateTime";
            public const string F_CreateUserNo = "CreateUserNo";
            public const string F_LastUpdateTime = "LastUpdateTime";
            public const string F_UpdateUserNo = "UpdateUserNo";
            public const string F_UserEmail = "UserEmail";
            public const string F_UserPhone = "UserPhone";
            public const string F_IsUse = "IsUse";
            public const string F_TentNo = "TentNo";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysUser_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysUser_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysUser_Entity(string userCode, string connectionKey)
            : base(connectionKey)
        {
            this.UserCode = userCode;
            this.SelectByPKeys();
        }


        private string _UserCode;
        [SqlColumn(Consts.F_UserCode, true)]
        public string UserCode
        {
            get { return this._UserCode; }
            set { this._UserCode = value; this.SetValue(Consts.F_UserCode, true); }
        }

        private string _UserName;
        [SqlColumn(Consts.F_UserName)]
        public string UserName
        {
            get { return this._UserName; }
            set { this._UserName = value; this.SetValue(Consts.F_UserName, true); }
        }

        private string _UserPassword;
        [SqlColumn(Consts.F_UserPassword)]
        public string UserPassword
        {
            get { return this._UserPassword; }
            set { this._UserPassword = value; this.SetValue(Consts.F_UserPassword, true); }
        }

        private int _DepartCode;
        [SqlColumn(Consts.F_DepartCode)]
        public int DepartCode
        {
            get { return this._DepartCode; }
            set { this._DepartCode = value; this.SetValue(Consts.F_DepartCode, true); }
        }

        private int _PositionCode;
        [SqlColumn(Consts.F_PositionCode)]
        public int PositionCode
        {
            get { return this._PositionCode; }
            set { this._PositionCode = value; this.SetValue(Consts.F_PositionCode, true); }
        }

        private string _PositionDesc;
        [SqlColumn(Consts.F_PositionDesc)]
        public string PositionDesc
        {
            get { return this._PositionDesc; }
            set { this._PositionDesc = value; this.SetValue(Consts.F_PositionDesc, true); }
        }

        private string _Uipaddress;
        [SqlColumn(Consts.F_Uipaddress)]
        public string Uipaddress
        {
            get { return this._Uipaddress; }
            set { this._Uipaddress = value; this.SetValue(Consts.F_Uipaddress, true); }
        }

        private string _Rolelist;
        [SqlColumn(Consts.F_Rolelist)]
        public string Rolelist
        {
            get { return this._Rolelist; }
            set { this._Rolelist = value; this.SetValue(Consts.F_Rolelist, true); }
        }

        private DateTime _CreateTime;
        [SqlColumn(Consts.F_CreateTime)]
        public DateTime CreateTime
        {
            get { return this._CreateTime; }
            set { this._CreateTime = value; this.SetValue(Consts.F_CreateTime, true); }
        }

        private string _CreateUserNo;
        [SqlColumn(Consts.F_CreateUserNo)]
        public string CreateUserNo
        {
            get { return this._CreateUserNo; }
            set { this._CreateUserNo = value; this.SetValue(Consts.F_CreateUserNo, true); }
        }


        private DateTime _LastUpdateTime;
        [SqlColumn(Consts.F_LastUpdateTime)]
        public DateTime LastUpdateTime
        {
            get { return this._LastUpdateTime; }
            set { this._LastUpdateTime = value; this.SetValue(Consts.F_LastUpdateTime, true); }
        }

        // PositionDesc, Uipaddress, Rolelist, CreateTime, CreateUserNo,
        //  LastUpdateTime, UpdateUserNo, UserEmail, UserPhone, IsUse, TentNo
        private string _UpdateUserNo;
        [SqlColumn(Consts.F_UpdateUserNo)]
        public string UpdateUserNo
        {
            get { return this._UpdateUserNo; }
            set { this._UpdateUserNo = value; this.SetValue(Consts.F_UpdateUserNo, true); }
        }

        private string _UserEmail;
        [SqlColumn(Consts.F_UserEmail)]
        public string UserEmail
        {
            get { return this._UserEmail; }
            set { this._UserEmail = value; this.SetValue(Consts.F_UserEmail, true); }
        }
        private string _UserPhone;
        [SqlColumn(Consts.F_UserPhone)]
        public string UserPhone
        {
            get { return this._UserPhone; }
            set { this._UserPhone = value; this.SetValue(Consts.F_UserPhone, true); }
        }

        private string _IsUse;
        [SqlColumn(Consts.F_IsUse)]
        public string IsUse
        {
            get { return this._IsUse; }
            set { this._IsUse = value; this.SetValue(Consts.F_IsUse, true); }
        }

        private string _TentNo;
        [SqlColumn(Consts.F_TentNo)]
        public string TentNo
        {
            get { return this._TentNo; }
            set { this._TentNo = value; this.SetValue(Consts.F_TentNo, true); }
        }
    }
}