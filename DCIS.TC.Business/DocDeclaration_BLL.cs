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
  public  class DocDeclaration_BLL
    {
      public dynamic Get(int start, int limit, string strOrderBy, dynamic data)
      {
          string strSql = @" SELECT A.*,B.Key_Text as DECLARATION_PLACE_CODE_TEXT,
                            C.KEY_TEXT AS GOVENMENT_PROC_CODE_TEXT,D.KEY_TEXT AS CALL_PURPOSE_TEXT,
                            E.KEY_TEXT AS OPERATOR_TYPE_TEXT,F.KEY_TEXT AS ROUTE_TEXT
                            FROM TRAN_DOC_REPORT A
                            LEFT JOIN tran_port_code B ON A.DECLARATION_PLACE_CODE=B.KEY_VALUE 
                            LEFT JOIN tran_key C ON A.GOVENMENT_PROC_CODE=C.KEY_VALUE AND C.KEY_TYPE='BussinessType'
                            LEFT JOIN tran_key D ON A.CALL_PURPOSE=D.KEY_VALUE AND D.KEY_TYPE='PurposeOfCall'
                            LEFT JOIN tran_key E ON A.OPERATOR_TYPE=E.KEY_VALUE AND E.KEY_TYPE='EnterpriseProperty'
                            LEFT JOIN tran_key F ON A.ROUTE=F.KEY_VALUE AND F.KEY_TYPE='LineCode'
                            WHERE  A.R_STATUE='0' ";
          if (data != null)
          {
              if (data.SHIP_NAME != null && data.SHIP_NAME != "")
              {
                  strSql += string.Format(@" and A.SHIP_NAME like '%{0}%'", data.SHIP_NAME);
              }

              if (data.SHIP_NAME_CN != null && data.SHIP_NAME_CN != "")
              {
                  strSql += string.Format(@" and A.SHIP_NAME_CN like '%{0}%'", data.SHIP_NAME_CN);
              }

              if (data.SHIP_NO != null && data.SHIP_NO != "")
              {
                  strSql += string.Format(@" and A.SHIP_NO like '%{0}%'", data.SHIP_NO);
              }
              if (data.IMO != null && data.IMO != "")
              {
                  strSql += string.Format(@" and A.IMO like '%{0}%'", data.IMO);
              }
          }
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 获取单证申报明细表数据
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetDocDetail(int start, int limit, string strOrderBy, dynamic data)
      {
          string tblName = HttpContext.Current.Request.QueryString["tblName"].ToString();
          string strSql = string.Format(@" SELECT A.* FROM {0} A WHERE 1=1 ",tblName);

          if (data != null)
          {
              if (data.SCHEDULE_ID != null && data.SCHEDULE_ID != "")
              {
                  strSql += string.Format(@" and A.SCHEDULE_ID ='{0}' ", data.SCHEDULE_ID);
              }             
          }
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 获取总申报船舶信息
      /// </summary>
      /// <param name="start"></param>
      /// <param name="limit"></param>
      /// <param name="strOrderBy"></param>
      /// <param name="data"></param>
      /// <returns></returns>
      public dynamic GetDocShip(int start, int limit, string strOrderBy, dynamic data)
      {
          string strSql = @"  SELECT  B.SHIP_NO,B.IMO,B.SHIP_NAME,B.ENTER_NUMBER,B.ABROAD_NUMBER,B.ARRIVAL_DATE,
                              B.BERTH_CODE AS BERTH_NOW_CODE,B.DEPARTURE_PORT_CODE,B.ARRIVAL_PORT_CODE,B.AGENT_CODE,
                              B.CONTEXT_NAME,B.DECLARATION_DATE,B.FREE_TEXT 
                              FROM  TRAN_REACHPORT B,TRAN_SCHEDULE_INFO C 
                              WHERE  B.SCHEDULE_ID=C.SCHEDULE_ID  AND C.SHIP_STATUE='3' AND
                              B.SCHEDULE_ID  NOT IN(SELECT SCHEDULE_ID FROM TRAN_DOC_REPORT WHERE R_STATUE IN('0','1')) ";
          if (data != null)
          {
              if (data.SHIP_NAME != null && data.SHIP_NAME != "")
              {
                  strSql += string.Format(@" and B.SHIP_NAME like '%{0}%'", data.SHIP_NAME);
              }

              if (data.SHIP_NO != null && data.SHIP_NO != "")
              {
                  strSql += string.Format(@" and B.SHIP_NO like '%{0}%'", data.SHIP_NO);
              }
              if (data.IMO != null && data.IMO != "")
              {
                  strSql += string.Format(@" and B.IMO like '%{0}%'", data.IMO);
              }
          }
          string pagedSql = OracleUtil.PreparePageSqlString(strSql, start, limit);
          DataTable dtTmp = DBUtil.Fill(pagedSql);
          int count = Int32.Parse(DBUtil.Fill(string.Format("SELECT COUNT(1) FROM ({0})", strSql)).Rows[0][0].ToString());
          return PageUtil.WrapByPage(dtTmp, count);
      }

      /// <summary>
      /// 新增
      /// </summary>
      /// <param name="entity"></param>
      /// <returns></returns>
      public string Insert(TRAN_DOC_REPORTEntity entity,string type, List<dynamic> btmList,
          List<dynamic> btmStoreList, List<dynamic> danger, List<dynamic> emptyBox,
          List<dynamic> entryGoods, List<dynamic> equipmentStore, List<dynamic> goodsReport,
          List<dynamic> marineStore, List<dynamic> voyage)
      {
          string returnValue = "";
          try
          {
              DBUtil.BeginTrans();
              entity.R_STATUE = type;
              string scid = queryScNo(entity.SHIP_NO);
              entity.SCHEDULE_ID = scid;
              if (PublicRule.Insert(entity) > 0)
              {
                  returnValue = "true";
              }
              if(type.Equals("1"))
              {
                  TRAN_DOC_REPORT_BAKEntity entityBak = new TRAN_DOC_REPORT_BAKEntity();
                  entityBak.SCHEDULE_ID = entity.SCHEDULE_ID;
                  entityBak.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityBak.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityBak.SENDID = "AA27799084400";
                  entityBak.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityBak.FLAG = "0";

                  PublicRule.Insert(entityBak);
              }
              #region 单证申报明细表
              string delSql = "begin ";

              #region 航次摘要
              if (voyage != null && voyage.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_VOYAGE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < voyage.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_VOYAGE(schedule_id, 
                            sequence_number, 
                            itinerary_code, 
                            arrival_date, 
                            departure_date, 
                            free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}') ;", scid, i + 1, voyage[i].ITINERARY_CODE, voyage[i].ARRIVAL_DATE,
                           voyage[i].DEPARTURE_DATE, voyage[i].FREE_TEXT);
//                      if (type.Equals("1"))
//                      {
//                          string strArrival = voyage[i].ARRIVAL_DATE.ToString().Substring(0, 15);
//                          string strDeparture = voyage[i].DEPARTURE_DATE.ToString().Substring(0, 15);
//                          delSql += string.Format(@" INSERT INTO TRAN_DOC_VOYAGE_BAK(schedule_id, 
//                            sequence_number, 
//                            itinerary_code, 
//                            arrival_date, 
//                            departure_date, 
//                            free_text)
//             VALUES('{0}',{1},'{2}','{3}','{4}','{5}') ;", scid, i + 1, voyage[i].ITINERARY_CODE, strArrival,
//                          strDeparture, voyage[i].FREE_TEXT);
//                      }
                  }

              } 
              #endregion

              #region 船用物品申报
              if (marineStore != null && marineStore.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_MARINE_STORE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < marineStore.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_MARINE_STORE(schedule_id, 
                                  sequence_number, 
                                  store_type, 
                                  store_name, 
                                  store_quentity, 
                                  quentity_unit, 
                                  stowage_place, 
                                  free_text)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}','{7}') ;", scid, i + 1, marineStore[i].STORE_TYPE,
                          marineStore[i].STORE_NAME, marineStore[i].STORE_QUENTITY,
                          marineStore[i].QUENTITY_UNIT, marineStore[i].STOWAGE_PLACE, marineStore[i].FREE_TEXT);
                  }
              } 
              #endregion

              #region 货物申报
              if (goodsReport != null && goodsReport.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_GOODS_REPORT WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < goodsReport.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_GOODS_REPORT(schedule_id, 
                                  sequence_number, 
                                  loading_place_code, 
                                  discharge_place_code, 
                                  ship_mark, 
                                  goods_type, 
                                  equipment_size_type, 
                                  equipment_loaded_status, 
                                  package_type, 
                                  goods_total_number, 
                                  cargo_discription, 
                                  gross_weight, 
                                  quentity_unit, 
                                  free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}',{7},'{8}',{9},'{10}',{11},'{12}','{13}') ;", scid, i + 1,
                          goodsReport[i].LOADING_PLACE_CODE, goodsReport[i].DISCHARGE_PLACE_CODE, goodsReport[i].SHIP_MARK,
                           goodsReport[i].GOODS_TYPE, goodsReport[i].EQUIPMENT_SIZE_TYPE, goodsReport[i].EQUIPMENT_LOADED_STATUS,
                          goodsReport[i].PACKAGE_TYPE, goodsReport[i].GOODS_TOTAL_NUMBER, goodsReport[i].CARGO_DISCRIPTION,
                          goodsReport[i].GROSS_WEIGHT, goodsReport[i].QUENTITY_UNIT, goodsReport[i].FREE_TEXT);
                  }
              } 
              #endregion

              #region 内贸集装箱货物
              if (equipmentStore != null && equipmentStore.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_EQUIPMENT_SOTRE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < equipmentStore.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_EQUIPMENT_SOTRE(schedule_id, 
                                     sequence_number, 
                                     equipment_number, 
                                     equipment_size_type, 
                                     container_number, 
                                     seal_number, 
                                     cargo_description, 
                                     gorss_weight, 
                                     consignee_name, 
                                     consignor_name, 
                                     load_place_code, 
                                     discharge_place_code, 
                                     free_text, 
                                     tran_doc_number)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}',{7},'{8}','{9}','{10}','{11}','{12}','{13}') ;", scid, i + 1,
                          equipmentStore[i].EQUIPMENT_NUMBER, equipmentStore[i].EQUIPMENT_SIZE_TYPE,
                          equipmentStore[i].CONTAINER_NUMBER, equipmentStore[i].SEAL_NUMBER, equipmentStore[i].CARGO_DESCRIPTION,
                          equipmentStore[i].GORSS_WEIGHT, equipmentStore[i].CONSIGNEE_NAME, equipmentStore[i].CONSIGNOR_NAME,
                          equipmentStore[i].LOAD_PLACE_CODE, equipmentStore[i].DISCHARGE_PLACE_CODE,
                          equipmentStore[i].FREE_TEXT, equipmentStore[i].TRAN_DOC_NUMBER);
                  }
              } 
              #endregion

              #region 转关货物
              if (entryGoods != null && entryGoods.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_ENTRY_GOODS WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < entryGoods.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_ENTRY_GOODS(schedule_id, 
                                 sequence_number, 
                                 tran_doc_number, 
                                 equipment_size_type, 
                                 container_number, 
                                 load_place_code, 
                                 discharge_place_code, 
                                 free_text)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}','{7}') ;", scid, i + 1,
                          entryGoods[i].TRAN_DOC_NUMBER, entryGoods[i].EQUIPMENT_SIZE_TYPE,
                          entryGoods[i].CONTAINER_NUMBER, entryGoods[i].LOAD_PLACE_CODE, entryGoods[i].DISCHARGE_PLACE_CODE,
                          entryGoods[i].FREE_TEXT);
                  }
              } 
              #endregion

              #region 沿海空箱
              if (emptyBox != null && emptyBox.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_EMPTY_BOX WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < emptyBox.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_EMPTY_BOX(schedule_id, 
                               sequence_number, 
                               cross_border_ship, 
                               cross_border_voyage, 
                               cross_border_date, 
                               equipment_number, 
                               equipment_size_type, 
                               load_place_code, 
                               discharg_place_code, 
                               free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}') ;", scid, i + 1,
                          emptyBox[i].CROSS_BORDER_SHIP, emptyBox[i].CROSS_BORDER_VOYAGE, emptyBox[i].CROSS_BORDER_DATE,
                          emptyBox[i].EQUIPMENT_NUMBER, emptyBox[i].EQUIPMENT_SIZE_TYPE, emptyBox[i].LOAD_PLACE_CODE,
                          emptyBox[i].DISCHARG_PLACE_CODE, emptyBox[i].FREE_TEXT);
//                      if (type.Equals("1"))
//                      {
//                          string strCross_border = emptyBox[i].CROSS_BORDER_DATE.ToString().Substring(0, 15);
//                          delSql += string.Format(@" INSERT INTO TRAN_DOC_EMPTY_BOX_BAK(schedule_id, 
//                               sequence_number, 
//                               cross_border_ship, 
//                               cross_border_voyage, 
//                               cross_border_date, 
//                               equipment_number, 
//                               equipment_size_type, 
//                               load_place_code, 
//                               discharg_place_code, 
//                               free_text)
//             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}') ;", scid, i + 1,
//                             emptyBox[i].CROSS_BORDER_SHIP, emptyBox[i].CROSS_BORDER_VOYAGE, strCross_border,
//                             emptyBox[i].EQUIPMENT_NUMBER, emptyBox[i].EQUIPMENT_SIZE_TYPE, emptyBox[i].LOAD_PLACE_CODE,
//                             emptyBox[i].DISCHARG_PLACE_CODE, emptyBox[i].FREE_TEXT);
//                      }
                  }
                 
              }
              #endregion

              #region 危险货物申报
              if (danger != null && danger.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_DANGE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < danger.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_DANGE(schedule_id, 
                           sequence_number, 
                           tran_doc_number, 
                           mcv_number, 
                           package_kind_number, 
                           proper_ship_name, 
                           dclass, 
                           un_number, 
                           pack_group, 
                           subsidiary_risk, 
                           flash_point, 
                           marine_pollutant, 
                           gorss_net_weight, 
                           ems, 
                           stowage_position, 
                           free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}',{11},{12},'{13}','{14}','{15}') ;", scid, i + 1,
                          danger[i].TRAN_DOC_NUMBER, danger[i].MCV_NUMBER, danger[i].PACKAGE_KIND_NUMBER,
                          danger[i].PROPER_SHIP_NAME, danger[i].DCLASS, danger[i].UN_NUMBER, danger[i].PACK_GROUP,
                          danger[i].SUBSIDIARY_RISK, danger[i].FLASH_POINT, danger[i].MARINE_POLLUTANT, danger[i].GORSS_NET_WEIGHT,
                          danger[i].EMS, danger[i].STOWAGE_POSITION, danger[i].FREE_TEXT);
                  }
              }
              #endregion

              #region 船员物品清单
              if (btmStoreList != null && btmStoreList.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_STORE_LIST WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < btmStoreList.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_BTM_STORE_LIST(schedule_id, 
                                    sequence_number, 
                                    additional_type, 
                                    additional_number, 
                                    store_type, 
                                    store_name, 
                                    store_quentity, 
                                    quentity_unit, 
                                    free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}',{6},'{7}','{8}') ;", scid, i + 1,
                          btmStoreList[i].ADDITIONAL_TYPE, btmStoreList[i].ADDITIONAL_NUMBER, btmStoreList[i].STORE_TYPE,
                          btmStoreList[i].STORE_NAME, btmStoreList[i].STORE_QUENTITY,
                          btmStoreList[i].QUENTITY_UNIT, btmStoreList[i].FREE_TEXT);
                  }
              }
              #endregion

              #region 船员名单
              if (btmList != null && btmList.Count > 0)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_LIST WHERE SCHEDULE_ID ='{0}' ;", scid);
                  for (int i = 0; i < btmList.Count; i++)
                  {
                      delSql += string.Format(@" INSERT INTO TRAN_DOC_BTM_LIST(schedule_id, 
                              sequence_number, 
                              pereson_name, 
                              gender, 
                              nationality, 
                              rank, 
                              birthday, 
                              birthplace, 
                              additional_type, 
                              additional_number, 
                              free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}') ;", scid, i + 1,
                          btmList[i].PERESON_NAME, btmList[i].GENDER, btmList[i].NATIONALITY,
                          btmList[i].RANK, btmList[i].BIRTHDAY, btmList[i].BIRTHPLACE,
                          btmList[i].ADDITIONAL_TYPE, btmList[i].ADDITIONAL_NUMBER, btmList[i].FREE_TEXT);
                  }
              }
              #endregion


              delSql += " end;";
              if (delSql != "begin  end;")
              {
                  DBUtil.ExecuteNonQuery(delSql);
              }

              DBUtil.Commit();
              returnValue = "true";
              #endregion

          }
          catch (Exception ex)
          {
              returnValue = "出错信息：" + ex.ToString();
              DBUtil.Rollback();
          }

          return returnValue;

      }
      /// <summary>
      /// 更新
      /// </summary>
      /// <param name="entity"></param>
      /// <param name="type"></param>
      /// <returns></returns>
      public string Update(TRAN_DOC_REPORTEntity entity, string type, List<dynamic> btmList,
          List<dynamic> btmStoreList, List<dynamic> danger, List<dynamic> emptyBox,
          List<dynamic> entryGoods, List<dynamic> equipmentStore, List<dynamic> goodsReport,
          List<dynamic> marineStore, List<dynamic> voyage)
      {
          entity.R_STATUE = type;
          try
          {
              DBUtil.BeginTrans();
              PublicRule.Update(entity);
              if (type.Equals("1"))
              {
                  TRAN_DOC_REPORT_BAKEntity entityBak = new TRAN_DOC_REPORT_BAKEntity();
                  entityBak.SCHEDULE_ID = entity.SCHEDULE_ID;
                  entityBak.CREATORID = HttpContext.Current.Session["UserGuid"].ToString();
                  entityBak.COMPANYID = HttpContext.Current.Session["CMP_GUID"].ToString();
                  entityBak.SENDID = "AA27799084400";
                  entityBak.SENDTIME = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                  entityBak.FLAG = "0";
                  PublicRule.Insert(entityBak);
              }
              string scid = entity.SCHEDULE_ID;
              #region 单证申报明细表
              string delSql = "begin ";

              #region 航次摘要
              if (voyage != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_VOYAGE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (voyage.Count > 0)
                  {
                      for (int i = 0; i < voyage.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_VOYAGE(schedule_id, 
                            sequence_number, 
                            itinerary_code, 
                            arrival_date, 
                            departure_date, 
                            free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}') ;", scid, i + 1, voyage[i].ITINERARY_CODE, voyage[i].ARRIVAL_DATE,
                               voyage[i].DEPARTURE_DATE, voyage[i].FREE_TEXT);
//                          if (type.Equals("1"))
//                          {
//                              string strArrival = voyage[i].ARRIVAL_DATE.ToString().Substring(0, 15);
//                              string strDeparture = voyage[i].DEPARTURE_DATE.ToString().Substring(0, 15);
//                              delSql += string.Format(@" INSERT INTO TRAN_DOC_VOYAGE_BAK(schedule_id, 
//                            sequence_number, 
//                            itinerary_code, 
//                            arrival_date, 
//                            departure_date, 
//                            free_text)
//             VALUES('{0}',{1},'{2}','{3}','{4}','{5}') ;", scid, i + 1, voyage[i].ITINERARY_CODE, strArrival,
//                              strDeparture, voyage[i].FREE_TEXT);
//                          }
                      }

                  }
              }
              #endregion

              #region 船用物品申报
              if (marineStore != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_MARINE_STORE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (marineStore.Count > 0)
                  {
                      for (int i = 0; i < marineStore.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_MARINE_STORE(schedule_id, 
                                  sequence_number, 
                                  store_type, 
                                  store_name, 
                                  store_quentity, 
                                  quentity_unit, 
                                  stowage_place, 
                                  free_text)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}','{7}') ;", scid, i + 1, marineStore[i].STORE_TYPE,
                              marineStore[i].STORE_NAME, marineStore[i].STORE_QUENTITY,
                              marineStore[i].QUENTITY_UNIT, marineStore[i].STOWAGE_PLACE, marineStore[i].FREE_TEXT);
                      }
                  }
              }
              #endregion

              #region 货物申报
              if (goodsReport != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_GOODS_REPORT WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (goodsReport.Count > 0)
                  {
                      for (int i = 0; i < goodsReport.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_GOODS_REPORT(schedule_id, 
                                  sequence_number, 
                                  loading_place_code, 
                                  discharge_place_code, 
                                  ship_mark, 
                                  goods_type, 
                                  equipment_size_type, 
                                  equipment_loaded_status, 
                                  package_type, 
                                  goods_total_number, 
                                  cargo_discription, 
                                  gross_weight, 
                                  quentity_unit, 
                                  free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}',{7},'{8}',{9},'{10}',{11},'{12}','{13}') ;", scid, i + 1,
                              goodsReport[i].LOADING_PLACE_CODE, goodsReport[i].DISCHARGE_PLACE_CODE, goodsReport[i].SHIP_MARK,
                               goodsReport[i].GOODS_TYPE, goodsReport[i].EQUIPMENT_SIZE_TYPE, goodsReport[i].EQUIPMENT_LOADED_STATUS,
                              goodsReport[i].PACKAGE_TYPE, goodsReport[i].GOODS_TOTAL_NUMBER, goodsReport[i].CARGO_DISCRIPTION,
                              goodsReport[i].GROSS_WEIGHT, goodsReport[i].QUENTITY_UNIT, goodsReport[i].FREE_TEXT);
                      }
                  }
              }
              #endregion

              #region 内贸集装箱货物
              if (equipmentStore != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_EQUIPMENT_SOTRE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (equipmentStore.Count > 0)
                  {
                      for (int i = 0; i < equipmentStore.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_EQUIPMENT_SOTRE(schedule_id, 
                                     sequence_number, 
                                     equipment_number, 
                                     equipment_size_type, 
                                     container_number, 
                                     seal_number, 
                                     cargo_description, 
                                     gorss_weight, 
                                     consignee_name, 
                                     consignor_name, 
                                     load_place_code, 
                                     discharge_place_code, 
                                     free_text, 
                                     tran_doc_number)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}',{7},'{8}','{9}','{10}','{11}','{12}','{13}') ;", scid, i + 1,
                              equipmentStore[i].EQUIPMENT_NUMBER, equipmentStore[i].EQUIPMENT_SIZE_TYPE,
                              equipmentStore[i].CONTAINER_NUMBER, equipmentStore[i].SEAL_NUMBER, equipmentStore[i].CARGO_DESCRIPTION,
                              equipmentStore[i].GORSS_WEIGHT, equipmentStore[i].CONSIGNEE_NAME, equipmentStore[i].CONSIGNOR_NAME,
                              equipmentStore[i].LOAD_PLACE_CODE, equipmentStore[i].DISCHARGE_PLACE_CODE,
                              equipmentStore[i].FREE_TEXT, equipmentStore[i].TRAN_DOC_NUMBER);
                      }
                  }
              }
              #endregion

              #region 转关货物
              if (entryGoods != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_ENTRY_GOODS WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (entryGoods.Count > 0)
                  {
                      for (int i = 0; i < entryGoods.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_ENTRY_GOODS(schedule_id, 
                                 sequence_number, 
                                 tran_doc_number, 
                                 equipment_size_type, 
                                 container_number, 
                                 load_place_code, 
                                 discharge_place_code, 
                                 free_text)
             VALUES('{0}',{1},'{2}','{3}',{4},'{5}','{6}','{7}') ;", scid, i + 1,
                              entryGoods[i].TRAN_DOC_NUMBER, entryGoods[i].EQUIPMENT_SIZE_TYPE,
                              entryGoods[i].CONTAINER_NUMBER, entryGoods[i].LOAD_PLACE_CODE, entryGoods[i].DISCHARGE_PLACE_CODE,
                              entryGoods[i].FREE_TEXT);
                      }
                  }
              }
              #endregion

              #region 沿海空箱
              if (emptyBox != null)
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_EMPTY_BOX WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (emptyBox.Count > 0)
                  {
                      for (int i = 0; i < emptyBox.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_EMPTY_BOX(schedule_id, 
                               sequence_number, 
                               cross_border_ship, 
                               cross_border_voyage, 
                               cross_border_date, 
                               equipment_number, 
                               equipment_size_type, 
                               load_place_code, 
                               discharg_place_code, 
                               free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}') ;", scid, i + 1,
                              emptyBox[i].CROSS_BORDER_SHIP, emptyBox[i].CROSS_BORDER_VOYAGE, emptyBox[i].CROSS_BORDER_DATE,
                              emptyBox[i].EQUIPMENT_NUMBER, emptyBox[i].EQUIPMENT_SIZE_TYPE, emptyBox[i].LOAD_PLACE_CODE,
                              emptyBox[i].DISCHARG_PLACE_CODE, emptyBox[i].FREE_TEXT);
//                          if (type.Equals("1"))
//                          {
//                              string strCross_border = emptyBox[i].CROSS_BORDER_DATE.ToString().Substring(0, 15);
//                              delSql += string.Format(@" INSERT INTO TRAN_DOC_EMPTY_BOX_BAK(schedule_id, 
//                               sequence_number, 
//                               cross_border_ship, 
//                               cross_border_voyage, 
//                               cross_border_date, 
//                               equipment_number, 
//                               equipment_size_type, 
//                               load_place_code, 
//                               discharg_place_code, 
//                               free_text)
//             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}') ;", scid, i + 1,
//                                 emptyBox[i].CROSS_BORDER_SHIP, emptyBox[i].CROSS_BORDER_VOYAGE, strCross_border,
//                                 emptyBox[i].EQUIPMENT_NUMBER, emptyBox[i].EQUIPMENT_SIZE_TYPE, emptyBox[i].LOAD_PLACE_CODE,
//                                 emptyBox[i].DISCHARG_PLACE_CODE, emptyBox[i].FREE_TEXT);
//                          }
                      }
                  }
              }
              #endregion

              #region 危险货物申报
              if (danger != null )
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_DANGE WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (danger.Count > 0)
                  {
                      for (int i = 0; i < danger.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_DANGE(schedule_id, 
                           sequence_number, 
                           tran_doc_number, 
                           mcv_number, 
                           package_kind_number, 
                           proper_ship_name, 
                           dclass, 
                           un_number, 
                           pack_group, 
                           subsidiary_risk, 
                           flash_point, 
                           marine_pollutant, 
                           gorss_net_weight, 
                           ems, 
                           stowage_position, 
                           free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}',{11},{12},'{13}','{14}','{15}') ;", scid, i + 1,
                              danger[i].TRAN_DOC_NUMBER, danger[i].MCV_NUMBER, danger[i].PACKAGE_KIND_NUMBER,
                              danger[i].PROPER_SHIP_NAME, danger[i].DCLASS, danger[i].UN_NUMBER, danger[i].PACK_GROUP,
                              danger[i].SUBSIDIARY_RISK, danger[i].FLASH_POINT, danger[i].MARINE_POLLUTANT, danger[i].GORSS_NET_WEIGHT,
                              danger[i].EMS, danger[i].STOWAGE_POSITION, danger[i].FREE_TEXT);
                      }
                  }
              }
              #endregion

              #region 船员物品清单
              if (btmStoreList != null )
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_STORE_LIST WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (btmStoreList.Count > 0)
                  {
                      for (int i = 0; i < btmStoreList.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_BTM_STORE_LIST(schedule_id, 
                                    sequence_number, 
                                    additional_type, 
                                    additional_number, 
                                    store_type, 
                                    store_name, 
                                    store_quentity, 
                                    quentity_unit, 
                                    free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}',{6},'{7}','{8}') ;", scid, i + 1,
                              btmStoreList[i].ADDITIONAL_TYPE, btmStoreList[i].ADDITIONAL_NUMBER, btmStoreList[i].STORE_TYPE,
                              btmStoreList[i].STORE_NAME, btmStoreList[i].STORE_QUENTITY,
                              btmStoreList[i].QUENTITY_UNIT, btmStoreList[i].FREE_TEXT);
                      }
                  }
              }
              #endregion

              #region 船员名单
              if (btmList != null )
              {
                  delSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_LIST WHERE SCHEDULE_ID ='{0}' ;", scid);
                  if (btmList.Count > 0)
                  {
                      for (int i = 0; i < btmList.Count; i++)
                      {
                          delSql += string.Format(@" INSERT INTO TRAN_DOC_BTM_LIST(schedule_id, 
                              sequence_number, 
                              pereson_name, 
                              gender, 
                              nationality, 
                              rank, 
                              birthday, 
                              birthplace, 
                              additional_type, 
                              additional_number, 
                              free_text)
             VALUES('{0}',{1},'{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}') ;", scid, i + 1,
                              btmList[i].PERESON_NAME, btmList[i].GENDER, btmList[i].NATIONALITY,
                              btmList[i].RANK, btmList[i].BIRTHDAY, btmList[i].BIRTHPLACE,
                              btmList[i].ADDITIONAL_TYPE, btmList[i].ADDITIONAL_NUMBER, btmList[i].FREE_TEXT);
                      }
                  }
              }
              #endregion


              delSql += " end;";
              if (delSql != "begin  end;")
              {
                  DBUtil.ExecuteNonQuery(delSql);
              }

              DBUtil.Commit();
              #endregion

              DBUtil.Commit();
          }
          catch (Exception ex)
          {

              DBUtil.Rollback();

          }
          finally
          {

          }
          return entity.SCHEDULE_ID;
      }

      /// <summary>
      /// 删除
      /// </summary>
      /// <param name="strID"></param>
      public string Delete(string strID)
      {
          string returnVal = "";
          try
          {
              DBUtil.BeginTrans();
              string strDelSql = "begin ";
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_VOYAGE WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_EQUIPMENT_SOTRE WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_GOODS_REPORT WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_MARINE_STORE WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_ENTRY_GOODS WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_EMPTY_BOX WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_DANGE WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_STORE_LIST WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@" DELETE FROM TRAN_DOC_BTM_LIST WHERE SCHEDULE_ID ={0} ;", strID);
              strDelSql += string.Format(@"delete from TRAN_DOC_REPORT where SCHEDULE_ID in({0}) ;", strID);
              strDelSql += " end;";
              if (strDelSql != "begin  end;")
              {
                  DBUtil.ExecuteNonQuery(strDelSql);
              }
              DBUtil.Commit();
              returnVal = "true";
              return returnVal;
          }
          catch(Exception ex)
          {
              DBUtil.Rollback();
              returnVal = "false";
              return returnVal;
          }

      }

      public string queryScNo(string ship_no)
      {
          string tbNo = "";
          string strSql = " SELECT SCHEDULE_ID FROM  TRAN_SCHEDULE_INFO  WHERE SHIP_NO='" + ship_no + "' AND SHIP_STATUE='3' ";
          DataTable dt = DBUtil.Fill(strSql);
          if (dt.Rows.Count > 0)
          {
              tbNo = dt.Rows[0][0].ToString();
          }
          return tbNo;
      }

    }
}
