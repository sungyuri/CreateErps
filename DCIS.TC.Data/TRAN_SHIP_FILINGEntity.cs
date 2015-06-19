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
    [SqlTable("TRAN_SHIP_FILING")]
    public class TRAN_SHIP_FILINGEntity : BaseEntity
    {

        public sealed class Consts
        {
            public const string F_SHIP_NO = "SHIP_NO";
            public const string F_VESSELNAMEEN = "VESSELNAMEEN";
            public const string F_VESSELNAMECN = "VESSELNAMECN";
            public const string F_IMO = "IMO";
            public const string F_CALLSIGN = "CALLSIGN";
            public const string F_NATIONALITY = "NATIONALITY";
            public const string F_CERTIFICATENO = "CERTIFICATENO";
            public const string F_CERTIFICATEDATE = "CERTIFICATEDATE";
            public const string F_BUILDDATE = "BUILDDATE";
            public const string F_HAILINGPORT = "HAILINGPORT";
            public const string F_VESSELSORT = "VESSELSORT";
            public const string F_LINETYPE = "LINETYPE";
            public const string F_COMMUNICATIONID = "COMMUNICATIONID";
            public const string F_COMMUNICATIONTYPE = "COMMUNICATIONTYPE";
            public const string F_GROSSTONNAGE = "GROSSTONNAGE";
            public const string F_NETTONNAGE = "NETTONNAGE";
            public const string F_DEADWEIGHTTONNAGE = "DEADWEIGHTTONNAGE";
            public const string F_VESSELLENGTH = "VESSELLENGTH";
            public const string F_VESSELBREADTH = "VESSELBREADTH";
            public const string F_VESSELDEAPTH = "VESSELDEAPTH";
            public const string F_CONTROLTYPE = "CONTROLTYPE";
            public const string F_COCODE = "COCODE";
            public const string F_VESSELCORPNAMEEN = "VESSELCORPNAMEEN";
            public const string F_VESSELCORPNAMECN = "VESSELCORPNAMECN";
            public const string F_RECORDDATETIME = "RECORDDATETIME";
            public const string F_CLASSLETTER = "CLASSLETTER";
            public const string F_CLASSIFICATIONNO = "CLASSIFICATIONNO";
            public const string F_VESSELCOLOR = "VESSELCOLOR";
            public const string F_FUNNELCOLOR = "FUNNELCOLOR";
            public const string F_EMAIL = "EMAIL";
            public const string F_SATELLITEPHONE = "SATELLITEPHONE";
            public const string F_HORSEPOWER = "HORSEPOWER";
            public const string F_SPEED = "SPEED";
            public const string F_TPITPC = "TPITPC";
            public const string F_DEEPDRAFT = "DEEPDRAFT";
            public const string F_LIGHTDRAFT = "LIGHTDRAFT";
            public const string F_CARBINWINDOWNUM = "CARBINWINDOWNUM";
            public const string F_CARGODEAR = "CARGODEAR";
            public const string F_BALECAPACITY = "BALECAPACITY";
            public const string F_GRAINCAPACITY = "GRAINCAPACITY";
            public const string F_CEILINGTEU = "CEILINGTEU";
            public const string F_DECKTEU = "DECKTEU";
            public const string F_CREWLIMIT = "CREWLIMIT";
            public const string F_PASSENGERLIMIT = "PASSENGERLIMIT";
            public const string F_MEMO = "MEMO";
            public const string F_R_STATUE = "R_STATUE";//R_STATUE
        }

        
          /// <summary>
        /// Constructor
        /// </summary>
        public TRAN_SHIP_FILINGEntity()
            : base()
        {
        }
        
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SHIP_FILINGEntity(string connectionKey)
            : base(connectionKey)
        {
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="id">ID</param>
        /// <param name="connectionKey">数据库连接池中的关键字</param>
        public TRAN_SHIP_FILINGEntity(string ship_no, string connectionKey)
            : base(connectionKey)
        {
            this.SHIP_NO = ship_no;
            this.SelectByPKeys();
        }

        private string _SHIP_NO;
        [SqlColumn(Consts.F_SHIP_NO, true)]
        public string SHIP_NO
        {
            get { return this._SHIP_NO; }
            set { this._SHIP_NO = value; this.SetValue(Consts.F_SHIP_NO, true); }
        }
        /// <summary>
        /// 船名
        /// </summary>
        private string _VESSELNAMEEN;
        [SqlColumn(Consts.F_VESSELNAMEEN)]
        public string VESSELNAMEEN
        {
            get { return this._VESSELNAMEEN; }
            set { this._VESSELNAMEEN = value; this.SetValue(Consts.F_VESSELNAMEEN, true); }
        }

        private string _VESSELNAMECN;
        [SqlColumn(Consts.F_VESSELNAMECN)]
        public string VESSELNAMECN
        {
            get { return this._VESSELNAMECN; }
            set { this._VESSELNAMECN = value; this.SetValue(Consts.F_VESSELNAMECN, true); }
        }

        private string _IMO;
        [SqlColumn(Consts.F_IMO)]
        public string IMO
        {
            get { return this._IMO; }
            set { this._IMO = value; this.SetValue(Consts.F_IMO, true); }
        }

        private string _CALLSIGN;
        [SqlColumn(Consts.F_CALLSIGN)]
        public string CALLSIGN
        {
            get { return this._CALLSIGN; }
            set { this._CALLSIGN = value; this.SetValue(Consts.F_CALLSIGN, true); }
        }

        private string _NATIONALITY;
        [SqlColumn(Consts.F_NATIONALITY)]
        public string NATIONALITY
        {
            get { return this._NATIONALITY; }
            set { this._NATIONALITY = value; this.SetValue(Consts.F_NATIONALITY, true); }
        }
        /// <summary>
        /// 船舶国籍证书编号
        /// </summary>
        private string _CERTIFICATENO;
        [SqlColumn(Consts.F_CERTIFICATENO)]
        public string CERTIFICATENO
        {
            get { return this._CERTIFICATENO; }
            set { this._CERTIFICATENO = value; this.SetValue(Consts.F_CERTIFICATENO, true); }
        }
        /// <summary>
        /// 国籍证书签发日期
        /// </summary>
        private string _CERTIFICATEDATE;
        [SqlColumn(Consts.F_CERTIFICATEDATE)]
        public string CERTIFICATEDATE
        {
            get { return this._CERTIFICATEDATE; }
            set { this._CERTIFICATEDATE = value; this.SetValue(Consts.F_CERTIFICATEDATE, true); }
        }
        /// <summary>
        /// 船舶建造日期
        /// </summary>
        private decimal _BUILDDATE;
        [SqlColumn(Consts.F_BUILDDATE)]
        public decimal BUILDDATE
        {
            get { return this._BUILDDATE; }
            set { this._BUILDDATE = value; this.SetValue(Consts.F_BUILDDATE, true); }
        }
        /// <summary>
        /// 船籍港代码
        /// </summary>
        private string _HAILINGPORT;
        [SqlColumn(Consts.F_HAILINGPORT)]
        public string HAILINGPORT
        {
            get { return this._HAILINGPORT; }
            set { this._HAILINGPORT = value; this.SetValue(Consts.F_HAILINGPORT, true); }
        }
        /// <summary>
        /// 船舶种类代码
        /// </summary>
        private string _VESSELSORT;
        [SqlColumn(Consts.F_VESSELSORT)]
        public string VESSELSORT
        {
            get { return this._VESSELSORT; }
            set { this._VESSELSORT = value; this.SetValue(Consts.F_VESSELSORT, true); }
        }
        /// <summary>
        /// 运营性质
        /// </summary>
        private string _LINETYPE;
        [SqlColumn(Consts.F_LINETYPE)]
        public string LINETYPE
        {
            get { return this._LINETYPE; }
            set { this._LINETYPE = value; this.SetValue(Consts.F_LINETYPE, true); }
        }
        /// <summary>
        /// 船舶通讯号码
        /// </summary>
        private string _COMMUNICATIONID;
        [SqlColumn(Consts.F_COMMUNICATIONID)]
        public string COMMUNICATIONID
        {
            get { return this._COMMUNICATIONID; }
            set { this._COMMUNICATIONID = value; this.SetValue(Consts.F_COMMUNICATIONID, true); }
        }
        /// <summary>
        /// 船舶通讯方式类别
        /// </summary>
        private string _COMMUNICATIONTYPE;
        [SqlColumn(Consts.F_COMMUNICATIONTYPE)]
        public string COMMUNICATIONTYPE
        {
            get { return this._COMMUNICATIONTYPE; }
            set { this._COMMUNICATIONTYPE = value; this.SetValue(Consts.F_COMMUNICATIONTYPE, true); }
        }
        /// <summary>
        /// 总吨位
        /// </summary>
        private decimal _GROSSTONNAGE;
        [SqlColumn(Consts.F_GROSSTONNAGE)]
        public decimal GROSSTONNAGE
        {
            get { return this._GROSSTONNAGE; }
            set { this._GROSSTONNAGE = value; this.SetValue(Consts.F_GROSSTONNAGE, true); }
        }
        /// <summary>
        /// 净吨位
        /// </summary>
        private decimal _NETTONNAGE;
        [SqlColumn(Consts.F_NETTONNAGE)]
        public decimal NETTONNAGE
        {
            get { return this._NETTONNAGE; }
            set { this._NETTONNAGE = value; this.SetValue(Consts.F_NETTONNAGE, true); }
        }
        /// <summary>
        /// 最大重量
        /// </summary>
        private decimal _DEADWEIGHTTONNAGE;
        [SqlColumn(Consts.F_DEADWEIGHTTONNAGE)]
        public decimal DEADWEIGHTTONNAGE
        {
            get { return this._DEADWEIGHTTONNAGE; }
            set { this._DEADWEIGHTTONNAGE = value; this.SetValue(Consts.F_DEADWEIGHTTONNAGE, true); }
        }
        /// <summary>
        /// 船长
        /// </summary>
        private decimal _VESSELLENGTH;
        [SqlColumn(Consts.F_VESSELLENGTH)]
        public decimal VESSELLENGTH
        {
            get { return this._VESSELLENGTH; }
            set { this._VESSELLENGTH = value; this.SetValue(Consts.F_VESSELLENGTH, true); }
        }
        /// <summary>
        /// 船宽
        /// </summary>
        private decimal _VESSELBREADTH;
        [SqlColumn(Consts.F_VESSELBREADTH)]
        public decimal VESSELBREADTH
        {
            get { return this._VESSELBREADTH; }
            set { this._VESSELBREADTH = value; this.SetValue(Consts.F_VESSELBREADTH, true); }
        }
        /// <summary>
        /// 船高
        /// </summary>
        private decimal _VESSELDEAPTH;
        [SqlColumn(Consts.F_VESSELDEAPTH)]
        public decimal VESSELDEAPTH
        {
            get { return this._VESSELDEAPTH; }
            set { this._VESSELDEAPTH = value; this.SetValue(Consts.F_VESSELDEAPTH, true); }
        }
        /// <summary>
        /// 船舶监管类型
        /// </summary>
        private string _CONTROLTYPE;
        [SqlColumn(Consts.F_CONTROLTYPE)]
        public string CONTROLTYPE
        {
            get { return this._CONTROLTYPE; }
            set { this._CONTROLTYPE = value; this.SetValue(Consts.F_CONTROLTYPE, true); }
        }
        /// <summary>
        /// 船公司编码
        /// </summary>
        private string _COCODE;
        [SqlColumn(Consts.F_COCODE)]
        public string COCODE
        {
            get { return this._COCODE; }
            set { this._COCODE = value; this.SetValue(Consts.F_COCODE, true); }
        }
        /// <summary>
        /// 船公司英文名称
        /// </summary>
        private string _VESSELCORPNAMEEN;
        [SqlColumn(Consts.F_VESSELCORPNAMEEN)]
        public string VESSELCORPNAMEEN
        {
            get { return this._VESSELCORPNAMEEN; }
            set { this._VESSELCORPNAMEEN = value; this.SetValue(Consts.F_VESSELCORPNAMEEN, true); }
        }
        /// <summary>
        /// 船公司中文名称
        /// </summary>
        private string _VESSELCORPNAMECN;
        [SqlColumn(Consts.F_VESSELCORPNAMECN)]
        public string VESSELCORPNAMECN
        {
            get { return this._VESSELCORPNAMECN; }
            set { this._VESSELCORPNAMECN = value; this.SetValue(Consts.F_VESSELCORPNAMECN, true); }
        }
        /// <summary>
        /// 备案日期
        /// </summary>
        private decimal _RECORDDATETIME;
        [SqlColumn(Consts.F_RECORDDATETIME)]
        public decimal RECORDDATETIME
        {
            get { return this._RECORDDATETIME; }
            set { this._RECORDDATETIME = value; this.SetValue(Consts.F_RECORDDATETIME, true); }
        }
        /// <summary>
        /// 等级号
        /// </summary>
        private string _CLASSLETTER;
        [SqlColumn(Consts.F_CLASSLETTER)]
        public string CLASSLETTER
        {
            get { return this._CLASSLETTER; }
            set { this._CLASSLETTER = value; this.SetValue(Consts.F_CLASSLETTER, true); }
        }
        /// <summary>
        /// 等级证书号
        /// </summary>
        private string _CLASSIFICATIONNO;
        [SqlColumn(Consts.F_CLASSIFICATIONNO)]
         public string CLASSIFICATIONNO
        {
            get { return this._CLASSIFICATIONNO; }
            set { this._CLASSIFICATIONNO = value; this.SetValue(Consts.F_CLASSIFICATIONNO, true); }
        }
        /// <summary>
        /// 船体颜色
        /// </summary>
        private string _VESSELCOLOR;
        [SqlColumn(Consts.F_VESSELCOLOR)]
        public string VESSELCOLOR
        {
            get { return this._VESSELCOLOR; }
            set { this._VESSELCOLOR = value; this.SetValue(Consts.F_VESSELCOLOR, true); }
        }
        /// <summary>
        /// 烟囱颜色
        /// </summary>
        private string _FUNNELCOLOR;
        [SqlColumn(Consts.F_FUNNELCOLOR)]
        public string FUNNELCOLOR
        {
            get { return this._FUNNELCOLOR; }
            set { this._FUNNELCOLOR = value; this.SetValue(Consts.F_FUNNELCOLOR, true); }
        }
        /// <summary>
        /// 电子邮件
        /// </summary>
        private string _EMAIL;
        [SqlColumn(Consts.F_EMAIL)]
        public string EMAIL
        {
            get { return this._EMAIL; }
            set { this._EMAIL = value; this.SetValue(Consts.F_EMAIL, true); }
        }
        /// <summary>
        /// 卫星电话
        /// </summary>
        private string _SATELLITEPHONE;
        [SqlColumn(Consts.F_SATELLITEPHONE)]
        public string SATELLITEPHONE
        {
            get { return this._SATELLITEPHONE; }
            set { this._SATELLITEPHONE = value; this.SetValue(Consts.F_SATELLITEPHONE, true); }
        }
        /// <summary>
        /// 马力
        /// </summary>
        private string _HORSEPOWER;
        [SqlColumn(Consts.F_HORSEPOWER)]
        public string HORSEPOWER
        {
            get { return this._HORSEPOWER; }
            set { this._HORSEPOWER = value; this.SetValue(Consts.F_HORSEPOWER, true); }
        }
        /// <summary>
        /// 船速
        /// </summary>
        private string _SPEED;
        [SqlColumn(Consts.F_SPEED)]
        public string SPEED
        {
            get { return this._SPEED; }
            set { this._SPEED = value; this.SetValue(Consts.F_SPEED, true); }
        }
        /// <summary>
        /// TPI/TPC
        /// </summary>
        private string _TPITPC;
        [SqlColumn(Consts.F_TPITPC)]
        public string TPITPC
        {
            get { return this._TPITPC; }
            set { this._TPITPC = value; this.SetValue(Consts.F_TPITPC, true); }
        }

        /// <summary>
        /// 满吃水
        /// </summary>
        private string _DEEPDRAFT;
        [SqlColumn(Consts.F_DEEPDRAFT)]
        public string DEEPDRAFT
        {
            get { return this._DEEPDRAFT; }
            set { this._DEEPDRAFT = value; this.SetValue(Consts.F_DEEPDRAFT, true); }
        }
        /// <summary>
        /// 空吃水
        /// </summary>
        private string _LIGHTDRAFT;
        [SqlColumn(Consts.F_LIGHTDRAFT)]
        public string LIGHTDRAFT
        {
            get { return this._LIGHTDRAFT; }
            set { this._LIGHTDRAFT = value; this.SetValue(Consts.F_LIGHTDRAFT, true); }
        }
        /// <summary>
        /// 舱口数
        /// </summary>
        private string _CARBINWINDOWNUM;
        [SqlColumn(Consts.F_CARBINWINDOWNUM)]
        public string CARBINWINDOWNUM
        {
            get { return this._CARBINWINDOWNUM; }
            set { this._CARBINWINDOWNUM = value; this.SetValue(Consts.F_CARBINWINDOWNUM, true); }
        }
        /// <summary>
        /// 起重设备
        /// </summary>
        private string _CARGODEAR;
        [SqlColumn(Consts.F_CARGODEAR)]
        public string CARGODEAR
        {
            get { return this._CARGODEAR; }
            set { this._CARGODEAR = value; this.SetValue(Consts.F_CARGODEAR, true); }
        }
        /// <summary>
        /// 包装舱容
        /// </summary>
        private string _BALECAPACITY;
        [SqlColumn(Consts.F_BALECAPACITY)]
        public string BALECAPACITY
        {
            get { return this._BALECAPACITY; }
            set { this._BALECAPACITY = value; this.SetValue(Consts.F_BALECAPACITY, true); }
        }

        /// <summary>
        /// 散装舱容
        /// </summary>
        private string _GRAINCAPACITY;
        [SqlColumn(Consts.F_GRAINCAPACITY)]
        public string GRAINCAPACITY
        {
            get { return this._GRAINCAPACITY; }
            set { this._GRAINCAPACITY = value; this.SetValue(Consts.F_GRAINCAPACITY, true); }
        }
        /// <summary>
        /// 舱内TEU
        /// </summary>
        private string _CEILINGTEU;
        [SqlColumn(Consts.F_CEILINGTEU)]
        public string CEILINGTEU
        {
            get { return this._CEILINGTEU; }
            set { this._CEILINGTEU = value; this.SetValue(Consts.F_CEILINGTEU, true); }
        }

        /// <summary>
        /// 甲板TEU
        /// </summary>
        private string _DECKTEU;
        [SqlColumn(Consts.F_DECKTEU)]
        public string DECKTEU
        {
            get { return this._DECKTEU; }
            set { this._DECKTEU = value; this.SetValue(Consts.F_DECKTEU, true); }
        }
        /// <summary>
        /// 船员限额
        /// </summary>
        private string _CREWLIMIT;
        [SqlColumn(Consts.F_CREWLIMIT)]
        public string CREWLIMIT
        {
            get { return this._CREWLIMIT; }
            set { this._CREWLIMIT = value; this.SetValue(Consts.F_CREWLIMIT, true); }
        }
        /// <summary>
        /// 旅客限额
        /// </summary>
        private string _PASSENGERLIMIT;
        [SqlColumn(Consts.F_PASSENGERLIMIT)]
        public string PASSENGERLIMIT
        {
            get { return this._PASSENGERLIMIT; }
            set { this._PASSENGERLIMIT = value; this.SetValue(Consts.F_PASSENGERLIMIT, true); }
        }
        /// <summary>
        /// 备注
        /// </summary>
        private string _MEMO;
        [SqlColumn(Consts.F_MEMO)]
        public string MEMO
        {
            get { return this._MEMO; }
            set { this._MEMO = value; this.SetValue(Consts.F_MEMO, true); }
        }

        //R_STATUE
        private string _R_STATUE;
        [SqlColumn(Consts.F_R_STATUE)]
        public string R_STATUE
        {
            get { return this._R_STATUE; }
            set { this._R_STATUE = value; this.SetValue(Consts.F_R_STATUE, true); }
        }
    }
}
