using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Newtonsoft.Json.Linq;

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
    }
}
