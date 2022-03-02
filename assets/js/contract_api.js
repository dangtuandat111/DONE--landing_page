// A URL returns TEXT data.
var url = "http://27.74.249.62:10000/api/esb/admin/search-contract/phone=0356630582&id=xxx";

if (localStorage.getItem("data") !== null) {
    var data = JSON.parse(localStorage.getItem('data'));
    console.log(data['body']);
    showData(data['body']);
}

function doGetTEXT()  {
  var aPromise = fetch(url);
  aPromise
    .then(function(response) {
        console.log("OK! Server returns a response object:");
        console.log(response);
        if(!response.ok)  {
            throw new Error("HTTP error, status = " + response.status);
        }
        response.text()
          .then(function(data) {
                console.log("Text:");
                console.log(data);
                localStorage.removeItem("data");
                localStorage.setItem("data", data );
                location.reload();
          })
          .catch(function(error) {
             // Never happened.
          });
    })
    .catch(function(error)  {
        console.log("Noooooo! Something error:");
        // Network Error!
        console.log(error);
    });
}

function showData(data) {
    var qrcode_list = [];
    let myPromise = new Promise(function(resolve, reject) {
        data.forEach(function(item) {
            let now = Date.now();
            let newChild = '';
            let status = '';
            console.log(item);
            console.log(item['fromDate']+" : "+item["toDate"]);
            let fromDate = new Date(item['fromDate']);
            let toDate = new Date(item['toDate']);
            if(fromDate> now) {
                status = 'Chưa đến hiệu lực'
            }
            else if(toDate >= now && fromDate <= now ) {
                status = "Còn hiệu lực";
            }
            else {
                status = "Hết hiệu lực"
            }
             fromDate = item['fromDate'].split('-');
             fromDate = fromDate[2] + '-'  + fromDate[1] + '-' + fromDate[0] ;
             toDate = item['toDate'].split('-');
             toDate = toDate[2] + '-'  + toDate[1] + '-' + toDate[0] ;
            if ( (status == 'Chưa đến hiệu lực' ||  status == 'Còn hiệu lực') && item['effectInsurance'] != 'CANCEL' ){
                var qrcode_id = 'qrcode' + Date.now();
                qrcode_list.push(qrcode_id);
                newChild = 
                `   <div class="contract__content">
                        <div class="contract-item">
                        <div class="line">
                            <p>
                            <strong>Bảo hiểm trách nhiệm dân sự xe máy </strong><br />
                            <i>Civil third party liability - motorcycle</i>
                            </p>
                            <img src="./assets/img/home/logo.png" alt="" />
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-12 col-12">
                            <div class="line line-left">
                                <div class="line-inner">
                                <p>
                                    <strong>Số giấy chứng nhận bảo hiểm</strong><br />
                                    <i>Certificate Of Insurance</i>
                                </p>
                                <p class="text-blue">
                                    <strong>` + item['driverDetail']['licenseNumber'] +`
                                    </strong>
                                </p>
                                </div>
                                <div class="line-inner">
                                <p>
                                    <strong>Công ti bảo hiểm</strong><br />
                                    <i>Insurer</i>
                                </p>
                                <img src="./assets/img/contract/logo_MIC.png" alt="" />
                                </div>
                            </div>
                            </div>
                            <div class="col-lg-6 col-md-12 col-12">
                            <div class="line">
                                <div class="line-inner">
                                <p>
                                    <strong>Biến kiểm soát</strong><br />
                                    <i>Plate №</i>
                                </p>
                                <p class="text-blue">
                                    <strong> ` + item['plateNo'] +` <br /> </strong>
                                    ` + item['vehicleType'] +`
                                </p>
                                </div>
                                <div class="line-inner">
                                <p>
                                    <strong>Hiệu lực bảo hiểm</strong><br />
                                    <i>Duration of insurance</i>
                                </p>
                                <p class="text-blue">
                                    <strong> ` + status +` </strong>
                                    <br />
                                    Từ ` + fromDate +` <br> đến ` + toDate +`
                                </p>
                                </div>
                                <div class="line-inner">
                                    <div id="` +  qrcode_id +  `" onload=myFunction('`+qrcode_id+`') "></div>
                                </div>
                                <script>
                                    var qrcode = new QRCode("` + qrcode_id + `", {
                                        text:`+url+`,
                                        width:200,
                                        height:200,
                                        colorDark:"#000000",
                                        colorLight:"#ffffff",
                                        correctLevel:QRCode.CorrectLevel.M
                                    });
                                    console.log('here');
                                </script>
                            </div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="drop-detail">
                            <img
                                class="icon icon-show hiding"
                                src="./assets/img/contract/extend.svg"
                                alt=""
                            />
                            <img
                                class="icon icon-hiding"
                                src="./assets/img/contract/collapse.svg"
                                alt=""
                            />
                            <p>
                                <strong
                                >Xem bảng tóm tắt bảo hiểm. Tóm tắt không thay thế cho
                                giấy chứng nhận hoặc hợp đồng.</strong
                                ><br />
                                <i
                                >Insurance summary sheet. This summary is't a substitute
                                for an insurance policy.</i
                                >
                            </p>
                            </div>
                            <button class="btn">
                            <strong>Tải GCN</strong> <br />
                            <i>COI download</i>
                            <!-- <i class="fas fa-chevron-right"></i> -->
                            </button>
                        </div>
                        </div>
                        <div class="contract-detail hiding">
                        <div class="row">
                            <div class="col-lg-6 col-md-12 col-12">
                            <div class="detail-half">
                                <div class="title">
                                <p>
                                    <strong>Chủ phương tiện </strong>
                                    <br />
                                    <i> Vehicle owner </i>
                                </p>
                                </div>
                                <div class="content">
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Họ và tên</strong><br />
                                            <i>Name</i>
                                        </p>
                                        <p class="blue">` + item['ownerName'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>CMND/CCCD</strong><br />
                                            <i>Identity No</i>
                                        </p>
                                        <p class="blue">` + item['ownerIdNumber'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Điện thoại</strong><br />
                                            <i>Phone</i>
                                        </p>
                                        <p class="blue">` + item['ownerPhone'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Email</strong><br />
                                            <i>Email</i>
                                        </p>
                                        <p class="blue">` + item['ownerEmail'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-7 col-12">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Địa chỉ</strong><br />
                                            <i>Address</i>
                                        </p>
                                        <p class="blue">
                                        ` + item['ownerAddress'] +`
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="detail-half">
                                <div class="title">
                                <p>
                                    <strong>Bảo hiểm trách nhiệm dân sự </strong>
                                    <br />
                                    <i>Civil third party liability</i>
                                </p>
                                </div>
                                <div class="content">
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Biển kiểm soát</strong><br />
                                            <i>License Plate</i>
                                        </p>
                                        <p class="blue">` + item['plateNo'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Số máy/Khung</strong><br />
                                            <i>Engine/Chassis №</i>
                                        </p>
                                        <p class="blue">` + item['engineNo'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Nhãn hiệu </strong><br />
                                            <i>Brand</i>
                                        </p>
                                        <p class="blue">` + item['vehicleBrand'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Kiểu </strong><br />
                                            <i>Model</i>
                                        </p>
                                        <p class="blue">` + item['vehicleModel'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Giá xe </strong><br />
                                            <i>Vehicle value</i>
                                        </p>
                                        <p class="blue">` + item['VCXVehicle']['vehicleValue'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Số chỗ ngồi </strong><br />
                                            <i>Number of seats </i>
                                        </p>
                                        <p class="blue">` + item['NumberSeats'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Dung tích </strong><br />
                                            <i>Capacity</i>
                                        </p>
                                        <p class="blue">` + item['goodsVehicle']['load'] +`</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-6">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Ngày đăng ký </strong><br />
                                            <i>Date of Reg</i>
                                        </p>
                                        <p class="blue">` + item['registry']['registerDate'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-lg-6 col-md-12 col-12">
                            <div class="detail-half">
                                <div class="title">
                                <p>
                                    <strong>Mức trách nhiệm bảo hiểm</strong>
                                    <br />
                                    <i>Sum insured</i>
                                </p>
                                <p>
                                    <strong>Phí bảo hiểm</strong>
                                    <br />
                                    <i>Premium</i>
                                </p>
                                </div>
                                <div class="content">
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-8 col-9">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Với bên thứ ba</strong><br />
                                            <i>Civil liability</i>
                                        </p>
                                        <p class="blue">
                                            Trách nhiệm về người: 150tr/người /vụ
                                            <br />Trách nhiệm về tài sản: 50tr/vụ
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-3">
                                        <div class="inner-content outhouse">
                                        <p class="blue">` + item['suminsure'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-8 col-9">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Người ngồi </strong><br />
                                            <i>Passengers</i>
                                        </p>
                                        <p class="blue">
                                            Trách nhiệm về người: ` + item['passenger']['amount'] +`/người /vụ
                                            <br />Số người áp dụng: 2 người
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-3">
                                        <div class="inner-content outhouse">
                                        <p class="blue">` + item['passenger']['amount'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="detail-half">
                                <div class="title">
                                <p>
                                    <strong>Quyền lợi bổ sung </strong>
                                    <br />
                                    <i>Additional benefits</i>
                                </p>
                                <p>
                                    <strong>Phí bổ sung </strong>
                                    <br />
                                    <i>Price</i>
                                </p>
                                </div>
                                <div class="content">
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-8 col-9">
                                        <div class="inner-content">
                                        <p>
                                            <strong
                                            >Bảo hiểm thiệt hại phương tiện </strong
                                            ><br />
                                            <i>Physical insurance</i>
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-3">
                                        <div class="inner-content outhouse">
                                        <p class="blue">600.000 VNĐ</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-8 col-9">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Cứu hộ 24/7 </strong><br />
                                            <i>Rescue</i>
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-3">
                                        <div class="inner-content outhouse">
                                        <p class="blue">` + item['rescueFee'] +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="detail-total">
                                <div class="content">
                                <div class="line-inner">
                                    <div class="row">
                                    <div class="col-md-9 col-9">
                                        <div class="inner-content">
                                        <p>
                                            <strong>Tổng phí</strong><br />
                                            <i>Total</i>
                                        </p>
                                        <p class="blue-thin">
                                            Phí đã bao gồm thuế VAT. Mức áp dụng cho con
                                            người:
                                            <br />0%. Sản phẩm khác: 10%
                                        </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-3">
                                        <div class="inner-content outhouse">
                                        <p class="blue">` + (item['totalPremium']).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}); +`</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> 
                    
    
                    `
            }
            else {
                var status2 = item['effectInsurance'] == 'CANCEL' ? 'Bị Hủy' : 'Hết hiệu lực';
                newChild = 
                `
                <div class="contract__content">
                    <div class="contract-item">
                            <div class="line">
                            <p>
                                <strong>Bảo hiểm trách nhiệm dân sự xe máy </strong><br />
                                <i>Civil third party liability - motorcycle</i>
                            </p>
                            <img src="./assets/img/home/logo.png" alt="" />
                            </div>
                            <div class="row">
                            <div class="col-lg-6 col-md-12 col-12">
                                <div class="line line-left">
                                <div class="line-inner">
                                    <p>
                                    <strong>Số giấy chứng nhận bảo hiểm</strong><br />
                                    <i>Certificate Of Insurance</i>
                                    </p>
                                    <p class="text-blue">
                                    <strong>` + item['driverDetail']['licenseNumber'] +` </strong>
                                    </p>
                                </div>
                                <div class="line-inner">
                                    <p>
                                    <strong>Công ti bảo hiểm</strong><br />
                                    <i>Insurer</i>
                                    </p>
                                    <img src="./assets/img/contract/logo_MIC.png" alt="" />
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 col-12">
                                <div class="line">
                                <div class="line-inner">
                                    <p>
                                    <strong>Biến kiểm soát</strong><br />
                                    <i>Plate №</i>
                                    </p>
                                    <p class="text-blue">
                                    <strong> ` + item['plateNo'] +` <br /> </strong>
                                    ` + item['vehicleType'] +`
                                    </p>
                                </div>
                                <div class="line-inner">
                                    <p>
                                    <strong>Hiệu lực bảo hiểm</strong><br />
                                    <i>Duration of insurance</i>
                                    </p>
                                    <p class="text-red">
                                    <strong>` + status +`</strong>
                                    <br />
                                    <i> ` + status2 +` </i>
                                    </p>
                                </div>
                                <div class="line-inner">
                                    <button class="btn red-btn">
                                    <strong>Gia hạn</strong> <br />
                                    <i>Renew now</i>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                `
            }
            document.getElementById("more_contract").innerHTML += newChild;
        });
        resolve(qrcode_list);
    });
    console.log(qrcode_list);
    myPromise.then(
        function(value) {  
            console.log(value);
            value.forEach(function(item) {
                myFunction(item);
            });
        },
    );
}

function myFunction(qrcode) {
    var qrcode = new QRCode(qrcode, {
        text: url,
        width:200,
        height:200,
        colorDark:"#000000",
        colorLight:"#ffffff",
    });
}



