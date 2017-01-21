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
    .when("/myAccount", {
      templateUrl: "../views/myAccount.html"
    })
    .otherwise({redirectTo: '/'})
});

app.controller('navCtrl', function($scope, $location, $rootScope, $http){

  $scope.login = function()
  {
    $location.path("/login");
  }


});

app.controller('logoCtrl', function($scope, $location, $rootScope, $http){

  $scope.logoClick = function()
  {
    $location.path("/");
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

  // $scope.swap = function()
  // {
  //   if($rootScope.loggedIn)
  //   {
  //       $location.path("/swap");
  //   }
  //   else {
  //     {
  //       $location.path("/login");
  //     }
  //   }
  // }
  $scope.swap = function(traderName)
  {
    $rootScope.trader = traderName;
    $location.path("/swap");
  }


});

app.controller('confirmSwapCtrl', function($scope, $location, $rootScope, $http){

  $scope.confirmSwap = function()
  {
    var div = document.getElementById('swap_button').style.display = 'none';
    $scope.confirmed = true;
  }


});

app.controller('logoutCtrl', function($scope, $location, $rootScope, $http){

  $scope.logout = function()
  {
    $location.path("/");
  }


});

app.controller('accountCtrl', function($scope, $location, $rootScope, $http){

  $scope.myAccount = function()
  {
    $location.path("/myAccount");
  }


});
