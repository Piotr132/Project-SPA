app.service('user', ['$cookies', function ($cookies) {
  this.userData = {};

  this.setData = function (data) {
    this.userData = data;
    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    $cookies.put('organizerAppUserData', JSON.stringify(data), { expires: expirationDate });
  };

  this.userIsLoggedIn = function () {
    return angular.isDefined(this.userData.id);
  };

  this.getSid = function () {
    return this.userData.sessid;
  };

  this.clearData = function () {
    this.userData = {};
    $cookies.remove('organizerAppUserData');
  };

  this.getDataFromCookiesOnAppInit = function () {
    var data = $cookies.get('organizerAppUserData');

    if (angular.isDefined(data)) {
      data = JSON.parse(data);
      this.setData(data);
    }
  };
}]);
