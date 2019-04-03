function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }


/* MDL alerts */  

$(".close-alert").click(function(e){
  $(this).parent().remove();
  e.preventDefault();
});
  


// MDL toast
// (function() {
//   'use strict';
//   window['counter'] = 0;
//   var snackbarContainer = document.querySelector('#demo-toast-example');
//   var showToastButton = document.querySelector('#demo-show-toast');
//   showToastButton.addEventListener('click', function() {
//     'use strict';
//     var data = {message: 'Example Message # ' + ++counter};
//     snackbarContainer.MaterialSnackbar.showSnackbar(data);
//   });
// }());


// var notification = document.querySelector('.mdl-js-snackbar');
// notification.MaterialSnackbar.showSnackbar(
//   {
//     message: 'Image Uploaded'
//   }
// );