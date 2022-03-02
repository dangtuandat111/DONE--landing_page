if (localStorage.getItem("data") !== null) {
    localStorage.removeItem("data");
}

function doGetTEXT()  {
    // get variable
    var id = document.getElementById("form_id").value;
    var phone = document.getElementById("form_telno").value;
    // match URL
    url = "http://27.74.249.62:10000/api/esb/admin/search-contract/phone='"+phone+"'&id="+id;
    // Get data from URL
    var aPromise = fetch(url);
    aPromise.then(function(response) {
            if(!response.ok)  {
                throw new Error("HTTP error, status = " + response.status);
            }
            response.text()
            .then(function(data) {
                localStorage.removeItem("data");
                localStorage.setItem("data", data );
                window.location = "contract.html";
            })
            .catch(function(error) {
            });
        })
    .catch(function(error)  {
        console.log("Something error!!!");
        console.log(error);
    });
}


