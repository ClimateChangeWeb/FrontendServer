const loginButton = `<li id="login-box">
<a class="waves-effect waves-light btn" href="/login">Log In</a>
</li>`;

const signupBtn = `<li><a href="/signup">Sign Up</a></li>`;

const userForNavBar = (user) => {
  return `<li>
  <img
    src="/asset/img_avatar.png"
    alt="Avatar"
    height="50"
    width="50"
    style="margin-top: 7px; border-radius: 50%"
  />
</li>
<li>
  <a href="/private" style="max-height: 64px">
    ${user.username}
  </a>
</li>`;
};

const userForSideBar = (user) => {
  return `
  <br />
  <li>
  <a href="/private"
    ><img
      src="/asset/img_avatar.png"
      alt="Avatar"
      height="44"
      width="44"
      style="border-radius: 50%;"
    />

    ${user.username}</a
  >
</li>`;
};

const logoutItem = `<li id="logout">
<a class="waves-effect red lighten-1 btn" href="/logout">Log Out</a>
</li>`;
$(document).ready(function () {
  $.get(
    '/user', // url
    function (data, textStatus, jqXHR) {
      if (data.user) {
        console.log(data.user.username);
        $('#header-bar').append(userForNavBar(data.user));
        $('#mobile-demo').prepend(userForSideBar(data.user));

        // add logout button
        $('#header-bar').append(logoutItem);
        $('#mobile-demo').append(logoutItem);
      } else {
        console.log('no user find');
        $('#header-bar').append(signupBtn);
        $('#mobile-demo').append(signupBtn);
        $('#header-bar').append(loginButton);
        $('#mobile-demo').append(loginButton);
      }
    },
  );
});
