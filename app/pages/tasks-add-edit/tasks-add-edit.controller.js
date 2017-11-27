app.controller('TasksAddEditController', ['location', 'configuration', 'api', 'messages', 'tasks', function (location, configuration, api, messages, tasks) {
  var self = this;
  this.apiErrorText = '';
  this.format = configuration.dateFormat;
  this.taskData = tasks.getTask();
  this.taskData.startTime = angular.isDefined(this.taskData.startDate) ? new Date(this.taskData.startDate) : new Date();
  this.taskData.endTime = angular.isDefined(this.taskData.endDate) ? new Date(this.taskData.endDate) : new Date();
  this.isEdit = false;
  this.availableWorkers = tasks.getAttendies();
  this.selectedWorker = this.availableWorkers[0];
  this.selectedWorkers = [];
  this.emailNotificationSelected = !!this.taskData.reminderEmail;
  this.pushNotificationSelected = !!this.taskData.reminderPopup;
  this.emailNotifTime = this.taskData.reminderEmail || 10;
  this.pushNotifTime = this.taskData.reminderPopup || 10;

  if (angular.isDefined(this.taskData.id)) {
    this.taskData.startDate = new Date(this.taskData.startDate * 1000).getTime();
    this.taskData.endDate = new Date(this.taskData.endDate * 1000).getTime();
    this.taskData.startTime = new Date(this.taskData.startDate);
    this.taskData.endTime = new Date(this.taskData.endDate);

    this.isEdit = true;

    for (var i = 0; i < this.taskData.attendees.length; i++) {
      this.selectedWorkers.push({
        id: this.taskData.attendees[i].id,
        name: this.taskData.attendees[i].firstName + ' ' + this.taskData.attendees[i].lastName + ' (' + this.taskData.attendees[i].mail + ')'
      });

      this.availableWorkers = this.availableWorkers.filter(function (el) {
        return el.id !== self.taskData.attendees[i].id;
      });
    }

    this.selectedWorker = this.availableWorkers[0];
  }

  this.startDatePicker = {
    opened: false
  };

  this.endDatePicker = {
    opened: false
  };

  this.openStartDatePicker = function() {
    this.startDatePicker.opened = true;
  };

  this.openEndDatePicker = function() {
    this.endDatePicker.opened = true;
  };

  this.onApiAlertClose = function () {
    this.apiErrorText = '';
  };

  this.goTo = function (path) {
    location.goTo(path);
  };

  this.addWorker = function () {
    this.selectedWorkers.push(this.selectedWorker);
    this.availableWorkers = this.availableWorkers.filter(function (el) {
      return el.id !== self.selectedWorker.id;
    });

    if (this.availableWorkers.filter(function (el) { return el.id === self.selectedWorker.id }).length === 0) {
      this.selectedWorker = this.availableWorkers[0];
    }
  };

  this.removeSelectedWorker = function (worker) {
    if (this.availableWorkers.length === 0) {
      this.selectedWorker = worker;
    }

    this.availableWorkers.push(worker);
    this.selectedWorkers = this.selectedWorkers.filter(function (el) {
      return el.id !== worker.id;
    });
  }

  this.submit = function () {
    var requestData = {
      title: this.taskData.title,
      description: this.taskData.description,
      location: this.taskData.location
    };

    var startDate = this.taskData.startDate.getFullYear() + '-' + (this.taskData.startDate.getMonth() + 1) + '-' + this.taskData.startDate.getDate();
    var startTime = this.taskData.startTime.getHours() + ':' + this.taskData.startTime.getMinutes();

    requestData.startDate = Math.floor(new Date(startDate + ' ' + startTime).getTime() / 1000);

    var endDate = this.taskData.endDate.getFullYear() + '-' + (this.taskData.endDate.getMonth() + 1) + '-' + this.taskData.endDate.getDate();
    var endTime = this.taskData.endTime.getHours() + ':' + this.taskData.endTime.getMinutes();

    requestData.endDate = Math.floor(new Date(endDate + ' ' + endTime).getTime() / 1000);

    if (this.emailNotificationSelected) {
      requestData.reminderEmail = this.emailNotifTime;
    }

    if (this.pushNotificationSelected) {
      requestData.reminderPopup = this.pushNotifTime;
    }

    requestData.attendees = [];

    for (var i = 0; i < this.selectedWorkers.length; i++) {
      requestData.attendees.push(this.selectedWorkers[i].id);
    }

    var wasEdit = angular.isDefined(this.taskData.id);

    api.call('googleCalendar/save', requestData).then(
      function(response) {
        if (wasEdit) {
          messages.addMessage('Zadanie pomyślnie zmienione.', 'success');
        } else {
          messages.addMessage('Zadanie pomyślnie dodane.', 'success');
        }

        location.goTo('/tasks');
      },
      function (error) {
        self.apiErrorText = error.message;
      }
    );
  };
}]);
