var app = angular.module('homeApp', ["ngRoute"])
app
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/editProduct', {
                templateUrl: '../static/productEdit.html',
                controller: 'productController'
            })
            .when('/addProduct', {
                templateUrl: '../static/productAdd.html',
                controller: 'productController'
            })
            .otherwise({
                templateUrl: '../static/productList.html',
                controller: 'productController'
            });
    })
    .controller('productController', function ($rootScope, $scope, $http) {
        const url = 'http://54.80.48.222/'
        $scope.getProducts = function () {
            $http({
                url: url + 'api/products',
                method: "GET"
            }).then(function (response) {
                $rootScope.products = response.data
            })
        }
        $scope.getProduct = function (id) {
            $http({
                url: url + 'api/products/' + id,
                method: 'GET'
            }).then(function (response) {
                $rootScope.product = response.data;
            })
        }
        $scope.deleteProduct = function (product) {
            $http({
                url: url + 'api/products/' + product.productId,
                method: 'DELETE'
            }).then(function (response) {
                var index = $rootScope.products.indexOf(product);
                $rootScope.products.splice(index, 1);
            })
        }
        $scope.addProduct = function (product) {
            console.log(product)
            $http({
                url: url + 'api/products/',
                method: 'POST',
                data: product
            }).then(function (response) {
                var data = response.data
                data.category = $scope.categories.find(x => x.categoryId === response.data.categoryId)
                console.log(data.category)
                $rootScope.products.push(data);
            })
        }
        $scope.clearScope = function ()
        {
            $rootScope.product = {};
            console.log($scope.product)
        }
        $scope.updateProduct = function (product) {
            $http({
                url: url + 'api/products/' + product.productId,
                method: 'PUT',
                data: product
            }).then(function (response) {
                var index = $rootScope.products.indexOf($rootScope.products.find(i => i.productId === product.productId))
                $rootScope.products[index] = product
                $scope.clearScope();
            })
        }
        $scope.getCategories = function () {
            $http({
                url: url + 'api/categories/',
                method: "GET"
            }).then(function (response) {
                $scope.categories = response.data;
            })
        }
    })
