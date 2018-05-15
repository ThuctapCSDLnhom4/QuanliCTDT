//1 comportment lon nhat
var App = React.createClass({
    getInitialState: function () { //Khởi tạo, data=list department
        return { data: [],  firsttime: 1 };
    },
    componentWillMount: function () {

        //this.loadData();
        //console.log("bắt đầu");
    },
    componentDidMount: function () {
        //load data if predefine code
        if ($("#hidCode").val() != "") {
            this.loadDataW($("#hidCode").val());
        }
        console.log("Kết thúc");
    },
    loadSearch: function () {//load database on search
        this.loadDataW();
    },
    loadData: function ()//load list of grid
    {
        this.loadDataW();
    },

    loadDataW: function () {

        $.ajax({
            url: '/major/getlist',
            dataType: 'json',
            data: {
                keysearchCodeView: $.trim($('#keysearch-Code').val()),
                keysearchName: $.trim($('#keysearch-Name').val()),
//                page: homeConfig.pageIndex,
                pageSize: 0//default from server
            },
            success: function (data) {
                if (data.ret >= 0) {
                    this.setState({ data: data.data });
                }
                else {
                    alert("Lỗi không lấy được dữ liệu");
                }
//                AppRendered.loadData();
                //pagination(data.total, function () {
                //    AppRendered.loadData();

                //});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },


    eventClick: function () {
        //jquery set lai value
        $("#keysearch-Name").val("");
        $("#keysearch-Code").val("");
        if ($('#div-search').css('display') == 'none') {
            $("#div-search").css("display", "block");
        } else {
            $("#div-search").css("display", "none");
        }
    },

    handleNewRowSubmit: function () { //Them moi 1 ban ghi load lai du lieu
    //    this.loadparent();
        this.loadData();
    },
    setEdit: function (title, obj) {
        console.log("Final setEit" + title);
        obj = obj || '';//omitted - missed
        if (obj === '')
        {
            console.log("Đối tượng rỗng");
            this.clearInput();
            //set the curent parent to parrent
        }
        else
        {
            console.log("Có giá trị");
            //set gia tri cho cac thanh phan giao dien
            $("#CODE").val(obj.CODE);
            $("#NAME").val(obj.NAME);
            $("#FACILITYCODE").val(obj.FACILITYCODE);

        }
        $("#UpdateModal").modal("show");

        $("#titleOption").text(title);
    },
    clearInput: function () {
        console.log("Clear me");
        $("#CODE").val('');
        $("#NAME").val('');
        $("#FACILITYCODE").val('');
 },
//phuong thuc quan trong nhat-->render html la ngoai
    render: function () {
        console.log("Ren the main");
        return (
			<div>

				<NewRow onRowSubmit={this.handleNewRowSubmit} />

                <div id="listData">


                     <div style={{'margin-bottom':'10px'}}>
                         <div className="col-lg-12 col-md-12" style={{'margin-bottom':'10px'}}>
                                <button className="btn btn-sm  btn-primary" id="btnAdd" onClick={() =>this.setEdit("Thông báo")}>
                                    Thêm mới
                                </button>
                             &nbsp;
                                <input type="button" className="btn btn-sm btn-default"
                                       value="Tìm kiếm" onClick={this.eventClick} />
                         </div>
                     </div>
                      <div className="col-lg-12 col-md-12" id="div-search" style={{'margin-bottom':'10px', 'display':'none'}}>
                            <div className="col-lg-3 col-md-6">
                                <label className="col-md-2 control-label">Mã</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="keysearch-Code" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <label className="col-md-2 control-label">Tên</label>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" id="keysearch-Name" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12">
                                <button type="button" className="btn btn-info" onClick={this.loadSearch}>
                                         <span className="glyphicon glyphicon-search"></span> Lọc
                                </button>
                            </div>
                      </div>


                    <ListRow clist={this.state.data} startindex={this.state.startindex} loadData={this.loadData} setEdit={this.setEdit} />
                </div>
            </div>
    );
    }
});



//Tao 1 comportment con để hiển thị danh sách các đơn vị
var ListRow = React.createClass({

    componentWillMount: function () {

    },

    componentDidMount: function () {

    },
    handleRemove: function () {
        $("#ConfirmModal").modal('hide');
        var code = $("#idRemove").val();
        $.ajax({
            url: "/major/delete",
            data: { id: code }, //truyen id(=CODE) len de xoa
            dataType: 'json',
            success: function (data) {
                if (data.sussess >= 0) {
                    this.loadData(); //xoa xong load lai du lieu
                    //$("#NotificationModal h5").empty().append('Xóa thành công!');
                    //$("#NotificationModal").modal('show');
                } else {
                    //try to waiting
                    $("#NotificationModal h5").empty().append('Không xóa được bản ghi!');
                    $("#NotificationModal").modal('show');
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadData: function () {
        //jquery set lai value
        this.props.loadData();
    },
    render: function () {
        var listRow = [];
        var that = this;
        var index = 0;
        //Gọi yêu cầu hiển thi tất cả các department trong danh sách
        this.props.clist.forEach(function (rowitem) {
            //child function so that, this does mean thi window not the react object
            index++;
            console.log(index);
            listRow.push(<RowDetail item={rowitem} index={index} loadData={that.loadData} setEdit={that.props.setEdit } />);
        });
        return (
          <div id="listData">

           <table id="example2" className="table table-bordered table-hover">
                <thead>
                    <tr>
                          <th>STT</th>
                          <th>Mã</th>
                          <th>Tên</th>
                          <th>Mã cơ sở</th>
                    </tr>
                </thead>
              <tbody>{listRow}</tbody>
           </table>

            <div id="paginateBox">
                <div id="pagination" className="pagination">

                </div>
            </div>

             <div id="ConfirmModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Xác nhận</h4>
                            </div>
                            <div className="modal-body">
                                <input id="idRemove" className="hidden" />
                                <h5>Bạn chắc chắn muốn xóa bản ghi này?</h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={this.handleRemove}>Xác nhận</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Hủy</button>
                            </div>
                        </div>
                    </div>
             </div>
          </div>
          );
    }
});

var RowDetail = React.createClass({
    handleRemove: function () {
        //this.props.onDepartmentDelete( this.props.department );
        $("#idRemove").val(this.props.item.CODE);
        $("#ConfirmModal").modal('show');
        return false;
    },
    showDetail: function () {
        //alert(this.props.department.CODE);

        //$('#cboParent').val(this.props.item.CODE);
        //$('#cboParent').select2();


        this.props.loadData();
    },
    render: function () {
        return (
            //Hiển thị một phần tử trên danh sách
			  <tr>
				   <td>{this.props.index}</td>
				  <td>{this.props.item.CODE}</td>
				  <td>{this.props.item.NAME}</td>
				  <td>{this.props.item.FACILITYCODE}</td>
                  <td>



					  <input type="button" className="btn btn-sm btn-primary" value="Sửa" onClick={()=>this.props.setEdit("Sửa bản ghi", this.props.item)} />
				      &nbsp; &nbsp;
                      <input type="button" className="btn btn-sm btn-danger" value="Xóa" onClick={this.handleRemove} />
                </td>
			  </tr>
          );
    }
});

var NewRow = React.createClass({
    getInitialState: function () {
        return { lstGroup: [], lstResearchstatus: [] };
    },
    componentWillMount: function () {

    },
    componentDidMount: function () {
        //Thiết lập editor cho các đối tượng
    },
    backList: function () {
        console.log("Quay lai danh sach");
        $("#UpdateModal").modal("hide");

    },
    handleSubmit: function () {
        //Lay gia tri tu cac thanh phan giao dien

        var CODE = this.refs.CODE.getDOMNode().value;
        console.log("code");

        var NAME = this.refs.NAME.getDOMNode().value;
        console.log("name");

        var CODEVIEW = this.refs.FACILITYCODE.getDOMNode().value;
        console.log("facilitycode");
        
     
        var data = {
            CODE: CODE,
     //       CODEVIEW: CODEVIEW,
            NAME: NAME,
            FACILITYCODE: FACILITYCODE,
      /*      NOTE: NOTE,
            THEORDER: THEORDER,
            COMPARELEVEL: COMPARELEVEL,
            LOCK: LOCK  ? 1 : 0,
            thetype: $.trim($('#thetype').val()), */
            keysearchCode: $.trim($('#keysearch-Code').val()),
            keysearchName: $.trim($('#keysearch-Name').val()),
        }
   if (CODEVIEW == "") {
            alert("Chưa nhập mã");
            $("#UpdateModal").modal("show");





            return false;
        } else {


            //Add or edit 1 department
            $.ajax({
                url: "/major/update",
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.sussess >= 0) {
                        this.props.onRowSubmit(); //load lai du lieu
                        //jquery set lai value
                        if ($.trim(CODE) == "") {

                            $("#titleOption").text("Thêm mới đơn vị");
                        }
                        $("#UpdateModal").modal("hide");

                    }
                    else {
                        alert('Lỗi cập nhật');
}
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

            return false;
        }
    },

    changeEvent: function (e) {
        var data = new FormData();
        var files = e.target.files;
        console.log("Get file");
        for (var x = 0; x < files.length; x++) {
            data.append("file" + x, files[x]);
            console.log('Have file');
        }
        $.ajax({
            url: "/major/post",
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data.sussess);
                if (data.sussess >= 0) {
                    console.log(data.filename);

                }
            }.bind(this)
        }).done(function () {
            console.log("xong roi");

        });


    },

    render: function () {
        console.log("Ren new row here");

        console.log("Option is ok");

        var inputStyle = { padding: '10px' };
        return (

              <div className="modal fade" id="UpdateModal" role="dialog" data-backdrop="static" data-keyboard="false">
              <div className="modal-dialog">
                  <div className="modal-content ">
                    <div className="modal-header" style={{'border-bottom':'solid 2px #ccc' }}>
                      <button type="button" className="close" data-dismiss="modal"></button>
                       <h4 className="box-title" id="titleOption">Thêm bản ghi mới</h4>
                    </div>
                    <div className="modal-body modalScroll">
                             <input type="text" className="form-control col-md-8 hidden" ref="CODE" id="CODE" />
            <form className="form-horizontal">
                                            <div className="box-body">
                                                <div className="form-group col-sm-12">
                                                    <label className="col-sm-4 control-label">Mã</label>
                                                    <div className="col-sm-4 col-md-4">
                                                        <input type="text" className="form-control" ref="CODE" id="CODE" />
                                                    </div>
                                                </div>
                                                 <div className="form-group col-sm-12">
                                                    <label className="col-sm-4 control-label">Tên</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" ref="NAME" id="NAME" />
                                                    </div>
                                                 </div>
                                   
                                                 <div className="form-group col-sm-12">
                                                    <label className="col-sm-4 control-label">Mã cơ sở</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" ref="FACILITYCODE" id="FACILITYCODE" />
                                                    </div>
                                                 </div>                                             
                                            </div>
            </form>

                    </div>
                    <div className="modal-footer" style={{'border-top':'solid 2px #ccc' }}>
                                 <button className="btn btn-primary" id="cmdSave" onClick={this.handleSubmit}> Lưu </button>
                        &nbsp;
                        <button className="btn btn-danger" id="cmdCancel" data-dismiss="modal">
                            Hủy
                        </button>
                    </div>
                  </div>
              </div>
              </div>


        );
    }
});

//Render html vao the co Id = "container"
var AppRendered = React.render(<App />, document.getElementById("container"));//1 comportment lon nhat
