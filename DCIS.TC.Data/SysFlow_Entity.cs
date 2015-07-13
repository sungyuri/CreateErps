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
    [SqlTable("SysFlow")]
   public class SysFlow_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_FlowId = "FlowId";
            public const string F_FlowCdode = "FlowCdode";
            public const string F_FlowName = "FlowName";
        }

           /// <summary>
        /// Constructor
        /// </summary>
        public SysFlow_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFlow_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysFlow_Entity(int flowId,string connectionKey)
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

    }
}
