$(document).ready(function () {
  //init
  M.AutoInit();

  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      console.log(data);
      $('#username').html(data.user.username);
      if (data.user.city) {
        $('#selected-city').html(data.user.city);
      } else {
        $('#selected-city').html('unknown');
      }
    },
  );

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
