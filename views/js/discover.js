const hotIcon = `<div class="hot weather-icon">
<span class="sun"></span>
<span class="sunx"></span>
</div>`;

const cloudyIcon = `<div class="cloudy weather-icon">
<span class="cloud"></span>
<span class="cloudx"></span>
</div>`;

const stormyIcon = `<div class="stormy weather-icon">
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
<span class="snowe"></span>
<span class="snowex"></span>
<span class="stick"></span>
<span class="stick2"></span>
</div>`;

const breezyIcon = `<div class="breezy weather-icon">
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
<span class="cloudr"></span>
</div>`;

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
    // for detail
    changeElement('.currentTemp-detail > span', data.main.temp + '&deg;');
    changeElement('.maxTemp-detail > span', data.main.temp_max + '&deg;');
    changeElement('.minTemp-detail > span', data.main.temp_min + '&deg;');
    changeElement('.humanFeel-detail > span', data.main.feels_like + '&deg;');
    changeElement('.pressure-detail >span', data.main.pressure + 'hPa');
    changeElement('.humidity-detail', data.main.humidity + '%');
    changeElement('.wind-detail > span', data.wind.speed + 'meter/sec');

    // // for widget
    changeElement('.temp', `${data.main.temp}&deg;`);
    changeElement('.location', `${data.name}`);

    // if the weather is raining
    // data.rain will be undefined if no rain
    if (data.rain) {
      const rainFall = data.rain['1h'];
      changeElement(
        '.rain',
        `<i class="rain-icon fas fa-cloud-rain"></i>${rainFall} MM`,
      );
    }

    // // check for snow
    if (!data.rain && data.snow) {
      const snowFall = data.snow['1h'];
      changeElement('.rain', `<i class="fas fa-snowflake"></i>${snowFall} MM`);
    } else {
      changeElement(
        '.rain',
        `<i class="rain-icon fas fa-cloud-rain"></i>0.0 MM`,
      );
    }
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

const appendElement = (element, appendItem) => {
  $(element).append(appendItem);
};

const changeElement = (element, Item) => {
  $(element).html(Item);
};

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
    // get the different parent div for the warnings
    let divID = warning.link.slice(-7).slice(0, 2);
    $('#warning-list').append(`
    <div id="${divID}">
                <p class="warning-header">${warning.title}</p>
              </div>
    `);

    // list warnings
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
