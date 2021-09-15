const expect = require('chai').expect;
const axios = require('axios');

//test IBM ai API
describe('IBM AI api', function () {
  this.timeout(3000);
  var url = 'https://ibm-ai.us-south.cf.appdomain.cloud/';
  let checked = false;
  it('returns status 200 to check if api works', function (done) {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.status);

        if (response.status === 200 && response.data === 'hello') {
          checked = true;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        if (checked) {
          //if status code is 200, finish the test
          done();
        }
      });
  });
});

//test Backend Api
describe('Backend api', function () {
  var url = 'https://climate-change-backend.us-south.cf.appdomain.cloud/';
  let checked = false;
  it('returns status 200 to check if api works', function (done) {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.status);

        if (
          response.status === 200 &&
          response.data === 'hello, this is the backend server'
        ) {
          checked = true;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        if (checked) {
          //if status code is 200, finish the test
          done();
        }
      });
  });
});

//test FaaS API to get discovers
describe('Get all discover FaaS api', async function () {
  this.timeout(3000);
  var url =
    'https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getDicoverNews';
  let checked = false;
  it('returns status 200 to check if api works', function (done) {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.status);

        if (response.status === 200) {
          // give a 20s of time out
          // setTimeout(() => {
          //   done();
          // }, 20000);

          checked = true;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        if (checked) {
          //if status code is 200, finish the test
          done();
        }
      });
  });
});

//test FaaS API to get charities
describe('Get all charities FaaS api', async function () {
  this.timeout(3000);
  var url =
    'https://us-south.functions.appdomain.cloud/api/v1/web/21aa5286-66d7-41a8-b547-3e067029a6bc/default/getCharities';
  let checked = false;
  it('returns status 200 to check if api works', function (done) {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.status);

        if (response.status === 200) {
          // give a 20s of time out
          // setTimeout(() => {
          //   done();
          // }, 20000);

          checked = true;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        if (checked) {
          //if status code is 200, finish the test
          done();
        }
      });
  });
});
