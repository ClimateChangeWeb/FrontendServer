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

const nightIcon = `<div class="night weather-icon">
                  <span class="moon"></span>
                  <span class="spot1"></span>
                  <span class="spot2"></span>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>`;

const weatherArr = ['Rain', 'Clouds', 'Drizzle', 'Snow'];

$(document).ajaxStop(function () {
  // alert('load finished');
  console.log(`load finished`);
  $('.loader').css('visibility', 'hidden');
  $('main').css('visibility', 'visible');
});

$(document).ready(function () {
  initMap();
  //init
  M.AutoInit();

  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      // success callback
      console.log(data);
      if (!Object.keys(data).length) {
        //init the forecast card with melbourne as default
        initForecastCard('2158177');
        setupWeatherPage('2158177');
      } else {
        if (data.user.city) {
          //init the forecast card
          initForecastCard(data.user.cityId);
          setupWeatherPage(data.user.cityId);
        } else {
          //init the forecast card with melbourne as default
          initForecastCard('2158177');
          setupWeatherPage('2158177');
        }
      }
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
});

const setupWeatherPage = (cityId) => {
  // get weather
  //TODO: use user selected city for now only use melbourne for showcase
  $.get(`/weather?cityId=${cityId}`, function (data, textStatus, jqXHR) {
    // success callback
    console.log(data);
    // for detail
    changeElement('.currentTemp-detail > span', data.main.temp + '&deg;');
    changeElement('.maxTemp-detail > span', data.main.temp_max + '&deg;');
    changeElement('.minTemp-detail > span', data.main.temp_min + '&deg;');
    changeElement('.humanFeel-detail > span', data.main.feels_like + '&deg;');
    changeElement('.pressure-detail >span', data.main.pressure + 'hPa');
    changeElement('.humidity-detail', data.main.humidity + '%');
    changeElement('.wind-detail > span', data.wind.speed + 'm/s');

    // // for widget
    changeElement('.temp', `${data.main.temp.toFixed(1)}&deg;`);
    changeElement('.location', `${data.name}`);

    // change the wind
    changeElement(
      '.wind',
      `<i class="wind-icon fas fa-wind"></i>${data.wind.speed} MPS`,
    );
    // if the weather is raining
    // data.rain will be undefined if no rain
    if (data.rain) {
      const rainFall = data.rain['1h'];
      changeElement(
        '.rain',
        `<i class="rain-icon fas fa-cloud-rain"></i>${rainFall} MM`,
      );
      changeElement('.rainfall-detail > span', rainFall + 'mm');
    }

    // check for snow
    if (!data.rain && data.snow) {
      const snowFall = data.snow['1h'];
      changeElement('.rain', `<i class="fas fa-snowflake"></i>${snowFall} MM`);

      changeElement('.rainfall-detail > span', '0mm');
    } else {
      changeElement(
        '.rain',
        `<i class="rain-icon fas fa-cloud-rain"></i>0.0 MM`,
      );
      changeElement('.rainfall-detail > span', '0mm');
    }
    let weatherIconStr = '';
    if (checkStrInArr(weatherArr, data.weather[0].main)) {
      weatherIconStr = data.weather[0].main;
    } else {
      const dataCollectTime = timestampToDate(data.dt);
      if (dataCollectTime.hours < 6) {
        weatherIconStr = 'Night';
      } else {
        weatherIconStr = 'Day';
      }
    }

    switch (weatherIconStr) {
      case 'Rain':
        appendElement('.currentWeather', stormyIcon);
        break;
      case 'Snow':
        appendElement('.currentWeather', breezyIcon);
        break;
      case 'Drizzle':
        appendElement('.currentWeather', stormyIcon);
        break;
      case 'Clouds':
        appendElement('.currentWeather', cloudyIcon);
        break;
      case 'Night':
        appendElement('.currentWeather', nightIcon);
        break;

      default:
        appendElement('.currentWeather', hotIcon);
        break;
    }
  });
};

const initForecastCard = (cityId) => {
  window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
  window.myWidgetParam.push({
    id: 11,
    cityid: cityId,
    appid: '54adf57bbc67acd54ea5288d3964f297',
    units: 'metric',
    containerid: 'weather-forecast-div',
  });
  (function () {
    var script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src =
      '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  })();
};

// init the climate info map
const initMap = () => {
  //map init

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  });
  var clouds = L.OWM.clouds({
    showLegend: false,
    opacity: 0.5,
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var cloudscls = L.OWM.cloudsClassic({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var temp = L.OWM.temperature({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var wind = L.OWM.wind({ appId: '54adf57bbc67acd54ea5288d3964f297' });
  var pressurecntr = L.OWM.pressureContour({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var pressure = L.OWM.pressure({ appId: '54adf57bbc67acd54ea5288d3964f297' });
  var snow = L.OWM.snow({ appId: '54adf57bbc67acd54ea5288d3964f297' });
  var raincls = L.OWM.rainClassic({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var rain = L.OWM.rain({ appId: '54adf57bbc67acd54ea5288d3964f297' });
  var precipitationcls = L.OWM.precipitationClassic({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var precipitation = L.OWM.precipitation({
    appId: '54adf57bbc67acd54ea5288d3964f297',
  });
  var map = L.map('mapid', {
    center: new L.LatLng(-25.274398, 133.775136),
    zoom: 4,
    layers: [osm],
  });
  var baseMaps = { 'OSM Standard': osm };
  var overlayMaps = {
    Clouds: clouds,
    CloudsClassic: cloudscls,
    Temp: temp,
    Wind: wind,
    Pressure: pressure,
    PressureContour: pressurecntr,
    Snow: snow,
    Rain: rain,
    RainClassic: raincls,
    Precipitation: precipitation,
    PrecipitationClassic: precipitationcls,
  };
  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
};

const appendElement = (element, appendItem) => {
  $(element).append(appendItem);
};

const changeElement = (element, Item) => {
  $(element).html(Item);
};

const checkStrInArr = (arr, str) => {
  return arr.includes(str);
};

const timestampToDate = (timestamp) => {
  // convert unix timestamp to milliseconds
  const ts_ms = timestamp * 1000;

  // initialize new Date object
  const date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  const year = date_ob.getFullYear();

  // month as 2 digits (MM)
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  const date = ('0' + date_ob.getDate()).slice(-2);

  // hours as 2 digits (hh)
  const hours = ('0' + date_ob.getHours()).slice(-2);

  // minutes as 2 digits (mm)
  const minutes = ('0' + date_ob.getMinutes()).slice(-2);

  // seconds as 2 digits (ss)
  const seconds = ('0' + date_ob.getSeconds()).slice(-2);

  const result = {
    year: year,
    month: month,
    date: date,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  console.log(result);
  return result;
};

const mapDiscover = (discovers) => {
  discovers.forEach((element) => {
    $('#discover-list').append(` <li class="item">
      <h4 class="headline">
      <a
        href="${element.url}"
        target="_blank"
        >
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
          <a href="${element.link}" target="_blank" rel="noreferrer noopener">${element.title}
          <i class="material-icons tiny">open_in_new</i></a>
        </li>
      </ul>`,
      );
    });
  });
};
