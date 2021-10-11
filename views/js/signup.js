$(document).ready(function () {
  //init side bar
  M.AutoInit();

  // Live updates for the text fields
  
  $('#username').on("change blur keyup", function() {
    if ($('#username').val().length >= 3) {
      $('#username').removeClass("invalid");
      $('#username').addClass("valid");
      $('#username-span').text('');
    } else {
      $('#username').removeClass("valid");
      $('#username').addClass("invalid");
      $('#username-span').text('Username must be a minimum of 3 characters.');
    }
  })

  $('#password').on("change blur keyup", function() {
    if ($('#password').val().length >= 8) {
      $('#password').removeClass("invalid");
      $('#password').addClass("valid");
      $('#password-span').text('');
    } else {
      $('#password').removeClass("valid");
      $('#password').addClass("invalid");
      $('#password-span').text('Password must be a minimum of 8 characters.');
    }
  })

  $('#email').on("change blur keyup", function() {
    if (isEmail($('#email').val())) {
      $('#email').removeClass("invalid");
      $('#email').addClass("valid");
      $('#email-span').text('');
    } else {
      $('#email').removeClass("valid");
      $('#email').addClass("invalid");
      $('#email-span').text('Please enter a valid email');
    }
  })

  $('#confirm_password').on("change blur keyup", function() {
    if ($('#confirm_password').val() == $('#password').val()) {
      $('#confirm_password').removeClass("invalid");
      $('#confirm_password').addClass("valid");
      $('#confirm_password-span').text('');
    } else {
      $('#confirm_password').removeClass("valid");
      $('#confirm_password').addClass("invalid");
      $('#confirm_password-span').text('Passwords do not match');
    }
  })

  function isEmail(email) {
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  $('#signupBtn').click(() => {
    console.log('signup button clicked');

    if ($('#username').hasClass("valid") && $('#email').hasClass("valid") && $('#password').hasClass("valid") && $('#confirm_password').hasClass("valid")) {
      console.log("Signup accepted");
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
