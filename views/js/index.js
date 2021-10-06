$(document).ready(function () {
  // socket io setup
  var socket = io();
});

$(document).ajaxStop(function () {
  // alert('load finished');
  console.log(`load finished`);
  //init
  M.AutoInit();
});
