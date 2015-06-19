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
    [SqlTable("TRAN_INVOICES_HEAD")]
   public class TRAN_INVOICES_HEADEntity:BaseEntity
    {
           public sealed class Consts
        {
            public const string F_ID = "ID";
            public const string F_IMO = "IMO";
            public const string F_ENTER_NUMBER = "ENTER_NUMBER";
            public const string F_CUSTOMS_OFFICE_CODE = "CUSTOMS_OFFICE_CODE";
            public const string F_TRADER_REFERENCE = "TRADER_REFERENCE";
            public const string F_AGENT_CODE = "AGENT_CODE";
            public const string F_SUPPLY_RETURN_SIGN = "SUPPLY_RETURN_SIGN";
            public const string F_TRANSPORT_TYPE = "TRANSPORT_TYPE";
            public const string F_TRAN_DOC_NUMBER = "TRAN_DOC_NUMBER";
            public const string F_CONSIGNEE_NAME = "CONSIGNEE_NAME";
            public const string F_BERTH_CODE = "BERTH_CODE";
            public const string F_GOODS_LOCATION = "GOODS_LOCATION";
            public const string F_QUENTITY = "QUENTITY";
            public const string F_CUBE = "CUBE";
            public const string F_PACKAGE_TYPE = "PACKAGE_TYPE";
            public const string F_GROSS_TONNAGE = "GROSS_TONNAGE";
            public const string F_NET_TONNAGE = "NET_TONNAGE";
            public const string F_OPERATE_AGENCY = "OPERATE_AGENCY";
            public const string F_ACCOMPANY_DOC_PAGE_NUM = "ACCOMPANY_DOC_PAGE_NUM";
            public const string F_ACCOMPANY_DOC_TYPE = "ACCOMPANY_DOC_TYPE";
            public const string F_OTHER_DOC_PAGE_NUM = "OTHER_DOC_PAGE_NUM";
        }

        /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_INVOICES_HEADEntity()
            : base()
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_INVOICES_HEADEntity(string connectionKey)
            : base(connectionKey)
        {
        }


        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_INVOICES_HEADEntity(string id, string connectionKey)
            : base(connectionKey)
        {
            this.ID = id;
            this.SelectByPKeys();
        }

        private string _ID;
        [SqlColumn(Consts.F_ID, true)]
        public string ID
        {
            get { return this._ID; }
            set { this._ID = value; this.SetValue(Consts.F_ID, true); }
        }

        private string _IMO;
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get { return this._IMO; }
            set { this._IMO = value; this.SetValue(Consts.F_IMO, true); }
        }

        private string _ENTER_NUMBER;
        [SqlColumn(Consts.F_ENTER_NUMBER)]
        public string ENTER_NUMBER
        {
            get { return this._ENTER_NUMBER; }
            set { this._ENTER_NUMBER = value; this.SetValue(Consts.F_ENTER_NUMBER, true); }
        }

        private string _CUSTOMS_OFFICE_CODE;
        [SqlColumn(Consts.F_CUSTOMS_OFFICE_CODE)]
        public string CUSTOMS_OFFICE_CODE
        {
            get { return this._CUSTOMS_OFFICE_CODE; }
            set { this._CUSTOMS_OFFICE_CODE = value; this.SetValue(Consts.F_CUSTOMS_OFFICE_CODE, true); }
        }

        private string _TRADER_REFERENCE;
        [SqlColumn(Consts.F_TRADER_REFERENCE)]
        public string TRADER_REFERENCE
        {
            get { return this._TRADER_REFERENCE; }
            set { this._TRADER_REFERENCE = value; this.SetValue(Consts.F_TRADER_REFERENCE, true); }
        }

        private string _AGENT_CODE;
        [SqlColumn(Consts.F_AGENT_CODE)]
        public string AGENT_CODE
        {
            get { return this._AGENT_CODE; }
            set { this._AGENT_CODE = value; this.SetValue(Consts.F_AGENT_CODE, true); }
        }

        private string _SUPPLY_RETURN_SIGN;
        [SqlColumn(Consts.F_SUPPLY_RETURN_SIGN)]
        public string SUPPLY_RETURN_SIGN
        {
            get { return this._SUPPLY_RETURN_SIGN; }
            set { this._SUPPLY_RETURN_SIGN = value; this.SetValue(Consts.F_SUPPLY_RETURN_SIGN, true); }
        }

        private string _TRANSPORT_TYPE;
        [SqlColumn(Consts.F_TRANSPORT_TYPE)]
        public string TRANSPORT_TYPE
        {
            get { return this._TRANSPORT_TYPE; }
            set { this._TRANSPORT_TYPE = value; this.SetValue(Consts.F_TRANSPORT_TYPE, true); }
        }

        private string _TRAN_DOC_NUMBER;
        [SqlColumn(Consts.F_TRAN_DOC_NUMBER)]
        public string TRAN_DOC_NUMBER
        {
            get { return this._TRAN_DOC_NUMBER; }
            set { this._TRAN_DOC_NUMBER = value; this.SetValue(Consts.F_TRAN_DOC_NUMBER, true); }
        }

        private string _CONSIGNEE_NAME;
        [SqlColumn(Consts.F_CONSIGNEE_NAME)]
        public string CONSIGNEE_NAME
        {
            get { return this._CONSIGNEE_NAME; }
            set { this._CONSIGNEE_NAME = value; this.SetValue(Consts.F_CONSIGNEE_NAME, true); }
        }

        private string _BERTH_CODE;
        [SqlColumn(Consts.F_BERTH_CODE)]
        public string BERTH_CODE
        {
            get { return this._BERTH_CODE; }
            set { this._BERTH_CODE = value; this.SetValue(Consts.F_BERTH_CODE, true); }
        }

        private string _GOODS_LOCATION;
        [SqlColumn(Consts.F_GOODS_LOCATION)]
        public string GOODS_LOCATION
        {
            get { return this._GOODS_LOCATION; }
            set { this._GOODS_LOCATION = value; this.SetValue(Consts.F_GOODS_LOCATION, true); }
        }

        private decimal _QUENTITY;
        [SqlColumn(Consts.F_QUENTITY)]
        public decimal QUENTITY
        {
            get { return this._QUENTITY; }
            set { this._QUENTITY = value; this.SetValue(Consts.F_QUENTITY, true); }
        }

        private string _CUBE;
        [SqlColumn(Consts.F_CUBE)]
        public string CUBE
        {
            get { return this._CUBE; }
            set { this._CUBE = value; this.SetValue(Consts.F_CUBE, true); }
        }

        private string _PACKAGE_TYPE;
        [SqlColumn(Consts.F_PACKAGE_TYPE)]
        public string PACKAGE_TYPE
        {
            get { return this._PACKAGE_TYPE; }
            set { this._PACKAGE_TYPE = value; this.SetValue(Consts.F_PACKAGE_TYPE, true); }
        }

        private decimal _GROSS_TONNAGE;
        [SqlColumn(Consts.F_GROSS_TONNAGE)]
        public decimal GROSS_TONNAGE
        {
            get { return this._GROSS_TONNAGE; }
            set { this._GROSS_TONNAGE = value; this.SetValue(Consts.F_GROSS_TONNAGE, true); }
        }

        private decimal _NET_TONNAGE;
        [SqlColumn(Consts.F_NET_TONNAGE)]
        public decimal NET_TONNAGE
        {
            get { return this._NET_TONNAGE; }
            set { this._NET_TONNAGE = value; this.SetValue(Consts.F_NET_TONNAGE, true); }
        }

        private string _OPERATE_AGENCY;
        [SqlColumn(Consts.F_OPERATE_AGENCY)]
        public string OPERATE_AGENCY
        {
            get { return this._OPERATE_AGENCY; }
            set { this._OPERATE_AGENCY = value; this.SetValue(Consts.F_OPERATE_AGENCY, true); }
        }

        private decimal _ACCOMPANY_DOC_PAGE_NUM;
        [SqlColumn(Consts.F_ACCOMPANY_DOC_PAGE_NUM)]
        public decimal ACCOMPANY_DOC_PAGE_NUM
        {
            get { return this._ACCOMPANY_DOC_PAGE_NUM; }
            set { this._ACCOMPANY_DOC_PAGE_NUM = value; this.SetValue(Consts.F_ACCOMPANY_DOC_PAGE_NUM, true); }
        }

        private string _ACCOMPANY_DOC_TYPE;
        [SqlColumn(Consts.F_ACCOMPANY_DOC_TYPE)]
        public string ACCOMPANY_DOC_TYPE
        {
            get { return this._ACCOMPANY_DOC_TYPE; }
            set { this._ACCOMPANY_DOC_TYPE = value; this.SetValue(Consts.F_ACCOMPANY_DOC_TYPE, true); }
        }

        private string _OTHER_DOC_PAGE_NUM;
        [SqlColumn(Consts.F_OTHER_DOC_PAGE_NUM)]
        public string OTHER_DOC_PAGE_NUM
        {
            get { return this._OTHER_DOC_PAGE_NUM; }
            set { this._OTHER_DOC_PAGE_NUM = value; this.SetValue(Consts.F_OTHER_DOC_PAGE_NUM, true); }
        }
    }
}
