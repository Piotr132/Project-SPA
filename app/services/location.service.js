app.service('location', ['$location', '$route', function ($location, $route) {
  this.$location = $location;
  this.$route = $route;

  this.goTo = function (path) {
    this.$location.path(path);
  };

  this.inUrlParts = function (parts, link) {
    var isIn = false;

    for (var i = 0; i < parts.length; i++) {
      if ('/' + parts[i] === link) {
        isIn = true;
        break;
      }
    }

    return isIn;
  };

  this.linkIsActive = function (link) {
    if (angular.isUndefined(this.$route.current.$$route)) {
      return false;
    }

    var parts = this.$route.current.$$route.originalPath.split('/');
    parts = parts.filter(function (el) {
      return el !== '';
    });

    return this.$route.current.$$route.originalPath === link || this.inUrlParts(parts, link);
  };
}]);
