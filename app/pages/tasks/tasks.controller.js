app.controller('TasksController', ['location', 'messages', 'tasks', 'configuration', function (location, messages, tasks, configuration) {
  var self = this;
  this.messages = messages.getMessages();
  this.tasks = tasks.getTasks();
  this.dateFormat = configuration.taskDateFormat;

  this.onMessageAlertClose = function (index) {
    this.messages.splice(index, 1);
  };

  this.goTo = function (path) {
    location.goTo(path);
  };

  this.editTask = function (taskId) {
    this.goTo('/tasks/add-edit/' + taskId);
  };

  this.deleteTask = function (taskId) {
    this.goTo('/tasks/remove/' + taskId);
  };
}]);
