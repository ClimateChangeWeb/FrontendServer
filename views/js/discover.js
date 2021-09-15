$(document).ready(function () {
  //init
  M.AutoInit();

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
    $('#discover-list').append(` <li class="item">
      <h4 class="headline">
      <a
        href="${element.url}"
        target="_blank"
        >Checkout more here
      ${element.title}
        <i class="material-icons tiny">open_in_new</i>
      </a>
      </h4>      
    </li>`);
  });
};

//map the warnings for australia climate
const mapWarnings = (warnings) => {
  warnings.forEach((warning) => {
    let divID = warning.link.slice(-7).slice(0, 2);
    $('#warning-list').append(`
    <div id="${divID}">
                <p class="warning-header">${warning.title}</p>
              </div>
    `);

    warning.items.forEach((element) => {
      $(`#${divID}`).append(
        `  <ul class="custom-list">
        <li class="warning-content">
          <i class="material-icons tiny">warning</i>
          ${element.title}
        </li>
      </ul>`,
      );
    });
  });
};
