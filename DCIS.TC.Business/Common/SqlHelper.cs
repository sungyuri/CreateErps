using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Newtonsoft.Json.Linq;
using System.Data;
using DCIS.Persistence;

namespace TCEPORT.TC.Business.Common
{
    public class SqlHelper
    {
        /// <summary>
        ///  根据dynamic对象值，返回对应实体
        /// </summary>
        /// <param name="obj">实体类型</param>
        /// <param name="data">dynamic对象</param>
        /// <returns></returns>
        public object JsonToEntity(object obj, dynamic data)
        {
            Type t = obj.GetType();
            var originalObj = Activator.CreateInstance(t);//生成对象

            string name = string.Empty;
            string value = string.Empty;
            PropertyInfo info;

            var jsonData = ((Newtonsoft.Json.Linq.JToken)(data)).First;//获取第一个项

            while (jsonData != null)
            {
                name = ((Newtonsoft.Json.Linq.JProperty)(jsonData)).Name;
                info = t.GetProperty(name);//获取对象的属性
                if (info != null)
                {
                    if (info.PropertyType.Name.Contains("Int")) //数字类型时
                    {
                        if (!((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.ToString().Equals(""))
                            info.SetValue(originalObj, Int32.Parse(((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.ToString()), null);//赋值
                    }
                    else if (info.PropertyType.Name.Equals("DateTime"))
                    {
                        if (!((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.ToString().Equals(""))
                        {
                            if (!((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.Type.ToString().Contains("Array"))
                                info.SetValue(originalObj, DateTime.Parse(((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.ToString()), null);//赋值
                        }
                    }
                    else
                    {
                        info.SetValue(originalObj, ((Newtonsoft.Json.Linq.JProperty)(jsonData)).Value.ToString(), null);//赋值
                    }
                }
                jsonData = jsonData.Next;
            }

            return originalObj;
        }

        /// <summary>
        /// 根据实体，返回json
        /// </summary>
        /// <typeparam name="T">实体</typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public JObject EntityToJson<T>(T entity)
        {
            JObject jObj = new JObject();
            PropertyInfo[] pi = entity.GetType().GetProperties();
            object obj;
            string str = string.Empty;
            foreach (PropertyInfo info in pi)
            {
                obj = info.GetValue(entity, null);
                if (obj != null)//当属性有值时
                {
                    jObj.Add(new JProperty(info.Name.ToString(), obj.ToString()));
                }
            }
            return jObj;
        }

        /// <summary>
        /// 根据实体返回sql语句
        /// </summary>
        /// <param name="Entity">实体</param>
        /// <returns></returns>
        public string EntityToSql<T>(T Entity)
        {
            PropertyInfo[] pi = Entity.GetType().GetProperties();
            object obj;
            string str = string.Empty;
            foreach (PropertyInfo info in pi)
            {
                obj = info.GetValue(Entity, null);
                if (obj != null)//当属性有值时
                {
                    if (info.PropertyType.ToString().Equals("System.String"))//stiing类型
                    {
                        str += " and " + info.Name.ToString() + " like '%" + obj.ToString() + "%'";
                    }
                    else if (info.PropertyType.ToString().Equals("System.DateTime"))//date类型
                    {
                        if ((DateTime)obj > DateTime.MinValue)
                            str += " and " + info.Name.ToString() + "= to_date(" + "'" + ((DateTime)obj).ToShortDateString() + "','yyyy-mm-dd')";
                    }
                    else //其他类型
                    {
                        if (!obj.ToString().Equals("0"))
                            str += " and " + info.Name.ToString() + " = '" + obj.ToString() + "'";
                    }
                }
            }
            return str;
        }


        /// <summary>
        /// copyEntity
        /// </summary>
        /// <param name="objold"></param>
        /// <param name="objnew"></param>
        public void copyEntity(object objold, object objnew)        
        {
            string tStr = string.Empty;
            if (objold == null)
            {
                return;
            }
            System.Reflection.PropertyInfo[] properties = objold.GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
            System.Reflection.PropertyInfo[] properties2 = objnew.GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);

            if (properties.Length <= 0)
            {
                return;
            }
            for (int i = 0; i < properties.Length; i++)
            {
                string name = properties[i].Name;
                object value = properties[i].GetValue(objold, null);
                string name2 = properties2[i].Name;
                object value2 = properties2[i].GetValue(objnew, null);
                if (name == name2)
                {
                    if (value2 == null )
                    {
                        properties2[i].SetValue(objnew, value, null);
                    }
                    else
                    {
                        if (value2.GetType().IsValueType)
                        {
                            if (value2.ToString() == "0")
                            {
                                properties2[i].SetValue(objnew, value, null);
                            }
                        }
                    }
                }
            }
        }

        public string getTableNo(string tblName, string colName, string colHead)
        {
            string reStr = "";
            string sql = string.Format(@"SELECT MAX({0}) FROM {1} ", colName, tblName);
            DataTable dt = DBUtil.Fill(sql);
            string strF = colHead + DateTime.Now.Date.ToString("yyMMdd");
            if (dt.Rows.Count > 0)
            {
                string maxNo = dt.Rows[0][0].ToString();
                if (maxNo == "")
                {
                    reStr = colHead + DateTime.Now.Date.ToString("yyMMdd") + "000001";
                }
                else
                {
                    if (maxNo.Substring(0, 8).Equals(strF))
                    {
                        string strB = maxNo.Substring(8, 6);
                        strB = (int.Parse(strB) + 1).ToString();
                        int ilen = strB.Length;
                        for (int i = 0; i < 6 - ilen; i++)
                        {
                            strB = "0" + strB;
                        }
                        reStr = strF + strB;

                    }
                    else
                    {
                        reStr = colHead + DateTime.Now.Date.ToString("yyMMdd") + "000001";
                    }
                }
            }
            else
            {
                reStr = colHead + DateTime.Now.Date.ToString("yyMMdd") + "000001";
            }

            return reStr;
        }

        public  string GetChinaMoney(decimal money)
        {

            string[] strArray;

            string str = "";

            string str2 = "";

            string str3 = money.ToString("0.00");

            switch (str3.Trim().Length)
            {

                case 4:

                    strArray = new string[] { str3[0].ToString(), "y", str3[2].ToString(), "j", str3[3].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 5:

                    strArray = new string[] { str3[0].ToString(), "s", str3[1].ToString(), "y", str3[3].ToString(), "j", str3[4].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 6:

                    strArray = new string[] { str3[0].ToString(), "b", str3[1].ToString(), "s", str3[2].ToString(), "y", str3[4].ToString(), "j", str3[5].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 7:

                    strArray = new string[] { str3[0].ToString(), "q", str3[1].ToString(), "b", str3[2].ToString(), "s", str3[3].ToString(), "y", str3[5].ToString(), "j", str3[6].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 8:

                    strArray = new string[] { str3[0].ToString(), "w", str3[1].ToString(), "q", str3[2].ToString(), "b", str3[3].ToString(), "s", str3[4].ToString(), "y", str3[6].ToString(), "j", str3[7].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 9:

                    strArray = new string[] { str3[0].ToString(), "s", str3[1].ToString(), "w", str3[2].ToString(), "q", str3[3].ToString(), "b", str3[4].ToString(), "s", str3[5].ToString(), "y", str3[7].ToString(), "j", str3[8].ToString(), "f" };

                    str = string.Concat(strArray);

                    break;



                case 10:

                    strArray = new string[] {  

                        str3[0].ToString(), "b", str3[1].ToString(), "s", str3[2].ToString(), "w", str3[3].ToString(), "q", str3[4].ToString(), "b", str3[5].ToString(), "s", str3[6].ToString(), "y", str3[8].ToString(), "j",  

                        str3[9].ToString(), "f" 

                     };

                    str = string.Concat(strArray);

                    break;



                case 11:

                    strArray = new string[] {  

                        str3[0].ToString(), "q", str3[1].ToString(), "b", str3[2].ToString(), "s", str3[3].ToString(), "w", str3[4].ToString(), "q", str3[5].ToString(), "b", str3[6].ToString(), "s", str3[7].ToString(), "y",  

                        str3[9].ToString(), "j", str3[10].ToString(), "f" 

                     };

                    str = string.Concat(strArray);

                    break;



                case 12:

                    strArray = new string[] {  

                        str3[0].ToString(), "m", str3[1].ToString(), "q", str3[2].ToString(), "b", str3[3].ToString(), "s", str3[4].ToString(), "w", str3[5].ToString(), "q", str3[6].ToString(), "b", str3[7].ToString(), "s",  

                        str3[8].ToString(), "y", str3[10].ToString(), "j", str3[11].ToString(), "f" 

                     };

                    str = string.Concat(strArray);

                    break;

            }

            for (int i = 0; i < str.Trim().Length; i++)
            {

                switch (str[i])
                {

                    case '0':

                        str2 = str2 + "零";

                        break;



                    case '1':

                        str2 = str2 + "壹";

                        break;



                    case '2':

                        str2 = str2 + "贰";

                        break;



                    case '3':

                        str2 = str2 + "叁";

                        break;



                    case '4':

                        str2 = str2 + "肆";

                        break;



                    case '5':

                        str2 = str2 + "伍";

                        break;



                    case '6':

                        str2 = str2 + "陆";

                        break;



                    case '7':

                        str2 = str2 + "柒";

                        break;



                    case '8':

                        str2 = str2 + "捌";

                        break;



                    case '9':

                        str2 = str2 + "玖";

                        break;



                    case 'b':

                        str2 = str2 + " 佰 ";

                        break;



                    case 'f':

                        str2 = str2 + " 分 ";

                        break;



                    case 'j':

                        str2 = str2 + " 角 ";

                        break;



                    case 'm':

                        str2 = str2 + " 亿 ";

                        break;



                    case 'q':

                        str2 = str2 + " 仟 ";

                        break;



                    case 's':

                        str2 = str2 + "拾";

                        break;



                    case 'w':

                        str2 = str2 + " 万 ";

                        break;



                    case 'y':

                        str2 = str2 + " 元 ";

                        break;

                }

            }

            return str2;

        } 



    }
}
