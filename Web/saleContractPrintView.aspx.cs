using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web
{
    public partial class saleContractPrintView : System.Web.UI.Page
    {
        public static string salebillNo = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                salebillNo = Request.QueryString["saleBillNo"].ToString();
            }
        }
    }
}