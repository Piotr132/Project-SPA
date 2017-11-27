app.controller('NavbarController', ['location', 'user', function (location, user) {
  this.location = location;

  this.goTo = function (url) {
    this.location.goTo(url);
  };

  this.linkIsActive = function (link) {
    return this.location.linkIsActive(link);
  };

  this.userIsLoggedIn = function () {
    return user.userIsLoggedIn();
  };
}]);
