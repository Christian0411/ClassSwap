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

  $scope.logoClick = function()
  {
    $location.path("/");
  }

  $scope.logout = function()
  {
    $rootScope.loggedIn = false;
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

app.controller('registerCtrl', function($scope, $location, $rootScope, $http){


  $scope.register = function()
  {
    $location.path("/register");
  }

  $scope.submitLogIn = function()
  {
    var username = $scope.username;
    var pass = $scope.pass;

    var body = {
              'username': username,
              'pass': pass
    };

    $http({
              method: "POST",
              url: "/api/login",
              data: body
          }).then(function(res,status,headers) {
              if(res.error != "Error")
              {
                $rootScope.loggedIn = true;
                $scope.username = username;
                $scope.pass = pass;
                $rootScope.student = res.data;
                $location.path("/myAccount");
              }

            })
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

  $scope.confirmSwap = function()
  {
    var div = document.getElementById('swap_button').style.display = 'none';
    $scope.confirmed = true;
  }

});

app.controller('myAccountCtrl', function($scope, $location, $rootScope, $http){

  $scope.isRemoving = false;
  $scope.remove = function()
  {
    $scope.isRemoving = true;
  }

  $scope.done = function()
  {
    console.log("here")
    $scope.isRemoving = false;
  }

  $scope.myAccount = function()
  {
    $location.path("/myAccount");
  }


});
