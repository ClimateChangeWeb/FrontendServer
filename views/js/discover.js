$(document).ready(function () {
  //init side bar
  $('.sidenav').sidenav();
  $('.parallax').parallax();

  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      // success callback
      console.log(data);
    },
  );

  // get discovers news
  $.get('/discovers', function (data, textStatus, jqXHR) {
    // success callback
    // console.log(data);
    mapDiscover(data);
  });

  // get australia climate warnings
  $.get('/warnings', function (data, textStatus, jqXHR) {
    // success callback
    console.log(data);
    mapWarnings(data);
  });

  // get weather
  //TODO: use user selected city for now only use melbourne for showcase
  $.get('/weather', function (data, textStatus, jqXHR) {
    // success callback
    console.log(data);
    $('.weather-box').append(
      `<p>Max temp is ${data.main.temp_max} Kelvin, and the Min temp is ${data.main.temp_min} Kelvin</p>`,
    );
  });

  //map init
  //TODO:
  // to use this map display climate
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    },
  ).addTo(mymap);
});

const mapDiscover = (discovers) => {
  discovers.forEach((element) => {
    $('#discover-collection')
      .append(`<li class="collection-item">${element.title}</li>
      <a
      href="${element.url}"
      target="_blank"
      >Go to Article
  
      <i class="material-icons tiny">open_in_new</i>
    </a`);
  });
};

//map the warnings for australia climate
const mapWarnings = (warnings) => {
  warnings.forEach((warning) => {
    warning.items.forEach((element) => {
      $('#warning-collection').append(
        `<li class="collection-item">${element.title}</li>`,
      );
    });
  });
};
