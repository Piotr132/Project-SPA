app.directive('navbar', function() {
  return {
     restrict: 'E',
     controller: 'NavbarController',
     controllerAs: 'navbarCtrl',
     templateUrl: 'components/navbar/navbar.html'
  };
});
