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
    [SqlTable("SysFlowMany")]
  public  class SysFlowMany_Entity:BaseEntity
    {
         public sealed class Consts
        {
            public const string F_FlowId = "FlowId";
            public const string F_FlowCdode = "FlowCdode";
            public const string F_FlowName = "FlowName";
            public const string F_FirstUser = "FirstUser";
            public const string F_ManyUser = "ManyUser";
            public const string F_LastUser = "LastUser";
            public const string F_Remarks = "Remarks";
        }

           /// <summary>
        /// Constructor
        /// </summary>
        public SysFlowMany_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFlowMany_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFlowMany_Entity(int flowId, string connectionKey)
            : base(connectionKey)
        {
            this.FlowId = flowId;
            this.SelectByPKeys();
        }


        private int _FlowId;
        [SqlColumn(Consts.F_FlowId, true)]
        public int FlowId
        {
            get { return this._FlowId; }
            set { this._FlowId = value; this.SetValue(Consts.F_FlowId, true); }
        }

        private string _FlowCdode;
        [SqlColumn(Consts.F_FlowCdode)]
        public string FlowCdode
        {
            get { return this._FlowCdode; }
            set { this._FlowCdode = value; this.SetValue(Consts.F_FlowCdode, true); }
        }

        private string _FlowName;
        [SqlColumn(Consts.F_FlowName)]
        public string FlowName
        {
            get { return this._FlowName; }
            set { this._FlowName = value; this.SetValue(Consts.F_FlowName, true); }
        }

        private string _FirstUser;
        [SqlColumn(Consts.F_FirstUser)]
        public string FirstUser
        {
            get { return this._FirstUser; }
            set { this._FirstUser = value; this.SetValue(Consts.F_FirstUser, true); }
        }

        private string _ManyUser;
        [SqlColumn(Consts.F_ManyUser)]
        public string ManyUser
        {
            get { return this._ManyUser; }
            set { this._ManyUser = value; this.SetValue(Consts.F_ManyUser, true); }
        }

        private string _LastUser;
        [SqlColumn(Consts.F_LastUser)]
        public string LastUser
        {
            get { return this._LastUser; }
            set { this._LastUser = value; this.SetValue(Consts.F_LastUser, true); }
        }

        private string _Remarks;
        [SqlColumn(Consts.F_Remarks)]
        public string Remarks
        {
            get { return this._Remarks; }
            set { this._Remarks = value; this.SetValue(Consts.F_Remarks, true); }
        }

    }
}
