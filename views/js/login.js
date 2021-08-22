$(document).ready(function () {
  //init side bar
  $('.sidenav').sidenav();
  $('#loginBtn').click(() => {
    console.log('login button clicked');

    $.ajax({
      url: '/login',
      type: 'post',
      data: {
        username: $('#username').val(),
        password: $('#password').val(),
      },
      contentType: 'application/x-www-form-urlencoded',
      success: function (data, textStatus, jQxhr) {
        console.log(data);
        $(location).attr('href', window.location.origin);
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
        console.log(jqXhr);
        console.log(textStatus);
      },
    });
  });
});