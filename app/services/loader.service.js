app.service('loader', function () {
  this.loaderActive = false;

  this.enableLoader = function () {
    this.loaderActive = true;
  };

  this.disableLoader = function () {
    this.loaderActive = false;
  };
});
