app.directive('customLoader', function() {
  return {
     restrict: 'E',
     controller: 'LoaderController',
     controllerAs: 'loaderCtrl',
     templateUrl: 'components/loader/loader.html'
  };
});
