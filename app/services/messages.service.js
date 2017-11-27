app.service('messages', function () {
  this.messages = [];

  this.addMessage = function (message, type) {
    this.messages.push({
      message: message,
      type: type
    });
  }

  this.getMessages = function () {
    var messages = this.messages;
    this.messages = [];
    return messages;
  };
});
