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
    [SqlTable("SysGoodsType")]
   public class SysGoodsType_Entity:BaseEntity
    {
             public sealed class Consts
        {
                 public const string F_GoodsTypeCode = "GoodsTypeCode";
                 public const string F_GoodsTypeName = "GoodsTypeName";
        }

           /// <summary>
        /// Constructor
        /// </summary>
        public SysGoodsType_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysGoodsType_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysGoodsType_Entity(int goodsTypeCode, string connectionKey)
            : base(connectionKey)
        {
            this.GoodsTypeCode = goodsTypeCode;
            this.SelectByPKeys();
        }


        private int _GoodsTypeCode;
        [SqlColumn(Consts.F_GoodsTypeCode, true)]
        public int GoodsTypeCode
        {
            get { return this._GoodsTypeCode; }
            set { this._GoodsTypeCode = value; this.SetValue(Consts.F_GoodsTypeCode, true); }
        }

        private string _GoodsTypeName;
        [SqlColumn(Consts.F_GoodsTypeName)]
        public string GoodsTypeName
        {
            get { return this._GoodsTypeName; }
            set { this._GoodsTypeName = value; this.SetValue(Consts.F_GoodsTypeName, true); }
        }

    }
}
