using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using IS.Base;
using IS.Config;
using System.Configuration;
namespace IS.uni
{
    public class DETAILEDREGISTRATION_BUS
    {
        DBBase db = new DBBase(ConfigurationSettings.AppSettings["connectionString"].ToString());
        public DETAILEDREGISTRATION_BUS()
        {
        }
        public  DETAILEDREGISTRATION_OBJ createObject()
        {
            DETAILEDREGISTRATION_OBJ obj = new DETAILEDREGISTRATION_OBJ();
            return obj;
        }
        public  DETAILEDREGISTRATION_OBJ createNull()
        {
            return null;
        }
        public List<DETAILEDREGISTRATION_OBJ> getAll(params spParam[] listFilter)
        {
            List<DETAILEDREGISTRATION_OBJ> lidata = new List<uni.DETAILEDREGISTRATION_OBJ>();
            string sql = "SELECT * FROM branch";
            string swhere = "";
            SqlCommand cm = new SqlCommand();
            foreach (var item in listFilter)
            {
                if (swhere != "")
                {
                    swhere += " AND ";
                }
                if (item.data == null)
                {
                    //cm.Parameters.Add("@" + f.Name, st);
                    //cm.Parameters["@" + f.Name].Value = DBNull.Value;
                    swhere += "[" + item.name + "]" + " is null";
                }
                else
                {
                    if (item.searchtype == 0)
                    {
                        swhere += "[" + item.name + "]= @" + item.name;
                        cm.Parameters.Add(new SqlParameter("@" + item.name, item.data));
                    }
                    else
                    {
                        swhere += "[" + item.name + "] LIKE @" + item.name;
                        cm.Parameters.Add(new SqlParameter("@" + item.name,"%"+  item.data +"%"));
                    }
                }
            }
            if(swhere!="")
            {
                sql += " WHERE " + swhere;
            }
            cm.CommandText = sql;
            cm.CommandType = CommandType.Text;
            DataSet ds = new DataSet();
            int ret= db.getCommand(ref ds, "Tmp",  cm);
            if(ret<0)
            {
                return null;
            }
            else
            {
                foreach(DataRow dr in ds.Tables["Tmp"].Rows)
                {
                    DETAILEDREGISTRATION_OBJ obj = new DETAILEDREGISTRATION_OBJ();

                    Type myTableObject = typeof(DETAILEDREGISTRATION_OBJ);
                    System.Reflection.PropertyInfo[] selectFieldInfo = myTableObject.GetProperties();

                    Type myObjectType = typeof(DETAILEDREGISTRATION_OBJ.BusinessObjectID);
                    System.Reflection.PropertyInfo[] fieldInfo = myObjectType.GetProperties();

                    //set object value
                    foreach (System.Reflection.PropertyInfo info in selectFieldInfo)
                    {
                        if (info.Name != "_ID")
                        {
                            if (dr.Table.Columns.Contains(info.Name))
                            {
                                if (!dr.IsNull(info.Name))
                                {
                                    info.SetValue(obj, dr[info.Name], null);
                                }
                            }
                        }
                        else
                        {
                            //set id value
                            DETAILEDREGISTRATION_OBJ.BusinessObjectID objid;
                            objid = (DETAILEDREGISTRATION_OBJ.BusinessObjectID)info.GetValue(obj, null);
                            foreach (System.Reflection.PropertyInfo info1 in fieldInfo)
                            {
                                if (dr.Table.Columns.Contains(info1.Name))
                                {
                                    info1.SetValue(objid, dr[info1.Name], null);
                                }
                            }
                            info.SetValue(obj, objid, null);
                        }
                    }
                    lidata.Add( obj);
                }
            }
            return lidata;
        }
        public DETAILEDREGISTRATION_OBJ GetByID(DETAILEDREGISTRATION_OBJ.BusinessObjectID id)
        {
            List<DETAILEDREGISTRATION_OBJ> li = getAll(new spParam("CODE", SqlDbType.VarChar, id.CODE,0));
            if(li== null || li.Count==0)
            {
                return null;
            }
            return li[0];
        }
        public string genNextCode(DETAILEDREGISTRATION_OBJ obj)
        {
            //Phải viết lại theo mô hình nào đó
            Random rnd = new Random();
            int i = rnd.Next(int.MaxValue);
            return (i % 10000000000).ToString();
        }
        public int Insert(DETAILEDREGISTRATION_OBJ obj)
        {
            int ret = 0;
            DBBase db = new DBBase(ConfigurationSettings.AppSettings["connectionString"].ToString());
            string sql = "INSERT INTO detailedregistration(code,subjectcode, studentcode, usedcredit, registrationdate,educationprogramcode,codeview) VALUES(@code,@subjectcode, @studentcode, @usedcredit, @registrationdate,@educationprogramcode,@codeview)";
            SqlCommand com = new SqlCommand();
            com.CommandText = sql;
            com.CommandType = CommandType.Text;
            com.Parameters.Add("@code", SqlDbType.VarChar).Value = obj.CODE ;
            com.Parameters.Add("@codeview", SqlDbType.VarChar).Value = obj.CODEVIEW;
            com.Parameters.Add("@subjectcode", SqlDbType.VarChar).Value = obj.SUBJECTCODE;
            com.Parameters.Add("@studentcode", SqlDbType.NVarChar).Value = obj.STUDENTCODE;
            com.Parameters.Add("@usedcredit", SqlDbType.Int).Value = obj.USEDCREDIT;
            com.Parameters.Add("@registrationdate", SqlDbType.DateTime).Value = obj.REGISTRATIONDATE;
            com.Parameters.Add("@educationprogramcode", SqlDbType.DateTime).Value = obj.EDUCATIONPROGRAMCODE;
            ret = db.doCommand(ref com);
            return ret;
        }
        public int Update(DETAILEDREGISTRATION_OBJ obj)
        {
            int ret = 0;
            DBBase db = new DBBase(ConfigurationSettings.AppSettings["connectionString"].ToString());
            string sql = @"UPDATE detailedregistration SET 
                    code=@code
                    ,subjectcode=@subjectcode
                    , studentcode=@studentcode
                    , usedcredit=@usedcredit
                    , registrationdate=@registrationdate
                    ,educationprogramcode=@educationprogramcode
                    ,codeview=@codeview   
                    WHERE code=@code_key
                ";
            SqlCommand com = new SqlCommand();
            com.CommandText = sql;
            com.CommandType = CommandType.Text;
            com.Parameters.Add("@code", SqlDbType.VarChar).Value = obj.CODE;
            com.Parameters.Add("@codeview", SqlDbType.VarChar).Value = obj.CODEVIEW;
            com.Parameters.Add("@subjectcode", SqlDbType.VarChar).Value = obj.SUBJECTCODE;
            com.Parameters.Add("@studentcode", SqlDbType.NVarChar).Value = obj.STUDENTCODE;
            com.Parameters.Add("@usedcredit", SqlDbType.Int).Value = obj.USEDCREDIT;
            com.Parameters.Add("@registrationdate", SqlDbType.DateTime).Value = obj.REGISTRATIONDATE;
            com.Parameters.Add("@educationprogramcode", SqlDbType.DateTime).Value = obj.EDUCATIONPROGRAMCODE;
            ret = db.doCommand(ref com);
            return ret;
        }
        public int Delete(DETAILEDREGISTRATION_OBJ.BusinessObjectID obj)
        {
            int ret = 0;
            DBBase db = new DBBase(ConfigurationSettings.AppSettings["connectionString"].ToString());
            string sql = @"DELETE FROM detailedregistration  WHERE code=@code_key
                ";
            SqlCommand com = new SqlCommand();
            com.CommandText = sql;
            com.CommandType = CommandType.Text;
            com.Parameters.Add("@code_key", SqlDbType.VarChar).Value = obj.CODE;
            ret = db.doCommand(ref com);
            return ret;
        }
        public int Open()
        {
            return db.Open();
        }
        public void CloseConnection()
        {
            db.Close();
        }
    }

}

