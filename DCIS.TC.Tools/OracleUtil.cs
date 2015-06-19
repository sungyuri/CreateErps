using System;
using System.Text;

namespace TCEPORT.TC.Tools
{
    public class OracleUtil
    {
        public static string PreparePageSqlString(string sql, int start, int limit)
        {
            StringBuilder pagingSelect = new StringBuilder();
            pagingSelect.Append("SELECT * FROM (SELECT ITB.*, ROWNUM ROWNUM_ FROM (");
            pagingSelect.Append(sql);
            pagingSelect.Append(") ITB WHERE ROWNUM <= {0}) WHERE ROWNUM_ > {1}");
            return String.Format(pagingSelect.ToString(), start + limit, start);
        }
    }
}