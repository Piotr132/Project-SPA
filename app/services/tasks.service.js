app.service('tasks', function () {
  this.tasks = [];
  this.task = {};
  this.attendies = [];

  this.setTasks = function (tasks) {
    this.tasks = tasks;
  };

  this.setTask = function (task) {
    this.task = task;
  };

  this.setAttendies = function (attendies) {
    this.attendies = attendies;
  };

  this.getAttendies = function () {
    return this.attendies;
  };

  this.getTasks = function () {
    return this.tasks;
  };

  this.getTask = function () {
    return this.task;
  };
});
