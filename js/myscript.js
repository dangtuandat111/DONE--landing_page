var slideIndex = 1;
showDivs(slideIndex);

function changeDot(n) {
  showDivs(slideIndex = n);
}


function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slideTab");
  var dots = document.getElementsByClassName("dot-item");
  var tags = document.getElementsByClassName("btn-inside-under-1");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
    tags[i].className = tags[i].className.replace("active", "");

  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  tags[slideIndex-1].className += " active";

}

// Get the modal
var modal = document.getElementByClass("sample");

// Get the button that opens the modal
var btn = document.getElementById("btnsample");


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


function on($id) {
  modal = document.getElementById($id);
  document.getElementById($id).style.display = "block";
}

function off($id) {
  document.getElementById($id).style.display = "none";
}