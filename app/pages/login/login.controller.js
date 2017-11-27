app.controller('LoginController', ['location', 'api', 'messages', 'user', 'localStorage', function (location, api, messages, user, localStorage) {
  var self = this;
  this.userData = {};
  this.api = api;
  this.apiErrorText = '';
  this.messages = messages.getMessages();

  this.onMessageAlertClose = function (index) {
    this.messages.splice(index, 1);
  };

  this.onApiAlertClose = function () {
    this.apiErrorText = '';
  };

  this.login = function () {
    var data = {
      login: this.userData.login,
      password: this.userData.password
    };

    this.api.call('user/login', data).then(
      function(response) {
        messages.addMessage('Zostałeś pomyślnie zalogowany.', 'success');
        user.setData(response);
        localStorage.addNewLogin({
          login: self.userData.login,
          status: 1,
          time: + new Date()
        });

        location.goTo('/');
      },
      function (error) {
        self.apiErrorText = error.message;
        localStorage.addNewLogin({
          login: self.userData.login,
          status: 0,
          time: + new Date()
        });
      }
    );
  };
}]);
