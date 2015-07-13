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
    [SqlTable("SysDepart")]
  public  class SysDepart_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_DepartCode = "DepartCode";
            public const string F_DepartName = "DepartName";
        }

           /// <summary>
        /// Constructor
        /// </summary>
        public SysDepart_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysDepart_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysDepart_Entity(int departCode, string connectionKey)
            : base(connectionKey)
        {
            this.DepartCode = departCode;
            this.SelectByPKeys();
        }


        private int _DepartCode;
        [SqlColumn(Consts.F_DepartCode, true)]
        public int DepartCode
        {
            get { return this._DepartCode; }
            set { this._DepartCode = value; this.SetValue(Consts.F_DepartCode, true); }
        }

        private string _DepartName;
        [SqlColumn(Consts.F_DepartName)]
        public string DepartName
        {
            get { return this._DepartName; }
            set { this._DepartName = value; this.SetValue(Consts.F_DepartName, true); }
        }

    }
}
