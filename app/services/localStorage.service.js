app.service('localStorage', ['$window', function ($window) {
  this.getLoginHistory = function () {
    var logins = $window.localStorage.organizerLoginHistory;

    if (!logins) {
      logins = [];
    } else {
      logins = JSON.parse(logins);
    }

    return logins;
  };

  this.addNewLogin = function (data) {
    var logins = this.getLoginHistory();
    logins.push(data);
    this.setLoginHistory(logins);
  };

  this.setLoginHistory = function (data) {
    $window.localStorage.organizerLoginHistory = JSON.stringify(data);
  };
}]);
