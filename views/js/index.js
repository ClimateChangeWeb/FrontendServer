$(document).ready(function () {
  //init
  M.AutoInit();
});

$(document).ajaxStop(function () {
  // alert('load finished');
  console.log(`load finished`);
});
