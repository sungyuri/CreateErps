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
    [SqlTable("SysProjectTracking")]
  public  class SysProjectTracking_Entity:BaseEntity
    {
        public sealed class Consts
        {
            public const string F_TrackingID = "TrackingID";
            public const string F_TrackingInfo = "TrackingInfo";//Remark
            public const string F_Remark = "Remark";//Remark
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysProjectTracking_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysProjectTracking_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysProjectTracking_Entity(string trackingID, string connectionKey)
            : base(connectionKey)
        {
            this.TrackingID = trackingID;
            this.SelectByPKeys();
        }



        private string _TrackingID;
        [SqlColumn(Consts.F_TrackingID, true)]
        public string TrackingID
        {
            get { return this._TrackingID; }
            set { this._TrackingID = value; this.SetValue(Consts.F_TrackingID, true); }
        }

        private string _TrackingInfo;
        [SqlColumn(Consts.F_TrackingInfo)]
        public string TrackingInfo
        {
            get { return this._TrackingInfo; }
            set { this._TrackingInfo = value; this.SetValue(Consts.F_TrackingInfo, true); }
        }


        private string _Remark;
        [SqlColumn(Consts.F_Remark)]
        public string Remark
        {
            get { return this._Remark; }
            set { this._Remark = value; this.SetValue(Consts.F_Remark, true); }
        }
    }
}
