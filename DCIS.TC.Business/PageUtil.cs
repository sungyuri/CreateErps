using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;


namespace TCEPORT.TC.Business
{
   public class PageUtil
    {
        public static dynamic WrapByPage(object data, int count)
        {
            return new Dictionary<string, object>
               {
                  { "success",true},
                  { "total",count},
                  { "data",data}
               };
        }

        public static string GetDataByPage(int start, int limit, string strSql, string strOrderBy)
        {
            string strPageSql = string.Format(@"select * from (select * from ({0}) where ROWNUM<={1} minus select * from ({0}) 
                                                where  ROWNUM<={2}) order by {3} desc", strSql, start + limit, start, strOrderBy);
            return strPageSql;
        }

        public static string GetDataByPage(int start, int limit, string strSql)
        {
            string strPageSql = string.Format(@"select * from ({0}) where ROWNUM<={1} minus select * from ({0}) 
                                                where  ROWNUM<={2}", strSql, start + limit, start);
            return strPageSql;
        }
    }


    /// <summary> 
   /// sql分页语句辅助类
    /// </summary>
    public class OracleUtil
    {
        /// <summary>分页方法
        /// 
        /// </summary>
        /// <param name="sql">原始语句</param>
        /// <param name="start">起始</param>
        /// <param name="limit">每页显示数目</param>
        /// <returns>带有分页的SQL语句</returns>
        public static String PreparePageSqlString(string sql, int start, int limit)
        {
            var pagingSelect = new StringBuilder();
            pagingSelect.Append("select rowb_.* from ( select row_.*, ROW_NUMBER() OVER(ORDER BY row_.ROWNUM asc) AS rownum_ from ( ");
            pagingSelect.Append(sql);
            pagingSelect.Append(" ) row_ where rownum <= {0}) rowb_ where rownum_ > {1}");

            #region Winform和ASP.NET 下都 打印出sql语句
            Console.WriteLine(value: String.Format(pagingSelect.ToString(), start + limit, start));
            Debug.WriteLine(message: String.Format(pagingSelect.ToString(), start + limit, start));
            #endregion

            return String.Format(pagingSelect.ToString(), start + limit, start);
        }
    }
}
