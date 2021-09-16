$(document).ready(function () {
  //init side bar
  $('.sidenav').sidenav();

  var usernameBool = false;
  var emailBool = false;
  var passwordcharBool = false;
  var passwordconfirmBool = false;

  $('#signupBtn').click(() => {
    console.log('signup button clicked');

    if ($('#username').val().length >= 3) {
      usernameBool = true;
      $('#username-span').text('');
    } else {
      console.log('Username too short');
      $('#username-span').text('Username must be a minimum of 3 characters.');
      usernameBool = false;
    }

    if (isEmail($('#email').val())) {
      emailBool = true;
      $('#email-span').text('');
    } else {
      console.log('Email invalid');
      $('#email-span').text('Please enter a valid email');
      emailBool = false;
    }

    if ($('#password').val().length >= 8) {
      passwordcharBool = true;
      $('#password-span').text('');
    } else {
      console.log('Password too short');
      $('#password-span').text('Password must be a minimum of 8 characters.');
      passwordcharBool = false;
    }

    if ($('#password').val() == $('#confirm_password').val()) {
      passwordconfirmBool = true;
      $('#confirm_password-span').text('');
    } else {
      console.log('password does not match');
      $('#confirm_password-span').text('Passwords do not match');
      passwordconfirmBool = false;
    }

    function isEmail(email) {
      var regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }

    if (usernameBool && emailBool && passwordcharBool && passwordconfirmBool) {
      $.ajax({
        url: '/signup',
        type: 'post',
        data: {
          username: $('#username').val(),
          password: $('#password').val(),
          email: $('#email').val(),
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
    }
  });
});
