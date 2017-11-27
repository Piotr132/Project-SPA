app.controller('WorkersAddEditController', ['location', 'configuration', 'api', 'messages', 'workers', function (location, configuration, api, messages, workers) {
  var self = this;
  this.apiErrorText = '';
  this.format = configuration.dateFormat;
  this.workerData = workers.getWorker();
  this.isEdit = false;

  if (angular.isDefined(this.workerData.id)) {
    this.workerData.birthday = new Date(this.workerData.birthday).getTime();
    this.isEdit = true;
  }

  this.datePicker = {
    opened: false
  };

  this.openDatePicker = function() {
    this.datePicker.opened = true;
  };

  this.onApiAlertClose = function () {
    this.apiErrorText = '';
  };

  this.goTo = function (path) {
    location.goTo(path);
  };

  this.submit = function () {
    var birthday = null;

    if (typeof this.workerData.birthday === 'object') {
      birthday = this.workerData.birthday.getTime() / 1000;
    } else {
      birthday = this.workerData.birthday / 1000;
    }

    var data = {
      id: this.workerData.id,
      firstName: this.workerData.firstName,
      lastName: this.workerData.lastName,
      birthday: birthday,
      position: this.workerData.position,
      mail: this.workerData.mail
    };

    var wasEdit = angular.isDefined(this.workerData.id);

    api.call('worker/save', data).then(
      function(response) {
        if (wasEdit) {
          messages.addMessage('Pracownik pomyślnie zmieniony.', 'success');
        } else {
          messages.addMessage('Pracownik pomyślnie dodany.', 'success');
        }

        location.goTo('/workers');
      },
      function (error) {
        self.apiErrorText = error.message;
      }
    );
  };
}]);
