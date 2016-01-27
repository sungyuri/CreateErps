using System;
using System.Reflection;
using Newtonsoft.Json.Linq;

namespace TCEPORT.TC.Tools
{
    public class JsonHelper
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
            var jsonData = ((JToken)data).First;//获取第一个项
            while (jsonData != null)
            {
                name = ((JProperty)jsonData).Name;
                info = t.GetProperty(name);//获取对象的属性
                if (info != null)
                {
                    if (info.PropertyType.Name.Contains("Int")) //数字类型时
                    {
                        if (!((JProperty)(jsonData)).Value.ToString().Equals(""))
                            info.SetValue(originalObj, Int32.Parse(((JProperty)(jsonData)).Value.ToString()), null);//赋值
                    }
                    else if (info.PropertyType.Name.Equals("DateTime"))
                    {
                        if (!((JProperty)(jsonData)).Value.ToString().Equals(""))
                        {
                            if (!((JProperty)(jsonData)).Value.Type.ToString().Contains("Array"))
                                info.SetValue(originalObj, DateTime.Parse(((JProperty)(jsonData)).Value.ToString()), null);//赋值
                        }
                    }
                    else
                    {
                        info.SetValue(originalObj, ((JProperty)(jsonData)).Value.ToString(), null);//赋值
                    }
                }
                jsonData = jsonData.Next;
            }

            return originalObj;
        }
    }
}