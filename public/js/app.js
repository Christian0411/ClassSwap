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

app.controller('homeCtrl', function($scope, $location, $rootScope, $http){


  $http({
    method:"GET",
    url:'/api/getStudentInfo'
  }).then(function(res)
  {
    $scope.Students = res.data;
  })


});

app.controller('loginCtrl', function($scope, $location, $rootScope, $http){



});
