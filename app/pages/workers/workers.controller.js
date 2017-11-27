app.controller('WorkersController', ['location', 'messages', 'workers', 'configuration', function (location, messages, workers, configuration) {
  var self = this;
  this.messages = messages.getMessages();
  this.workers = workers.getWorkers();
  this.dateFormat = configuration.dateFormat;
  this.searchString = '';

  this.onMessageAlertClose = function (index) {
    this.messages.splice(index, 1);
  };

  this.goTo = function (path) {
    location.goTo(path);
  };

  this.editWorker = function (workerId) {
    this.goTo('/workers/add-edit/' + workerId);
  };

  this.deleteWorker = function (workerId) {
    this.goTo('/workers/remove/' + workerId);
  };

  this.shouldShowWorker = function (worker) {
    if (self.searchString === '') {
      return true;
    }

    return worker.firstName.indexOf(self.searchString) !== -1 || worker.lastName.indexOf(self.searchString) !== -1 || worker.position.indexOf(self.searchString) !== -1 || worker.mail.indexOf(self.searchString) !== -1;
  };
}]);
