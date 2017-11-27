app.service('workers', function () {
  this.workers = [];
  this.worker = {};

  this.setWorkers = function (workers) {
    this.workers = workers;
  };

  this.setWorker = function (worker) {
    this.worker = worker;
  };

  this.getWorkers = function () {
    return this.workers;
  };

  this.getWorker = function () {
    return this.worker;
  };
});
