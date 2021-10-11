$(document).ready(function () {
  //init
  M.AutoInit();

  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      console.log(data);
      $('#username').html(data.user.username);
      $('#change-email-input').val(data.user.email);
      if (data.user.city) {
        $('#selected-city').html(data.user.city);
      } else {
        $('#selected-city').html('unknown');
      }
    },
  );

  // change username
  $('#change-email-btn').click(() => {
    const newEmail = $('#change-email-input').val();
    console.log(`new username is ${newEmail}`);
    if ($('#change-email-input').hasClass('valid')) {
      $.ajax({
        type: 'PATCH',
        url: '/user',
        contentType: 'application/json',
        data: JSON.stringify({
          username: $('#username').html(),
          email: newEmail,
        }),
        statusCode: {
          500: function () {
            console.log('500');
            alert(
              'There has some development error please contract website admin',
            );
          },
        },
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          location.reload();
        },
      });
    } else {
      console.log('false');
    }
  });

  // search for cities based on user's selection
  $('#city-search-btn').click(() => {
    const userInput = $('#input-city').val();
    $('.loader').css('visibility', 'visible');

    $.ajax({
      statusCode: {
        500: function () {
          console.log('500');
          alert(
            'There has some development error please contract website admin',
          );
        },
      },
      method: 'GET',
      url: `/city?cityName=${userInput}`,
      success: function (data, textStatus, jqXHR) {
        console.log(data);
        data.forEach((element) => {
          $('#city-container').append(selectWeatherElement(element));
        });
        $('.loader').css('visibility', 'hidden');
      },
    });
  });
  $('#enable-edit').click(() => {
    if ($('#change-email-input').attr('disabled')) {
      $('#change-email-input').prop('disabled', false);
    } else {
      $('#change-email-input').prop('disabled', true);
    }
  });

  // change password
  $('#change-password-btn').click(() => {
    if ($('#new-password').val().length < 8) {
      $('#new-password').addClass('invalid');
    }
    if ($('#new-password').val() !== $('#new-password-confirm').val()) {
      $('#new-password-confirm').addClass('invalid');
    }
    if ($('#old-password').val().length < 8) {
      $('#old-password').addClass('invalid');
    }

    // no issue with new password then send ajax
    if (
      $('#new-password').hasClass('invalid') == false &&
      $('#new-password-confirm').hasClass('invalid') == false &&
      $('#old-password').hasClass('invalid') == false
    ) {
      const newPass = $('#new-password').val();
      const oldPass = $('#old-password').val();
      const payload = {
        oldPassword: oldPass,
        newPassword: newPass,
      };
      $.ajax({
        type: 'POST',
        url: '/password/change',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        statusCode: {
          403: function (err) {
            console.log(err.responseJSON.error.message);
            M.toast({ html: err.responseJSON.error.message });
            $('#new-password').val('');
            $('#new-password-confirm').val('');
            $('#old-password').val('');
          },
          500: function () {
            console.log('500');
            alert(
              'There has some development error please contract website admin',
            );
          },
        },
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          M.toast({ html: data.message });
          setTimeout(() => {
            window.location.href = '/logout';
          }, 1000);
        },
      });
    } else {
    }
  });
});

const selectWeatherElement = (city) => {
  const country = city.country ? city.country : 'Unknown';
  return `
  <a
  href="#!"
  class="collection-item"
  onclick="setUserCity(${city.id})"
  >${city.cityName}, ${country}</a
>
  `;
};

async function setUserCity(cityId) {
  console.log($('#username').html());

  await $.ajax({
    statusCode: {
      500: function () {
        console.log('500');
        alert('There has some development error please contract website admin');
      },
    },
    method: 'GET',
    url: `/city/${cityId}`,
    success: function (data, textStatus, jqXHR) {
      console.log(data);
      const payload = {
        username: $('#username').html(),
        city: data.cityName,
        cityId: data.id,
        country: data.country,
      };
      console.log(payload);

      if (window.confirm(`Do you want to change city to ${data.cityName}?`)) {
        $.ajax({
          type: 'PATCH',
          url: '/user',
          contentType: 'application/json',
          data: JSON.stringify(payload),
          statusCode: {
            500: function () {
              console.log('500');
              alert(
                'There has some development error please contract website admin',
              );
            },
          },
          success: function (data, textStatus, jqXHR) {
            console.log(data);
            location.reload();
          },
        });
      }
    },
    error: function (err, textStatus, jqXHR) {
      console.log(err);
    },
  });
}
