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
    [SqlTable("SysGoods")]
   public class SysGoods_Entity:BaseEntity
    {
          public sealed class Consts
        {
              public const string F_GoodsCode = "GoodsCode";
              public const string F_GoodsVersion = "GoodsVersion";
              public const string F_GoodsNo = "GoodsNo";
              public const string F_GoodsName = "GoodsName";
              public const string F_GoodsCount = "GoodsCount";
              public const string F_GoodsUnit = "GoodsUnit";
              public const string F_Manufacturer = "Manufacturer";
              public const string F_GoodsTypeCode = "GoodsTypeCode";
              public const string F_WarehouseCode = "WarehouseCode";
              public const string F_GoodsNote = "GoodsNote";

        }

           /// <summary>
        /// Constructor
        /// </summary>
        public SysGoods_Entity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysGoods_Entity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public SysGoods_Entity(int goodsCode, string connectionKey)
            : base(connectionKey)
        {
            this.GoodsCode = goodsCode;
            this.SelectByPKeys();
        }


        private int _GoodsCode;
        [SqlColumn(Consts.F_GoodsCode, true)]
        public int GoodsCode
        {
            get { return this._GoodsCode; }
            set { this._GoodsCode = value; this.SetValue(Consts.F_GoodsCode, true); }
        }
        /// <summary>
        /// 型号
        /// </summary>
        private string _GoodsVersion;
        [SqlColumn(Consts.F_GoodsVersion)]
        public string GoodsVersion
        {
            get { return this._GoodsVersion; }
            set { this._GoodsVersion = value; this.SetValue(Consts.F_GoodsVersion, true); }
        }
        /// <summary>
        /// 
        /// </summary>
        private string _GoodsNo;
        [SqlColumn(Consts.F_GoodsNo)]
        public string GoodsNo
        {
            get { return this._GoodsNo; }
            set { this._GoodsNo = value; this.SetValue(Consts.F_GoodsNo, true); }
        }

        private string _GoodsName;
        [SqlColumn(Consts.F_GoodsName)]
        public string GoodsName
        {
            get { return this._GoodsName; }
            set { this._GoodsName = value; this.SetValue(Consts.F_GoodsName, true); }
        }

        private decimal _GoodsCount;
        [SqlColumn(Consts.F_GoodsCount)]
        public decimal GoodsCount
        {
            get { return this._GoodsCount; }
            set { this._GoodsCount = value; this.SetValue(Consts.F_GoodsCount, true); }
        }

        private string _GoodsUnit;
        [SqlColumn(Consts.F_GoodsUnit)]
        public string GoodsUnit
        {
            get { return this._GoodsUnit; }
            set { this._GoodsUnit = value; this.SetValue(Consts.F_GoodsUnit, true); }
        }

        private string _Manufacturer;
        [SqlColumn(Consts.F_Manufacturer)]
        public string Manufacturer
        {
            get { return this._Manufacturer; }
            set { this._Manufacturer = value; this.SetValue(Consts.F_Manufacturer, true); }
        }

        private int _GoodsTypeCode;
        [SqlColumn(Consts.F_GoodsTypeCode)]
        public int GoodsTypeCode
        {
            get { return this._GoodsTypeCode; }
            set { this._GoodsTypeCode = value; this.SetValue(Consts.F_GoodsTypeCode, true); }
        }

        private int _WarehouseCode;
        [SqlColumn(Consts.F_WarehouseCode)]
        public int WarehouseCode
        {
            get { return this._WarehouseCode; }
            set { this._WarehouseCode = value; this.SetValue(Consts.F_WarehouseCode, true); }
        }


        private string _GoodsNote;
        [SqlColumn(Consts.F_GoodsNote)]
        public string GoodsNote
        {
            get { return this._GoodsNote; }
            set { this._GoodsNote = value; this.SetValue(Consts.F_GoodsNote, true); }
        }

    }
}
