var app = angular.module('organizer', ['ngRoute', 'ui.bootstrap', 'ngCookies']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : './pages/home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
    })
    .when('/register', {
        templateUrl : './pages/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'registerCtrl'
    })
    .when('/login', {
        templateUrl : './pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
    })
    .when('/logout', {
        templateUrl : './pages/logout/logout.html',
        controller: angular.noop,
        resolve: {
          logoutStatus: ['api', 'user', 'messages', 'location', function (api, user, messages, location) {
            return api.call('user/logout', {}).then(
              function (response) {
                user.clearData();
                messages.addMessage('Zostałeś pomyślnie wylogowany.', 'success');
                location.goTo('/');
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wylogowania.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/workers', {
        templateUrl : './pages/workers/workers.html',
        controller: 'WorkersController',
        controllerAs: 'workersCtrl',
        resolve: {
          getWorkers: ['api', 'workers', 'messages', function (api, workers, messages) {
            return api.call('worker/getAll', {}).then(
              function (response) {
                workers.setWorkers(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania pracowników.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/workers/add-edit', {
        templateUrl : './pages/workers-add-edit/workers-add-edit.html',
        controller: 'WorkersAddEditController',
        controllerAs: 'workersAddEditCtrl',
        resolve: {
          clearWorker: ['workers', function (workers) {
            workers.setWorker({});
          }]
        }
    })
    .when('/workers/add-edit/:id', {
        templateUrl : './pages/workers-add-edit/workers-add-edit.html',
        controller: 'WorkersAddEditController',
        controllerAs: 'workersAddEditCtrl',
        resolve: {
          worker: ['api', 'workers', '$route', function (api, workers, $route) {
            var id = $route.current.params.id;
            return api.call('worker/get', {
              id: id
            }).then(
              function (response) {
                workers.setWorker(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania danych pracownika.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/workers/remove/:id', {
        templateUrl : './pages/workers-remove/workers-remove.html',
        controller: angular.noop,
        resolve: {
          deleteStatus: ['api', 'messages', 'location', '$route', function (api, messages, location, $route) {
            var id = $route.current.params.id;
            return api.call('worker/delete', {
              id: id
            }).then(
              function (response) {
                messages.addMessage('Pracownik pomyślnie usunięty.', 'success');
                location.goTo('/workers');
              },
              function (error) {
                messages.addMessage('Wystąpił błąd podczas próby usunięcia pracownika.', 'danger');
                location.goTo('/workers');
              }
            );
          }]
        }
    })
    .when('/login-history', {
        templateUrl : './pages/login-history/login-history.html',
        controller: 'LoginHistoryController',
        controllerAs: 'loginHistoryCtrl'
    })
    .when('/tasks', {
        templateUrl : './pages/tasks/tasks.html',
        controller: 'TasksController',
        controllerAs: 'tasksCtrl',
        resolve: {
          getTasks: ['api', 'tasks', 'messages', function (api, tasks, messages) {
            return api.call('googleCalendar/getAll', {}).then(
              function (response) {
                tasks.setTasks(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania zadań.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/tasks/add-edit', {
        templateUrl : './pages/tasks-add-edit/tasks-add-edit.html',
        controller: 'TasksAddEditController',
        controllerAs: 'tasksAddEditCtrl',
        resolve: {
          clearTask: ['tasks', function (tasks) {
            tasks.setTask({});
          }],
          getAtendees: ['tasks', 'api', 'messages', function (tasks, api, messages) {
            return api.call('worker/getShortList', {}).then(
              function (response) {
                tasks.setAttendies(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania pracowników.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/tasks/add-edit/:id', {
        templateUrl : './pages/tasks-add-edit/tasks-add-edit.html',
        controller: 'TasksAddEditController',
        controllerAs: 'tasksAddEditCtrl',
        resolve: {
          task: ['api', 'tasks', '$route', function (api, tasks, $route) {
            var id = $route.current.params.id;
            return api.call('googleCalendar/get', {
              id: id
            }).then(
              function (response) {
                tasks.setTask(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania danych zadania.', 'danger');
                location.goTo('/');
              }
            );
          }],
          getAtendees: ['tasks', 'api', 'messages', function (tasks, api, messages) {
            return api.call('worker/getShortList', {}).then(
              function (response) {
                tasks.setAttendies(response);
              },
              function (error) {
                messages.addMessage('Coś poszło nie tak podczas wczytywania pracowników.', 'danger');
                location.goTo('/');
              }
            );
          }]
        }
    })
    .when('/tasks/remove/:id', {
        templateUrl : './pages/tasks-remove/tasks-remove.html',
        controller: angular.noop,
        resolve: {
          deleteStatus: ['api', 'messages', 'location', '$route', function (api, messages, location, $route) {
            var id = $route.current.params.id;
            return api.call('googleCalendar/delete', {
              id: id
            }).then(
              function (response) {
                messages.addMessage('Zadanie pomyślnie usunięte.', 'success');
                location.goTo('/tasks');
              },
              function (error) {
                messages.addMessage('Wystąpił błąd podczas próby usunięcia zadania.', 'danger');
                location.goTo('/tasks');
              }
            );
          }]
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.run(['user', function(user) {
  user.getDataFromCookiesOnAppInit();
}]);
