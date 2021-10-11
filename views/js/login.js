$(document).ready(function () {
  //init
  M.AutoInit();

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
        $('#username').val(''),
          $('#password').val(''),
          M.toast({ html: jqXhr.responseJSON.message });
      },
    });
  });
});
