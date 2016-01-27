using System.Collections.Generic;

namespace TCEPORT.TC.Tools
{
    public class PageUtil
    {
        public static dynamic WrapByPage(object data, int count)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            result.Add("success", true);
            result.Add("total", count);
            result.Add("data", data);
            return result;
        }
    }
}