$(document).ready(function () {
  $.get('/charities', function (data, textStatus, jqXHR) {
    // success callback
    console.log(data);
    insertCharities(data);
  });
});

//insert charities data into cards
const insertCharities = (charities) => {
  charities.forEach((charity) => {
    $('#charity-collection').append(
      `<div class="card">
            <span class="card-title">${charity.name}</span>
                <div class="card-image">
                    <img src="${charity.image}">
                </div>
                <div class="card-content">${charity.introduction}</div>
                <div class="card-action">
                    <a href="${charity.url}" target="_blank">${charity.name} <i class="material-icons tiny">open_in_new</i></a>
                </div>
        </div>`,
    );
  });
};
