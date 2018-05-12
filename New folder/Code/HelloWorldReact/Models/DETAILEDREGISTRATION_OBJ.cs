using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
namespace IS.uni{
public class DETAILEDREGISTRATION_OBJ
    {
	public class BusinessObjectID
	{
		public BusinessObjectID() { }
	private System.String _CODE;

		public BusinessObjectID(System.String mCODE)
		{
		_CODE = mCODE;

		}

    public System.String CODE
    {
        get { return _CODE; }
        set { _CODE = value; }
    }


		public override bool Equals(object obj)
		{
			if (obj == this) return true;
			if (obj == null) return false;

			BusinessObjectID that = obj as BusinessObjectID;
			if (that == null)
			{
				return false;
			}
			else
			{
		if (this.CODE != that.CODE) return false;

				return true;
			}

		}


		public override int GetHashCode()
		{
			return CODE.GetHashCode();
		}

	}
    public BusinessObjectID _ID;
    //main object
    protected string _codeP="{yyMMdd}{CCCC}";
	protected string _codePattern
	{
		get { return _codeP; }
		set { _codeP = value; }
	}

//##fieldList##
	public static System.String pre() { return "PRE"; }
	public static System.String suf() { return "SUF"; }

	public DETAILEDREGISTRATION_OBJ()
	{
		_ID = new BusinessObjectID();
	}

	public DETAILEDREGISTRATION_OBJ(BusinessObjectID id)
	{
		_ID = new BusinessObjectID();
		_ID = id;
	}

    public virtual System.String CODE
    {
        get ;
        set ;
    }
        [Display(Name = "Mã")]
        public virtual System.String CODEVIEW
        {
            get;
            set;
        }
        [Display(Name="Mã môn học")]
    public virtual System.String SUBJECTCODE
    {
        get ;
        set ;
    }
    [Display(Name="Mã sinh viên")]
    public virtual System.String STUDENTCODE
    {
        get ;
        set ;
    }
    [Display(Name="Số tín chỉ đã sử dụng")]
    public virtual System.Int32 USEDCREDIT
    {
        get ;
        set ;
    }
    [Display(Name = "Ngày đăng ký")]
    public virtual System.DateTime REGISTRATIONDATE
    {
        get ;
        set ;
    }
    [Display(Name = "Mã chương trình đào tạo")]
    public virtual System.DateTime EDUCATIONPROGRAMCODE
    {
        get ;
        set ;
    }
	public override int GetHashCode()
	{
		return _ID.GetHashCode();
	}

}
}
