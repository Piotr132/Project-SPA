app.controller('RegisterController', ['location', 'api', 'messages', function (location, api, messages) {
  var self = this;
  this.userData = {};
  this.api = api;
  this.apiErrorText = '';

  this.onAlertClose = function () {
    this.apiErrorText = '';
  };

  this.register = function () {
    var data = {
      login: this.userData.login,
      password: this.userData.password
    };

    this.api.call('user/register', data).then(
      function(response) {
        messages.addMessage('Rejestracja pomyślna. Możesz się teraz zalogować.', 'success');
        location.goTo('/login');
      },
      function (error) {
        self.apiErrorText = error.message;
      }
    );
  };
}]);
