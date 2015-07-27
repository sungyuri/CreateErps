using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using DCIS.Persistence;
using TCEPORT.TC.Data;
using TCEPORT.TC.Business.Common;
using DCIS.DbAccess;
using System.Web;

namespace TCEPORT.TC.Business
{
    public class SaleContract_BLL
    {
        /// <summary>
        /// 销售合同
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="strOrderBy"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
        {

            string strSql = @" SELECT * FROM SysSaleContract WHERE StepNo=0 ";
            int PositionCode = int.Parse(HttpContext.Current.Session["PositionCode"].ToString());
            string UserCode = HttpContext.Current.Session["UserCode"].ToString();
            if (PositionCode==1)
            {
                strSql += string.Format(@" and PurUserCode='{0}' ", UserCode);
            }
            if (data != null)
            {
                if (data.CustomerName != null && data.CustomerName != "")
                {
                    strSql += string.Format(@" and CustomerName like '%{0}%'", data.CustomerName);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        /// <summary>
        /// 获取销售审批记录
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="strOrderBy"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public dynamic GetSaleAppLog(int start, int limit, string strOrderBy, dynamic data)
        {

            string strSql = @" SELECT [BillNo]
                                      ,[StepNo]
                                      ,[StepName]
                                      ,[FlowId]
                                      ,[AppUserCode]
                                      ,[AppUserName]
                                      ,[AppStep]
                                      ,[AppState]
                                      ,[AppNote1]
                                      ,[AppNote2]
                                      ,[AppNote3]
                                      ,[AppNote4]
                                      ,[AppNote5]
                                      ,[AppDataFirst]
                                      ,[AppDataLast]
                                      ,[AppPrescription]
                                      ,[UserName]
                                 FROM [ViewSaleContractAppLog] where 1=1  ";
            if (data != null)
            {
                if (data.BillNo != null && data.BillNo != "")
                {
                    strSql += string.Format(@" and BillNo ='{0}'", data.BillNo);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        /// <summary>
        /// 销售合同审批
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <param name="strOrderBy"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public dynamic GetAppRecord(int start, int limit, string strOrderBy, dynamic data)
        {
            string UserCode = HttpContext.Current.Session["UserCode"].ToString();
            string strSql = @" SELECT * FROM SysSaleContract WHERE AppUserCode like '%" + UserCode + "%' AND IsAppEnd='N' ";
            if (data != null)
            {
                if (data.CustomerName != null && data.CustomerName != "")
                {
                    strSql += string.Format(@" and CustomerName like '%{0}%'", data.CustomerName);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.BillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        public string UpdateAppRecord(string billNo, string stepNo, string appnote, string type)
        {
            string returnValue = "";
            string loginUserCode = HttpContext.Current.Session["UserCode"].ToString();
            string updateLogSql = "";
            string updateLogSqlBack = "";
            string updateContractSql = "";
            try
            {
                DBUtil.BeginTrans();
                string strAppStep = DBUtil.Fill(@" SELECT AppStep FROM SysFlowManyStep WHERE BillNo='" + billNo + "' ").Rows[0][0].ToString();
                string colNoteName = "AppNote" + strAppStep;//审核意见当前存储字段
                if (type == "back")//退回
                {
                    updateLogSql = @" UPDATE SysFlowManyStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE() WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                    updateLogSqlBack = @" UPDATE SysFlowManyStep SET AppState='N',AppStep=AppStep+1  WHERE BillNo='" + billNo + "' ";
                    updateContractSql = @" UPDATE SysSaleContract SET StepNo=0,AppUserCode='',StepName='制单'  WHERE BillNo='" + billNo + "' ";
                }
                else//通过审批
                {
                    if(stepNo=="1")
                    {
                        DataTable dtAppUser = DBUtil.Fill(@" SELECT  AppUserCode FROM SysFlowManyStep WHERE BillNo='"+billNo+"' AND StepNo=2  ");
                        string strAppUser = "";
                        if(dtAppUser.Rows.Count>0)
                        {
                            for(int i=0;i<dtAppUser.Rows.Count;i++)
                            {
                                strAppUser += dtAppUser.Rows[i][0].ToString() + ",";
                            }
                            strAppUser = strAppUser.Remove(strAppUser.Length - 1);
                        }
                        updateLogSql = @" UPDATE SysFlowManyStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y' WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                        updateContractSql = @" UPDATE SysSaleContract SET StepNo=2,AppUserCode='" + strAppUser + "',StepName='会审'  WHERE BillNo='" + billNo + "' ";
                    }
                    else if(stepNo=="2")
                    {
                        bool isManyEnd = true;//会审是否结束
                        string strCheckManyApp = @" SELECT AppState FROM SysFlowManyStep WHERE BillNo='"+billNo+"' AND StepNo=2 AND AppUserCode NOT IN('"+loginUserCode+"') ";
                        DataTable dtCheckManyApp = DBUtil.Fill(strCheckManyApp);
                        if (dtCheckManyApp.Rows.Count > 0)
                        {
                             for(int i=0;i<dtCheckManyApp.Rows.Count;i++)
                             {
                                 if(dtCheckManyApp.Rows[i][0].ToString()=="N")
                                 {
                                     isManyEnd = false;
                                     break;
                                 }
                             }
                        }
                        if (isManyEnd)//会审结束 步骤到3
                        {
                            DataTable dtAppUser = DBUtil.Fill(@" SELECT  AppUserCode FROM SysFlowManyStep WHERE BillNo='" + billNo + "' AND StepNo=3  ");
                            string strAppUser = "";
                            if (dtAppUser.Rows.Count > 0)
                            {
                                strAppUser = dtAppUser.Rows[0][0].ToString();
                            }
                            updateLogSql = @" UPDATE SysFlowManyStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y'  WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                            updateContractSql = @" UPDATE SysSaleContract SET StepNo=3,StepName='审定',AppUserCode='" + strAppUser + "'  WHERE BillNo='" + billNo + "' ";
                        }
                        else//会审没结束
                        {
                            DataTable dtAppUser = DBUtil.Fill(@" SELECT AppUserCode  FROM SysSaleContract WHERE BillNo='"+billNo+"' ");
                            string strAppUser = "";
                            if (dtAppUser.Rows.Count > 0)
                            {
                                strAppUser = dtAppUser.Rows[0][0].ToString();
                            }
                            int iStar = strAppUser.IndexOf(loginUserCode);
                            if ((iStar + loginUserCode.Length) < strAppUser.Length)
                            {
                                strAppUser = strAppUser.Remove(iStar, loginUserCode.Length + 1);
                            }
                            else
                            {
                                strAppUser = strAppUser.Remove(iStar-1, loginUserCode.Length +1);
                            }
                            updateLogSql = @" UPDATE SysFlowManyStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y'  WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                            updateContractSql = @" UPDATE SysSaleContract SET AppUserCode='" + strAppUser + "'  WHERE BillNo='" + billNo + "' ";
                        }                     
                    }
                    else//审定，结束审批流程
                    {
                        updateLogSql = @" UPDATE SysFlowManyStep SET " + colNoteName + "='" + appnote + "',AppDataLast=GETDATE(),AppState='Y'  WHERE BillNo='" + billNo + "' AND AppUserCode='" + loginUserCode + "' AND StepNo=" + stepNo + "  ";
                        updateContractSql = @" UPDATE SysSaleContract SET AppUserCode='',IsAppEnd='Y',StepNo=99,StepName='审核完成'  WHERE BillNo='" + billNo + "' ";
                    }
                }

                //执行SQL
                if(DBUtil.ExecuteNonQuery(updateLogSql)>0)
                {
                    returnValue = "true";
                }
                else
                {
                    returnValue = "false";
                    DBUtil.Rollback();
                    return returnValue;
                }
                if(updateLogSqlBack!="")
                {
                    if (DBUtil.ExecuteNonQuery(updateLogSqlBack) > 0)
                    {
                        returnValue = "true";
                    }
                    else
                    {
                        returnValue = "false";
                        DBUtil.Rollback();
                        return returnValue;
                    }
                }
                if (DBUtil.ExecuteNonQuery(updateContractSql) > 0)
                {
                    returnValue = "true";
                }
                else
                {
                    returnValue = "false";
                    DBUtil.Rollback();
                    return returnValue;
                }
                if( returnValue == "true")
                {
                    DBUtil.Commit();
                }
            }
            catch (Exception ex)
            {
                DBUtil.Rollback();
                returnValue = "出错信息：" + ex.ToString();
            }

            return returnValue;
        }

        public dynamic GetSaleContractDetail(int start, int limit, string strOrderBy, dynamic data)
        {
            //ViewSaleContractDetail
            string strSql = @" SELECT [SaleBillNo]
                              ,[GoodsCode]
                              ,[GoodsVersion]
                              ,[GoodsName]
                              ,[GoodsNo]
                              ,[GoodsCount]
                              ,[GoodsUnit]
                              ,[OutGoodsCount]
                              ,[STATE]
                              ,[Manufacturer]
                          FROM [ViewSaleContractDetail]
                          WHERE 1=1  ";
            if (data != null)
            {
                if (data.SaleBillNo != null && data.SaleBillNo != "")
                {
                    strSql += string.Format(@" and SaleBillNo like '%{0}%'", data.SaleBillNo);
                }
            }
            strSql = "SELECT QUERY.*,ROW_NUMBER() OVER(ORDER BY QUERY.SaleBillNo asc)  AS ROWNUM FROM (" + strSql + ") QUERY  ";
            string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
            DataTable dtTmp = DBUtil.Fill(pagedSql);
            int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0}) CC", strSql)).Rows[0][0].ToString());
            return PageUtil.WrapByPage(dtTmp, count);
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="type"></param>
        /// <param name="detailList"></param>
        /// <returns></returns>
        public string Update(SysSaleContract_Entity entity, string type, List<dynamic> detailList)
        {
            string returnValue = "";
            try
            {
                DBUtil.BeginTrans();
                string billNo=entity.BillNo;
                if (type == "save")
                {
                    entity.StepNo = 0;
                    entity.StepName = "制单";
                }
                else
                {
                    string flowStep = @" SELECT AppUserCode FROM SysFlowManyStep WHERE BillNo='" + billNo + "' AND StepNo=1  ";
                    DataTable flowDt = DBUtil.Fill(flowStep);
                    entity.StepNo = 1;
                    entity.AppUserCode = flowDt.Rows[0]["AppUserCode"].ToString();
                    entity.StepName = "初审";
                }
                entity.CreateTime = DateTime.Now;
                entity.IsStorage = "N";
                entity.PaidAmount = 0;
                entity.IsAppEnd = "N";
                entity.IsPayoff = "N";
                PublicRule.Update(entity);             

                #region 销售合同明细表

                string deleteSql = string.Format(@" DELETE FROM SysSaleContractDetail WHERE SaleBillNo ='{0}' ;", billNo);
                DBUtil.ExecuteNonQuery(deleteSql);
                if (detailList != null && detailList.Count > 0)
                {
                    string delSql = @"  INSERT INTO  SysSaleContractDetail(SaleBillNo, GoodsCode, GoodsCount, OutGoodsCount)
                                    VALUES 
                                      ";

                    #region 货物列表
                    if (detailList != null && detailList.Count > 0)
                    {
                        for (int i = 0; i < detailList.Count; i++)
                        {
                            delSql += string.Format(@"   ('{0}',{1},{2},0), ", billNo, detailList[i].GoodsCode, detailList[i].GoodsCount);
                        }
                    }
                    #endregion

                    delSql = delSql.Trim().TrimEnd(',');
                    DBUtil.ExecuteNonQuery(delSql);
                }
                DBUtil.Commit();
                returnValue = billNo;
                #endregion

            }
            catch (Exception ex)
            {
                // returnValue = "出错信息：" + ex.ToString();
                returnValue = "";
                DBUtil.Rollback();
            }
            return returnValue;
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="type"></param>
        /// <param name="detailList"></param>
        /// <returns></returns>

        public string Insert(SysSaleContract_Entity entity, string type, List<dynamic> detailList)
        {
            string returnValue = "";
            try
            {
                DBUtil.BeginTrans();
                string billNo = new SqlHelper().getTableNo("SysSaleContract", "BillNo", "SC");
                entity.BillNo = billNo;

                #region 生成合同审批步骤
                string flowQuery = "   SELECT * FROM  SysFlowMany WHERE FlowCdode='SC' ";
                DataTable flowDt = DBUtil.Fill(flowQuery);
                string flowStep = @"   INSERT INTO  SysFlowManyStep
                                       (BillNo, StepNo, StepName, FlowId, AppUserCode)
                                       VALUES
                                        ";

                //   string sqlUserName=string.Format(@" SELECT UserName from SysUser   "); 审批人名目前通过连接查询得到，暂不存入数据库
                flowStep += string.Format(@"  ('{0}',1,'{1}',{2},'{3}'),  ", billNo, "初审",
                                                        flowDt.Rows[0]["FlowId"].ToString(),
                                                    flowDt.Rows[0]["FirstUser"].ToString());
                string[] secondArr = flowDt.Rows[0]["ManyUser"].ToString().Split(',');
                for (int j = 0; j < secondArr.Length; j++)
                {
                    flowStep += string.Format(@"  ('{0}',2,'{1}',{2},'{3}'),  ", billNo, "会审",
                                                      flowDt.Rows[0]["FlowId"].ToString(),
                                                  secondArr[j]);
                }
                flowStep += string.Format(@"  ('{0}',3,'{1}',{2},'{3}');  ", billNo, "审定",
                                                       flowDt.Rows[0]["FlowId"].ToString(),
                                                   flowDt.Rows[0]["LastUser"].ToString());
                DBUtil.ExecuteNonQuery(flowStep);
                #endregion

                if (type == "save")
                {
                    entity.StepNo = 0;
                    entity.StepName = "制单";
                }
                else
                {
                    entity.StepNo = 1;
                    entity.AppUserCode = flowDt.Rows[0]["FirstUser"].ToString();
                    entity.StepName = "初审";
                }
                entity.CreateTime = DateTime.Now;
                entity.IsStorage = "N";
                entity.PaidAmount = 0;
                entity.IsAppEnd = "N";
                entity.IsPayoff = "N";
                if (PublicRule.Insert(entity) > 0)
                {
                    returnValue = billNo;
                }

                #region 销售合同明细表
                if (detailList != null && detailList.Count > 0)
                {
                    string deleteSql = string.Format(@" DELETE FROM SysSaleContractDetail WHERE SaleBillNo ='{0}' ;", billNo);
                    DBUtil.ExecuteNonQuery(deleteSql);

                    string delSql = @"  INSERT INTO  SysSaleContractDetail(SaleBillNo, GoodsCode, GoodsCount, OutGoodsCount)
                                    VALUES 
                                      ";

                    #region 货物列表
                    if (detailList != null && detailList.Count > 0)
                    {
                        for (int i = 0; i < detailList.Count; i++)
                        {
                            delSql += string.Format(@"   ('{0}',{1},{2},0), ", billNo, detailList[i].GoodsCode, detailList[i].GoodsCount);
                        }
                    }
                    #endregion

                    delSql = delSql.TrimEnd().TrimEnd(',') + ";";
                    DBUtil.ExecuteNonQuery(delSql);
                }
                DBUtil.Commit();
                returnValue = billNo;
                #endregion

            }
            catch (Exception ex)
            {
                // returnValue = "出错信息：" + ex.ToString();
                returnValue = "";
                DBUtil.Rollback();
            }
            return returnValue;
        }

    }
}
