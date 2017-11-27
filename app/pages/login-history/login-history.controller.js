app.controller('LoginHistoryController', ['localStorage', 'configuration', function (localStorage, configuration) {
  this.loginsHistory = localStorage.getLoginHistory();
  this.dateFormat = configuration.dateFormat;
}]);
