app.controller('HomeController', ['messages', function (messages) {
  this.messages = messages.getMessages();

  this.onMessageAlertClose = function (index) {
    this.messages.splice(index, 1);
  };
}]);
