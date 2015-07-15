using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.SessionState;
using DCIS.ExtJs.Tools;
using DCIS.Persistence;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using WebApi.Exceptions;

namespace WebApi
{
    /// <summary>
    /// 自定义http处理程序
    /// </summary>
    public class MyHttpHandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }

    /// <summary>
    /// http模块拦截器
    /// </summary>
    public class Interceptor : IHttpModule
    {
        /// <summary>
        /// 类型信息
        /// </summary>
        protected class TypeInfo
        {
            /// <summary>
            /// 类型名
            /// </summary>
            public string TypeName
            {
                get;
                set;
            }

            /// <summary>
            /// 类型全名
            /// </summary>
            public string FullName
            {
                get;
                set;
            }

            /// <summary>
            /// 类型
            /// </summary>
            public Type ClassType
            {
                get;
                set;
            }
        }

        /// <summary>
        /// 应用程式类型列表
        /// </summary>
        private static readonly List<TypeInfo> ApiTypes = new List<TypeInfo>();

        /// <summary>
        /// http处理程序
        /// </summary>
        private static readonly IHttpHandler Handler = new MyHttpHandler();

        /// <summary>
        /// 缓存类型
        /// </summary>
        public static Dictionary<string, Type> typeCache = new Dictionary<string, Type>();

        /// <summary>
        /// 构造函数
        /// </summary>
        public Interceptor()
        {
            try
            {
                // 初始化应用程式
                InitApiAssembly();
            }
            catch (Exception ex)
            {
                // 调用此Api产生的错误日志记录
                var exp = ex.GetBaseException();
                var sb = new StringBuilder();
                sb.Append("当前时间:" + DateTime.Now + "\r\n");
                sb.Append("错误信息:" + exp.Message + "\r\n");
                sb.Append("出错方法名:" + exp.TargetSite.Name + "\r\n");
                if (exp.TargetSite.DeclaringType != null)
                    sb.Append("出错类:" + exp.TargetSite.DeclaringType.FullName + "\r\n");
                sb.Append("出错堆栈:" + exp.StackTrace + "\r\n");
            }
        }

        /// <summary>
        /// 初始化应用程式
        /// </summary>
        private static void InitApiAssembly()
        {
            var assemblyNames = ConfigurationManager.AppSettings["WebApiAssembly"].Split(',');
            ArrayList assList = new ArrayList();
            foreach (string assemblyName in assemblyNames)
            {
                if (!String.IsNullOrWhiteSpace(assemblyName) && !assList.Contains(assemblyName.Trim()))
                {
                    assList.Add(assemblyName.Trim());
                    try
                    {
                        var assembly = Assembly.Load(assemblyName);
                        foreach (var type in assembly.GetTypes())
                        {
                            var apiType = ApiTypes.FirstOrDefault(p => p.TypeName == type.Name);
                            if (apiType == null)
                            {
                                ApiTypes.Add(new TypeInfo { TypeName = type.Name, FullName = type.FullName, ClassType = type });
                            }
                        }
                    }
                    catch (Exception exception)
                    {
                        var exp = exception.GetBaseException();
                        var path = HttpContext.Current.Request.MapPath("~/");
                        File.AppendAllText(@"c:\error.txt", assemblyName + "读取失败\r\n");
                        File.AppendAllText(@"c:\error.txt", exp.Message + "\r\n" + exp.StackTrace + "\r\n");
                    }
                }
            }
        }

        /// <summary>
        /// http模块初始化
        /// </summary>
        /// <param name="context">http应用</param>
        public void Init(HttpApplication context)
        {
            context.AcquireRequestState += new EventHandler(context_AcquireRequestState);
            context.PostMapRequestHandler += new EventHandler(context_PostMapRequestHandler);
            context.PreRequestHandlerExecute += new EventHandler(context_PreRequestHandlerExecute);
            context.Error += new EventHandler(context_Error);
        }

        /// <summary>
        /// 完善AcquireRequestState方法，然后判断session过期
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void context_AcquireRequestState(object sender, EventArgs e)
        {
            HttpApplication app = (HttpApplication)sender;
            if (app.Context.Request.UrlReferrer != null)
            {
                string urlRef = app.Context.Request.UrlReferrer.ToString();
                string url = app.Context.Request.Url.ToString();
                if (urlRef.IndexOf("Login") > -1 || url.IndexOf("Logout") > -1 || app.Context.Session == null || url.IndexOf("Login") > -1)
                {

                }
                else
                {
                    if (app.Context.Session["UserCode"] == null)
                    {
                        app.Context.Response.StatusCode = 999;
                        app.Context.Response.Write("登录超时，请重新登录！");
                        app.Context.Response.End();
                    }
                }
            }
        }

        /// <summary>
        /// 当ASP.NET已将当前请求映射到相应的事件处理程序时发生
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void context_PostMapRequestHandler(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;
            if (context.Handler is IReadOnlySessionState || context.Handler is IRequiresSessionState)
            {
                return;
            }
            if (context.Request.AppRelativeCurrentExecutionFilePath != null)
            {
                string url = context.Request.PathInfo;
                if (String.IsNullOrWhiteSpace(url) || url.IndexOf("api/") < 0)
                    url = context.Request.RawUrl;

                if (url.IndexOf("api/") < 0)
                    return;

                string[] urls = url.Substring(url.IndexOf("api/") + 4).Split('/');
                urls = urls.Where(p => p != "").ToArray();
                if (urls.Length < 2)
                {
                    return;
                }
            }
            else
            {
                //记录错误
                string path = HttpContext.Current.Request.MapPath("~/");
                File.AppendAllText(@"c:\error.txt", context.Request.AppRelativeCurrentExecutionFilePath + "无法获取\r\n");
            }

            context.Handler = Handler;
        }

        /// <summary>
        /// 恰好在ASP.NET开始执行事件处理程序(如某页或某个XML Web Service)前发生
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;
            if (context.Request.AppRelativeCurrentExecutionFilePath != null)
            {
                string url = context.Request.PathInfo;
                if (String.IsNullOrWhiteSpace(url) || url.IndexOf("api/") < 0)
                    url = context.Request.RawUrl;

                #region Add By JackyChen 2013-11-07
                if (context.Handler != null)
                {
                    if ("FileSaveHandler".Equals(context.Handler.ToString()) || "MergeSubmitHandler".Equals(context.Handler.ToString()))
                    {
                        object mpath = context.Request.Form["mathodPath"];
                        if (mpath != null && !String.IsNullOrWhiteSpace(mpath.ToString()))
                            url = mpath.ToString().Trim();
                        else
                            url = String.Empty;
                    }
                }

                #endregion Add By JackyChen 2013-11-07

                if (url.IndexOf("api/") < 0)
                    return;

                string[] urls = url.Substring(url.IndexOf("api/") + 4).Split('/');
                urls = urls.Where(p => p != "").ToArray();
                if (urls.Length < 2)
                    return;

                string className = urls[0];
                string actionName = urls[1];
                if (actionName.IndexOf('?') > -1)
                    actionName = actionName.Substring(0, actionName.IndexOf('?'));
                Type type = GetTypeByName(className);
                if (type == null)
                    throw new Exception("要调用的类" + className + "没有找到,请检查是否定义此类。");

                MethodInfo method = type.GetMethod(actionName, BindingFlags.Public | BindingFlags.IgnoreCase | BindingFlags.Instance);

                if (method == null)
                    throw new Exception("要调用的方法" + actionName + "没有找到,请检查是否包含此方法!");

                object[] paramList = null;
                ParameterInfo[] methodParams = method.GetParameters();
                if (context.Request.RequestType == "POST")
                {
                    if ("FileSaveHandler".Equals(context.Handler.ToString()))
                        paramList = PostFileDataConvert(context, methodParams);
                    else if ("MergeSubmitHandler".Equals(context.Handler.ToString()))
                        paramList = PostMergeFileDataConvert(context, methodParams);
                    else
                        paramList = PostDataConvert(context, methodParams);
                }
                else if (context.Request.RequestType == "GET")
                    paramList = context.Request.QueryString.Count != 0 ? GetDataConvertByQueryString(context, methodParams) : GetDataConvertByREST(methodParams, urls);

                //原生对象，有.NET反射生成。
                object originalObj = Activator.CreateInstance(type);
                object reVal = method.Invoke(originalObj, paramList);
                string serializeResult = JsonConvert.SerializeObject(reVal, new JavaScriptDateTimeConverter());
                context.Response.AddHeader("Access-Control-Allow-Origin", "*");
                context.Response.ContentEncoding = Encoding.UTF8;
                context.Response.Write(serializeResult);
            }
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        /// <summary>
        /// 当引发未经处理的异常时发生
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void context_Error(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;
            Exception ex = context.Error;
            if (ex == null)
                return;
            else
                ex = ex.GetBaseException();
            context.Response.StatusCode = 200;
            context.Response.Clear();
            dynamic result = new ExpandoObject();
            result.success = false;
            if (ex.GetType() == typeof(InvalidFieldException))
            {
                InvalidFieldException exp = (InvalidFieldException)ex;
                result.Type = "InvalidFieldException";
                result.value = new
                {
                    exp.Message,
                    exp.ArgumentName,
                    exp.ErrorType,
                    exp.FieldName,
                    exp.FieldValue
                };
            }
            else if (ex.GetType() == typeof(InvalidFieldArrayException))
            {
                result.Type = "InvalidFieldArrayException";
                result.value = ((InvalidFieldArrayException)ex).InvalidFields;
            }
            else if (ex.Message.Contains("文件不存在"))
            {
                result.Type = ex.GetType().Name;
                result.value = "文件路径" + context.Request.PhysicalPath + "没有找到";
            }
            else
            {
                result.Type = ex.GetType().Name;
                result.value = ex;
            }
            string value = JsonConvert.SerializeObject(result, new JavaScriptDateTimeConverter());
            context.Response.Write(value);
            context.ClearError();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        /// <summary>
        /// 提交数据转换
        /// </summary>
        /// <param name="context">http表单</param>
        /// <param name="methodParams">方法参数</param>
        /// <returns></returns>
        internal object[] PostDataConvert(HttpContext context, ParameterInfo[] methodParams)
        {
            List<object> paramList = new List<object>();
            if (context.Request.Files.Count > 0)
                return paramList.ToArray();
            if (methodParams == null)
                return paramList.ToArray();
            if (methodParams.Length == 0)
                return paramList.ToArray();

            StreamReader sr = new StreamReader(context.Request.InputStream, Encoding.UTF8);
            string json = sr.ReadToEnd();
            JToken jObject = null;
            try
            {
                jObject = (JToken)JsonConvert.DeserializeObject(json);
            }
            catch { }
            if (jObject == null)
            {
                try
                {
                    jObject = new JValue(json);
                }
                catch { }
            }
            if (jObject == null)
                jObject = new JObject();

            JToken jToken = null;
            JToken originajToken = null;
            for (int i = 0; i < methodParams.Length; i++)
            {
                var paramName = methodParams[i].Name;
                if (String.IsNullOrWhiteSpace(jObject.ToString()))
                {
                    jToken = null;
                }
                else if (jObject.GetType() == typeof(JValue))
                {
                    jToken = jObject;
                }
                else if (jObject.GetType() == typeof(JArray))
                {
                    jToken = ((JArray)jObject)[i];
                }
                else
                {
                    jToken = jObject.OfType<JProperty>().FirstOrDefault(p => p.Name.ToLower() == paramName.ToLower());
                    originajToken = jObject.OfType<JProperty>().FirstOrDefault(p => p.Name.ToLower() == "originaldata");
                }
                object param = null;
                if (originajToken != null)
                {
                    object originaparam = ConvertJToken(originajToken, methodParams[i]);
                    param = ConvertJToken(jToken, methodParams[i]);

                    PropertyInfo[] originapis = originaparam.GetType().GetProperties();
                    PropertyInfo[] pis = param.GetType().GetProperties();

                    for (int x = 0; x < pis.Length; x++)
                    {
                        if (pis[x].GetValue(param, null) == null && originapis[x].GetValue(originaparam, null) != null)
                        {
                            pis[x].SetValue(param, "", null);
                        }
                    }
                }
                else
                {
                    param = ConvertJToken(jToken, methodParams[i]);
                }
                paramList.Add(param);
            }
            return paramList.ToArray();
        }

        /// <summary>
        /// 提交数据转换[支持多参数、多form、多grid(包含文件上传)]
        /// Add By JackyChen 2014-02-12
        /// </summary>
        /// <param name="context">http表单</param>
        /// <param name="methodParams">方法参数</param>
        /// <returns></returns>
        internal object[] PostMergeFileDataConvert(HttpContext context, ParameterInfo[] methodParams)
        {
            List<object> paramList = new List<object>();
            if (context.Request.Files.Count == 0)
                return PostDataConvert(context, methodParams);
            if (methodParams == null)
                return paramList.ToArray();
            if (methodParams.Length == 0)
                return paramList.ToArray();

            object objUploadParam = context.Request.Form["uploadParamName"];
            if (objUploadParam != null && !String.IsNullOrWhiteSpace(objUploadParam.ToString()))
            {
                // 获取上传文件所在实体的参数名
                string uploadParamName = JsonConvert.DeserializeObject(objUploadParam.ToString()).ToString().Trim();

                #region 获取所有非上传参数信息

                Dictionary<string, JToken> dicParam = new Dictionary<string, JToken>();
                foreach (string key in context.Request.Form.Keys)
                {
                    if (!key.Equals("mathodPath") && !key.Equals("uploadParamName") && !dicParam.ContainsKey(key))
                    {
                        object objTmp = context.Request.Form[key];
                        if (objTmp != null && !String.IsNullOrWhiteSpace(objTmp.ToString()))
                        {
                            dicParam.Add(key, (JToken)JsonConvert.DeserializeObject(objTmp.ToString()));
                        }
                    }
                }

                #endregion 获取所有非上传参数信息

                #region 分析保存文件上传文件信息

                Dictionary<string, Byte[]> dicFiles = new Dictionary<string, Byte[]>();
                HttpFileCollection files = context.Request.Files;
                foreach (string key in files.Keys)
                {
                    if (!dicFiles.ContainsKey(key))
                    {
                        HttpPostedFile oFile = files[key];
                        if (oFile.ContentLength > 0)
                        {
                            Byte[] buffer = new Byte[oFile.ContentLength];
                            oFile.InputStream.Read(buffer, 0, oFile.ContentLength);
                            dicFiles.Add(key, buffer);
                        }
                    }
                }

                #endregion 分析保存文件上传文件信息

                for (int i = 0; i < methodParams.Length; i++)
                {
                    ParameterInfo pInfo = methodParams[i];

                    object param = null;
                    if (dicParam.ContainsKey(pInfo.Name))
                    {
                        JToken jToken = dicParam[pInfo.Name];
                        if (pInfo.Name.Equals(uploadParamName) && jToken.GetType() == typeof(JObject))
                        {
                            foreach (string key in dicFiles.Keys)
                            {
                                ((JObject)jToken).Remove(key);
                                ((JObject)jToken).Add(new JProperty(key, dicFiles[key]));
                            }
                        }
                        param = ConvertJToken(jToken, pInfo);
                    }
                    paramList.Add(param);
                }
            }
            return paramList.ToArray();
        }

        /// <summary>
        /// 提交数据转换(包含文件上传)
        /// Add By JackyChen 2013-11-07
        /// </summary>
        /// <param name="context">http表单</param>
        /// <param name="methodParams">方法参数</param>
        /// <returns></returns>
        internal object[] PostFileDataConvert(HttpContext context, ParameterInfo[] methodParams)
        {
            List<object> paramList = new List<object>();
            if (methodParams == null || methodParams.Length == 0)
                return paramList.ToArray();

            JToken jObject = new JObject();

            #region 获取所有传入的参数信息(不包含上传文件)

            ArrayList fieldList = new ArrayList();
            foreach (string key in context.Request.Form.Keys)
            {
                if (!key.Equals("mathodPath"))
                {
                    ((JObject)jObject).Add(new JProperty(key, context.Request.Form[key]));
                    if (!fieldList.Contains(key))
                        fieldList.Add(key);
                }
            }

            #endregion 获取所有传入的参数信息(不包含上传文件)

            #region 分析保存文件上传文件信息

            HttpFileCollection files = context.Request.Files;
            if (files.Count > 0)
            {
                foreach (string key in files.Keys)
                {
                    if (!fieldList.Contains(key))
                    {
                        HttpPostedFile oFile = files[key];
                        if (oFile.ContentLength > 0)
                        {
                            Byte[] buffer = new Byte[oFile.ContentLength];
                            oFile.InputStream.Read(buffer, 0, oFile.ContentLength);
                            ((JObject)jObject).Add(new JProperty(key, buffer));
                        }
                    }
                }
            }

            #endregion 分析保存文件上传文件信息

            #region 参数格式转换

            for (int i = 0; i < methodParams.Length; i++)
            {
                object param = ConvertJToken(jObject, methodParams[i]);
                paramList.Add(param);
            }

            #endregion 参数格式转换

            return paramList.ToArray();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="jToken"></param>
        /// <param name="methodParam"></param>
        /// <returns></returns>
        private object ConvertJToken(JToken jToken, ParameterInfo methodParam)
        {
            if (jToken == null || String.IsNullOrWhiteSpace(jToken.ToString()))
            {
                if (methodParam.IsOptional)
                    return methodParam.DefaultValue;
                if (methodParam.ParameterType.IsValueType)
                    return Activator.CreateInstance(methodParam.ParameterType);
                return null;
            }
            else
            {
                JToken value = null;
                if (jToken.GetType() == typeof(JValue) || jToken.GetType() == typeof(JArray))
                    value = jToken;
                else
                    value = jToken.GetType() == typeof(JObject) ? jToken : jToken.First;
                using (JTokenReader jsonReader = new JTokenReader(value))
                {
                    object parameter = value.ToString() == "{}" ? null : Deserialize(jsonReader, value, methodParam.ParameterType);
                    if (parameter is string && (string)parameter == "")
                        parameter = null;
                    return parameter;
                }
            }
        }

        /// <summary>
        /// 根据类名获取类型
        /// </summary>
        /// <param name="className">类名</param>
        /// <returns></returns>
        public static Type GetTypeByName(string className)
        {
            className = className.ToLower();
            List<TypeInfo> typeInfoList = new List<TypeInfo>();
            if (className.IndexOf('.') > -1)
            {
                typeInfoList = (from p in ApiTypes where p.FullName.ToLower() == className.ToLower() select p).ToList<TypeInfo>();
                if (typeInfoList.Count == 0)
                    typeInfoList = (from p in ApiTypes where p.FullName.ToLower() == (p.ClassType.Namespace + "." + className.TrimStart('.')).ToLower() select p).ToList<TypeInfo>();
            }
            else
            {
                typeInfoList = (from p in ApiTypes where p.TypeName.ToLower() == className.ToLower() select p).ToList<TypeInfo>();
            }
            if (typeInfoList.Count == 1)
                return typeInfoList[0].ClassType;
            if (typeInfoList.Count > 1)
                throw new Exception("要调用的类" + className + "存在重复,请输入完整类名或检查重复的类!");
            return null;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        /// <param name="methodParams"></param>
        /// <returns></returns>
        private object[] GetDataConvertByQueryString(HttpContext context, ParameterInfo[] methodParams)
        {
            List<object> paramList = new List<object>();
            foreach (ParameterInfo methodParam in methodParams)
            {
                var value = context.Request.QueryString[methodParam.Name];
                if (value == null)
                {
                    if (methodParam.IsOptional)
                    {
                        paramList.Add(methodParam.DefaultValue);
                        continue;
                    }
                    paramList.Add(methodParam.ParameterType.IsValueType
                                      ? Activator.CreateInstance(methodParam.ParameterType)
                                      : null);
                }
                else
                {
                    using (JTokenReader jsonReader = new JTokenReader(value))
                    {
                        paramList.Add(Deserialize(jsonReader, value, methodParam.ParameterType));
                    }
                }
            }
            return paramList.ToArray();
        }

        private object[] GetDataConvertByREST(ParameterInfo[] methodParams, string[] urls)
        {
            List<object> paramList = new List<object>();
            for (int i = 0; i < methodParams.Length; i++)
            {
                int order = 2 + i;
                if (order < urls.Length)
                {
                    JValue value = new JValue(urls[order]);
                    using (JTokenReader jsonReader = new JTokenReader(value))
                    {
                        paramList.Add(Deserialize(jsonReader, value, methodParams[i].ParameterType));
                    }
                }
                else
                {
                    if (methodParams[i].IsOptional)
                    {
                        paramList.Add(methodParams[i].DefaultValue);
                        continue;
                    }
                    paramList.Add(methodParams[i].ParameterType.IsValueType
                                      ? Activator.CreateInstance(methodParams[i].ParameterType)
                                      : null);
                }
            }
            return paramList.ToArray();
        }

        public void Dispose()
        {
        }

        public object Deserialize(JTokenReader jsonReader, object jtoken, Type entityType)
        {
            if (entityType.IsSubclassOf(typeof(BaseEntity)) && jtoken is JToken)
            {
                #region Set Entity

                Dictionary<string, object> dirValue = new Dictionary<string, object>();
                JToken tJToken = ((JToken)jtoken).First;
                JToken jt = tJToken;
                object objTmp = null;
                while (jt != null)
                {
                    if (jt.Type == JTokenType.Property && !dirValue.ContainsKey(((JProperty)jt).Name))
                    {
                        objTmp = ((JProperty)jt).Value;
                        if (objTmp.GetType() == typeof(JValue))
                            dirValue.Add(((JProperty)jt).Name, ((JValue)objTmp).Value);
                        else if (objTmp.GetType() == typeof(JArray))
                            dirValue.Add(((JProperty)jt).Name, ((JArray)objTmp));
                        else
                            dirValue.Add(((JProperty)jt).Name, objTmp);
                    }
                    jt = jt.Next;
                }
                var entity = Activator.CreateInstance(entityType);
                PropertyInfo[] proprttyInfos = entity.GetType().GetProperties();
                bool isNullEntity = true;
                foreach (PropertyInfo pi in proprttyInfos)
                {
                    if (dirValue.ContainsKey(pi.Name))
                    {
                        #region Get Field DataType

                        Type realType = pi.PropertyType;
                        string fullTypeName = pi.PropertyType.FullName;
                        if (fullTypeName.IndexOf("System.Nullable") > -1)
                        {
                            fullTypeName = fullTypeName.Replace("System.Nullable`1[[", "").TrimEnd(']');
                            try
                            {
                                realType = Type.GetType(fullTypeName);
                            }
                            catch
                            {
                                realType = typeof(string);
                            }
                        }

                        #endregion Get Field DataType

                        var objValue = dirValue[pi.Name];
                        if (objValue == null || String.IsNullOrWhiteSpace(objValue.ToString()))
                        {
                            ((BaseEntity)entity).SetDBNull(pi.Name);
                        }
                        else if (realType == typeof(DateTime) && Convert.ToDateTime(objValue) == DateTime.MinValue)
                        {
                            ((BaseEntity)entity).SetDBNull(pi.Name);
                        }
                        else if (CommTools.IsNumberType(realType) && Convert.ToDecimal(objValue) == Decimal.MinValue)
                        {
                            ((BaseEntity)entity).SetDBNull(pi.Name);
                        }
                        else
                        {
                            pi.SetValue(entity, Convert.ChangeType(objValue, realType), null);
                            isNullEntity = false;
                        }
                    }

                    // 未涉及的值不予修改
                    // else
                    // {
                    //     if (pi.CanWrite && !pi.Name.Equals("ConnectionKey"))
                    //         ((BaseEntity)entity).SetDBNull(pi.Name);
                    // }
                }
                if (isNullEntity)
                    return null;
                return entity;

                #endregion Set Entity
            }
            else if (entityType.IsArray)
            {
                #region Set Entity Array

                Type memberType = GetTypeByName(entityType.FullName.Replace("[]", ""));
                Array resultArr = Array.CreateInstance(memberType, ((JContainer)jtoken).Count);
                JToken tJToken = ((JToken)jtoken).First;
                JToken jt = tJToken;
                int i = 0;
                while (jt != null)
                {
                    resultArr.SetValue(Deserialize(jsonReader, jt, memberType), i);
                    i++;
                    jt = jt.Next;
                }
                return resultArr;

                #endregion Set Entity Array
            }
            else if (entityType.FullName.StartsWith("System.Collections.Generic.List`1"))
            {
                #region Set Entity List

                string innerTypeName = entityType.FullName.Substring(entityType.FullName.IndexOf("[")).Replace("[", "").Replace("]", "");
                Type memberType = GetTypeByName(innerTypeName.Substring(0, innerTypeName.IndexOf(',')));
                if (memberType != null && memberType.IsSubclassOf(typeof(BaseEntity)))
                {
                    Type tmpType = typeof(List<>).MakeGenericType(memberType);
                    object resultList = Activator.CreateInstance(tmpType);
                    IList ilist = resultList as IList;

                    JToken tJToken = ((JToken)jtoken).First;
                    JToken jt = tJToken;
                    int i = 0;
                    while (jt != null)
                    {
                        ilist.Add(Deserialize(jsonReader, jt, memberType));
                        i++;
                        jt = jt.Next;
                    }

                    return resultList;
                }
                else
                {
                    JsonSerializer serializer = new JsonSerializer();
                    return serializer.Deserialize(jsonReader, entityType);
                }

                #endregion Set Entity List
            }
            else if (jtoken.GetType() == typeof(JArray))
            {
                JsonSerializer serializer = new JsonSerializer();
                return serializer.Deserialize(jsonReader, typeof(JArray));
            }
            else
            {
                JsonSerializer serializer = new JsonSerializer();
                return serializer.Deserialize(jsonReader, entityType);
            }
        }
    }
}