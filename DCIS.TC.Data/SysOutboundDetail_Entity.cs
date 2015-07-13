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
    [SqlTable("SysOutboundDetail")]
   public class SysOutboundDetail_Entity:BaseEntity
    {
            public sealed class Consts
        {
                public const string F_ID = "ID";
                public const string F_OutboundID = "OutboundID";
                public const string F_GoodsCode = "GoodsCode";
                public const string F_GoodsCount = "GoodsCount";
         
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public SysOutboundDetail_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysOutboundDetail_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysOutboundDetail_Entity(int id, string connectionKey)
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

        private string _OutboundID;
        [SqlColumn(Consts.F_OutboundID)]
        public string OutboundID
        {
            get { return this._OutboundID; }
            set { this._OutboundID = value; this.SetValue(Consts.F_OutboundID, true); }
        }

        private int  _GoodsCode;
        [SqlColumn(Consts.F_GoodsCode)]
        public int GoodsCode
        {
            get { return this._GoodsCode; }
            set { this._GoodsCode = value; this.SetValue(Consts.F_GoodsCode, true); }
        }

        private decimal _GoodsCount;
        [SqlColumn(Consts.F_GoodsCount)]
        public decimal GoodsCount
        {
            get { return this._GoodsCount; }
            set { this._GoodsCount = value; this.SetValue(Consts.F_GoodsCount, true); }
        }

    }
}
