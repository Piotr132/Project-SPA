app.service('api', ['$http', 'configuration', 'loader', '$q', 'user', function ($http, configuration, loader, $q, user) {
  var self = this;
  this.urlApi = configuration.urlApi;
  this.loader = loader;

  this.endpointsAvailableWithoutSession = [
    'user/register',
    'user/login'
  ];

  this.call = function (endpoint, data) {
    this.loader.enableLoader();

    if (this.endpointsAvailableWithoutSession.indexOf(endpoint) === -1) {
      data.sid = user.getSid();
    }

    return $http({
      method: 'POST',
      url: this.urlApi + endpoint,
      data: data
    }).then(
      function (response) {
        self.loader.disableLoader();
        return response.data;
      },
      function (error) {
        self.loader.disableLoader();
        return $q.reject(error.data);
      }
    );
  };
}]);
