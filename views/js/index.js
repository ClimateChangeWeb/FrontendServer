$(document).ready(function () {
  //init side bar
  $('.sidenav').sidenav();

  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      // success callback
      console.log(data);
    }
  );
});
