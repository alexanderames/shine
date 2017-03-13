var app = angular.module(
  'customers',
  [
    'ngRoute',
    'templates'
  ]
); 
    // configure our routes here...
app.config([
          "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/", {
      controller: "CustomerSearchController",
      templateUrl: "customer_search.html"
    }).when("/:id",{
      controller: "CustomerDetailController",
      templateUrl: "customer_detail.html"
    });
  }
]);

app.controller("CustomerSearchController", [ 
          '$scope','$http', '$location',
  function($scope , $http, $location) {                         

    var page = 0;

    $scope.customers = [];
    $scope.search = function(searchTerm) {   
      $scope.loading = true;
      if (searchTerm.length < 3) {
        return;
      }
      $http.get("/customers.json",  
                { "params": { "keywords": searchTerm, "page": page } }
      ).success(
        function(data,status,headers,config) { 
          $scope.customers = data;
          $scope.loading = false;
      }).error(
        function(data,status,headers,config) {
          $scope.loading = false;
          alert("There was a problem: " + status);
        });
    }
    $scope.viewDetails = function(customer) {
      $location.path("/" + customer.id);
    }
    $scope.previousPage = function() {
      if (page > 0) {
        page = page - 1;
        $scope.search($scope.keywords);
      }
    }
    $scope.nextPage = function() {
      page = page + 1;
      $scope.search($scope.keywords);
    }
  }
]);