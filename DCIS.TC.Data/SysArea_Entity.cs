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
    [SqlTable("SysArea")]
    public class SysArea_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_AreaCode = "AreaCode";
            public const string F_AreaName = "AreaName";
         
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysArea_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysArea_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysArea_Entity(int areaCode, string connectionKey)
            : base(connectionKey)
        {
            this.AreaCode = areaCode;
            this.SelectByPKeys();
        }



        private int _AreaCode;
        [SqlColumn(Consts.F_AreaCode, true)]
        public int AreaCode
        {
            get { return this._AreaCode; }
            set { this._AreaCode = value; this.SetValue(Consts.F_AreaCode, true); }
        }

        private string _AreaName;
        [SqlColumn(Consts.F_AreaName)]
        public string AreaName
        {
            get { return this._AreaName; }
            set { this._AreaName = value; this.SetValue(Consts.F_AreaName, true); }
        }

    }
}
