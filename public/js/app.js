var app = angular.module("myapp",['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../views/home.html",
     })
    .when("/login", {
      templateUrl: "../views/login.html"
    })
    .when("/register", {
      templateUrl: "../views/register.html"
    })
    .when("/swap", {
      templateUrl: "../views/swap.html"
    })
    .otherwise({redirectTo: '/'})
});

app.controller('navCtrl', function($scope, $location, $rootScope, $http){

  $scope.login = function()
  {
    $location.path("/login");
  }


});

app.controller('homeCtrl', function($scope, $location, $rootScope, $http){


  $http({
    method:"GET",
    url:'/api/getStudentInfo'
  }).then(function(res)
  {
    $scope.Students = res.data;
  })


});

app.controller('registerCtrl', function($scope, $location, $rootScope, $http){

  $scope.register = function()
  {
    $location.path("/register");
  }


});

app.controller('swapCtrl', function($scope, $location, $rootScope, $http){

  $scope.swap = function()
  {
    $location.path("/swap");
  }


});
