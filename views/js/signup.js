$(document).ready(function () {
  //init side bar
  $('.sidenav').sidenav();
  M.AutoInit();

  var usernameBool = false;
  var emailBool = false;
  var passwordcharBool = false;
  var passwordconfirmBool = false;

  // Live updates for the text fields
  $('#username').on("input", function() {
    if ($('#username').val().length >= 3) {
      $('#username').removeClass("invalid");
      $('#username').addClass("valid");
    } else {
      $('#username').removeClass("valid");
      $('#username').addClass("invalid");
    }
  })
  $('#username').blur(function() {
    if ($('#username').val().length >= 3) {
      $('#username').removeClass("invalid");
      $('#username').addClass("valid");
    } else {
      $('#username').removeClass("valid");
      $('#username').addClass("invalid");
    }
  })

  $('#password').on("input", function() {
    if ($('#password').val().length >= 8) {
      $('#password').removeClass("invalid");
      $('#password').addClass("valid");
    } else {
      $('#password').removeClass("valid");
      $('#password').addClass("invalid");
    }
  })
  $('#password').blur(function() {
    if ($('#password').val().length >= 8) {
      $('#password').removeClass("invalid");
      $('#password').addClass("valid");
    } else {
      $('#password').removeClass("valid");
      $('#password').addClass("invalid");
    }
  })

  $('#email').on("input", function() {
    if (isEmail($('#email').val())) {
      $('#email').removeClass("invalid");
      $('#email').addClass("valid");
    } else {
      $('#email').removeClass("valid");
      $('#email').addClass("invalid");
    }
  })
  $('#email').blur(function() {
    if (isEmail($('#email').val())) {
      $('#email').removeClass("invalid");
      $('#email').addClass("valid");
    } else {
      $('#email').removeClass("valid");
      $('#email').addClass("invalid");
    }
  })

  $('#confirm_password').on("input", function() {
    if ($('#confirm_password').val() == $('#password').val()) {
      $('#confirm_password').removeClass("invalid");
      $('#confirm_password').addClass("valid");
    } else {
      $('#confirm_password').removeClass("valid");
      $('#confirm_password').addClass("invalid");
    }
  })
  $('#confirm_password').blur(function() {
    if ($('#confirm_password').val() == $('#password').val()) {
      $('#confirm_password').removeClass("invalid");
      $('#confirm_password').addClass("valid");
    } else {
      $('#confirm_password').removeClass("valid");
      $('#confirm_password').addClass("invalid");
    }
  })

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
