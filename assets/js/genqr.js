if (localStorage.getItem("qrcode_list") === null) {
    console.log(localStorage.getItem("qrcode_list"));
    qrcode_list.forEach(function(item) {
        myFunction(item);
    });
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