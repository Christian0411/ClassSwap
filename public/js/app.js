var app = angular.module("myapp",['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../views/home.html",
     })
    .when("/login", {
      templateUrl: "../views/login.html"
    })
    .otherwise({redirectTo: '/'})
});

app.controller('navCtrl', function($scope, $location, $rootScope, $http){

  $scope.login_clicked = function()
  {
    $location.path("/login");
  }


});

app.controller('indexCtrl', function($scope, $location, $rootScope, $http){



});

app.controller('loginCtrl', function($scope, $location, $rootScope, $http){



});
