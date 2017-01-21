angular.module("myapp", ["ui.router"])

.config(function($routeProvider) {
  $routeProvider
          .when("/", {
              templateUrl: "../index.html",
          })

})

.controller("MainController", function($scope, $http, $state, $stateParams) {

});
