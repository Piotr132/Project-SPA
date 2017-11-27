app.directive('customFooter', function() {
  return {
     restrict: 'E',
     controller: angular.noop,
     templateUrl: 'components/footer/footer.html'
  };
});
