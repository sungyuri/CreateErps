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
    [SqlTable("SysProjectTrackingDetail")]
  public  class SysProjectTrackingDetail_Entity:BaseEntity
    {
         public sealed class Consts
        {
             public const string F_ID = "ID";
            public const string F_TrackingID = "TrackingID";
            public const string F_NodeID = "NodeID";
            public const string F_NodeName = "NodeName";
            public const string F_NodeContent = "NodeContent";
            public const string F_PlanTime = "PlanTime";
            public const string F_FactTime = "FactTime";
            public const string F_Completion = "Completion";
            public const string F_IsDelay = "IsDelay";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysProjectTrackingDetail_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysProjectTrackingDetail_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysProjectTrackingDetail_Entity(int id, string connectionKey)
            : base(connectionKey)
        {
            this.ID = id;
            this.SelectByPKeys();
        }

        private int _ID;
        [SqlColumn(Consts.F_ID, true)]
        public int ID
        {
            get { return this._ID; }
            set { this._ID = value; this.SetValue(Consts.F_ID, true); }
        }


        private string _TrackingID;
        [SqlColumn(Consts.F_TrackingID)]
        public string TrackingID
        {
            get { return this._TrackingID; }
            set { this._TrackingID = value; this.SetValue(Consts.F_TrackingID, true); }
        }

        private int _NodeID;
        [SqlColumn(Consts.F_NodeID)]
        public int NodeID
        {
            get { return this._NodeID; }
            set { this._NodeID = value; this.SetValue(Consts.F_NodeID, true); }
        }


        private string _NodeName;
        [SqlColumn(Consts.F_NodeName)]
        public string NodeName
        {
            get { return this._NodeName; }
            set { this._NodeName = value; this.SetValue(Consts.F_NodeName, true); }
        }

        private string _NodeContent;
        [SqlColumn(Consts.F_NodeContent)]
        public string NodeContent
        {
            get { return this._NodeContent; }
            set { this._NodeContent = value; this.SetValue(Consts.F_NodeContent, true); }
        }

        private string _PlanTime;
        [SqlColumn(Consts.F_PlanTime)]
        public string PlanTime
        {
            get { return this._PlanTime; }
            set { this._PlanTime = value; this.SetValue(Consts.F_PlanTime, true); }
        }

        private string _FactTime;
        [SqlColumn(Consts.F_FactTime)]
        public string FactTime
        {
            get { return this._FactTime; }
            set { this._FactTime = value; this.SetValue(Consts.F_FactTime, true); }
        }

        private string _Completion;
        [SqlColumn(Consts.F_Completion)]
        public string Completion
        {
            get { return this._Completion; }
            set { this._Completion = value; this.SetValue(Consts.F_Completion, true); }
        }

        private string _IsDelay;
        [SqlColumn(Consts.F_IsDelay)]
        public string IsDelay
        {
            get { return this._IsDelay; }
            set { this._IsDelay = value; this.SetValue(Consts.F_IsDelay, true); }
        }
    }
}
