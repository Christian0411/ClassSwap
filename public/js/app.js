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

  $scope.swap = function(traderName)
  {
    if($rootScope.loggedIn)
    {
        $rootScope.trader = traderName;
        $location.path("/swap");
    }
    else {
      {
        $rootScope.fromSwap = true;
        $rootScope.trader = traderName;
        $location.path("/login");
      }
    }
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
              if(res.data.error != "Error")
              {
                $rootScope.loggedIn = true;
                $scope.username = username;
                $scope.pass = pass;
                $rootScope.student = res.data[0].csp;
                if($rootScope.fromSwap)
                {
                  $location.path("/swap");  
                }
                else
                {
                  $location.path("/myAccount");
                }

              }
              else
              {
                $scope.showAlert = true;
              }

            })
  }


});

app.controller('swapCtrl', function($scope, $location, $rootScope, $http){

  $scope.swap = function(traderName)
  {
    if($rootScope.loggedIn)
    {
        $rootScope.trader = traderName;
        $location.path("/swap");
    }
    else {
      {
        $location.path("/login");
      }
    }
  }


  $scope.confirmSwap = function()
  {
    var div = document.getElementById('swap_button').style.display = 'none';
    $scope.confirmed = true;
  }

});

app.controller('myAccountCtrl', function($scope, $location, $rootScope, $http){

  $scope.isRemoving = false;
  $scope.isAdding = false;
  $scope.remove = function()
  {
    $scope.isRemoving = true;
  }
  $scope.add = function()
  {
    $scope.isAdding = true;
  }

  $scope.done = function()
  {
    $scope.isRemoving = false;
    $scope.isAdding = false;

  }

  $scope.myAccount = function()
  {
    $location.path("/myAccount");
  }


});
