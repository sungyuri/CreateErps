using System;
using System.Data;
using System.Diagnostics;
using System.Dynamic;
using DCIS.Persistence;
using TCEPORT.TC.Business.Common;
using System.Web;


namespace TCEPORT.TC.Business
{
   public class PublicDictionary
    {

       public dynamic GetComboData(int start, int limit, string strOrderBy, dynamic data)
       {
           string type = HttpContext.Current.Request.QueryString["type"].ToString();
           string strSql = " ";
           if (type.Equals("PortCode"))
           {
               strSql = @" select KEY_VALUE,KEY_TEXT,KEY_TEXT_EN from TRAN_PORT_CODE  where 1=1  ";
               if (data != null)
               {
                   if (data.name != null && data.name != "")
                   {
                       strSql += string.Format(@" and  KEY_VALUE like '%{0}%' OR KEY_TEXT like '%{0}%' OR KEY_TEXT_EN like '%{0}%' ", data.name);
                   }

                   //if (data.KEY_TEXT != null && data.KEY_TEXT != "")
                   //{
                   //    strSql += string.Format(@" and KEY_TEXT like '%{0}%'", data.KEY_TEXT);
                   //}

                   //if (data.KEY_TEXT_EN != null && data.KEY_TEXT_EN != "")
                   //{
                   //    strSql += string.Format(@" and KEY_TEXT_EN like '%{0}%'", data.KEY_TEXT_EN);
                   //}
                   //if (data.PORT_TYPE_CODE != null && data.PORT_TYPE_CODE != "")
                   //{
                   //    strSql += string.Format(@" and PORT_TYPE_CODE like '%{0}%'", data.PORT_TYPE_CODE);
                   //}
                   
                   //if (data.NATION_CODE != null && data.NATION_CODE != "")
                   //{
                   //    strSql += string.Format(@" and NATION_CODE like '%{0}%'", data.NATION_CODE);
                   //}
                   //if (data.AREA_CODE != null && data.AREA_CODE != "")
                   //{
                   //    strSql += string.Format(@" and AREA_CODE like '%{0}%'", data.AREA_CODE);
                   //}
               }
               strSql += string.Format(@" and key_type like '{0}'", type);
               strSql += @"  ORDER BY key_order ";
           }
           else
           {
               //SELECT A.KEY_VALUE,A.KEY_TEXT,A.KEY_TEXT_EN FROM (SELECT KEY_VALUE,KEY_TEXT,KEY_TEXT_EN  FROM TRAN_KEY  WHERE KEY_TYPE LIKE 'Nationality' AND DEL_FLAG='0') A  WHERE 1=1 
               strSql = string.Format(@" SELECT A.KEY_VALUE,A.KEY_TEXT,A.KEY_TEXT_EN FROM (SELECT KEY_VALUE,KEY_TEXT,KEY_TEXT_EN  FROM TRAN_KEY  WHERE KEY_TYPE LIKE '{0}' AND DEL_FLAG='0' ORDER BY key_order) A  WHERE 1=1  ", type);
               if (data != null)
               {
                   if (data.name != null && data.name != "")
                   {
                       strSql += string.Format(@" and A.KEY_VALUE like '%{0}%'  OR A.KEY_TEXT like '%{0}%'  OR A.KEY_TEXT_EN like '%{0}%' ", data.name);
                   }

                   //if (data.KEY_TEXT != null && data.KEY_TEXT != "")
                   //{
                   //    strSql += string.Format(@" and KEY_TEXT like '%{0}%'", data.KEY_TEXT);
                   //}

                   //if (data.KEY_TEXT_EN != null && data.KEY_TEXT_EN != "")
                   //{
                   //    strSql += string.Format(@" and KEY_TEXT_EN like '%{0}%'", data.KEY_TEXT_EN);
                   //}
               }
           }
         

           string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
           DataTable dtTmp = DBUtil.Fill(pagedSql);
           int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
           return PageUtil.WrapByPage(dtTmp, count);
       }

       public void backMethod()
       {
           //
       }

    }
}
