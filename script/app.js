var debazeApp = angular.module('debazeApp',['ngRoute']);
debazeApp.controller('GreetingController',['$scope','$http', function GreetingController($scope, $http) 
{
    $scope.greet = 'hi';
}]);

debazeApp.config(['$sceDelegateProvider','$routeProvider', '$locationProvider', function($sceDelegateProvider,$routeProvider,$locationProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    "https://us-central1-debaze-84aa4.cloudfunctions.net/**"
    ]);

    $locationProvider.hashPrefix('');
    $routeProvider.
    when('/home', {
        template: '<card></card>'
    })
    .when('/gallery', {
        template: '<card-column></card-column>'
    })
    .when('/music', {
        template: '<music></music>'
    })
    .when('/income/:y/:m/:d', {
        template: '<income></income>'
    })
    .when('/contact', {
        template: '<contact></contact>'
    })
    .when('/', {
        redirectTo: '/home'
    })
    .otherwise('/home');

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyA-IueN8BijpZcvzIifGk8Y0WMO5ePoQMc",
    authDomain: "debaze-84aa4.firebaseapp.com",
    databaseURL: "https://debaze-84aa4.firebaseio.com",
    projectId: "debaze-84aa4",
    storageBucket: "debaze-84aa4.appspot.com",
    messagingSenderId: "342525001701"
    };
    firebase.initializeApp(config);

}])
.controller('IndexController',['$scope','$http', function IndexController($scope, $http) 
{
    var ctrl = this;
    $http({
        method: 'GET',
        url: 'config/config.json',
        async: false
    }).then(function(data) {
        ctrl.config = data.data;
    }); 
    $scope.peoples = [
    {
        name: 'baze T',
        age: 22
    }, {
        name: 'Izy K',
        age: 20
    }];
    $scope.getConfig = function(){
        console.log($scope.config.appUrl);
        $http({
            method : "GET",
            url : ctrl.config.appUrl+'/api/posts/1',
            async: false,
            crossDomain : true
        }).then(function(response){
            console.log(response.data.post);
        });
    };

    // $window.fbAsyncInit = function() {
    //     FB.init({ 
    //     appId: '{your-app-id}',
    //     status: true, 
    //     cookie: true, 
    //     xfbml: true,
    //     version: 'v2.4'
    //     });
    // };

    // var appUrl, res;
    // $.getJSON('config/config.json',{
    //     async: false
    // }).done(function(json){
    //     console.log('config');
    //     console.log(json);
    //     config(json);
    // });

    // var config = function(json){
    //     appUrl=json.appUrl;
    // };

    // var getAll = function(){
    //     $.ajax({
    //         url : appUrl+'/api/income/2560/05/25',
    //         method: 'GET',
    //         async: false
    //     }).done(function(data){
    //         res = data;
    //         console.log(res);
    //     });
    //     $('#fb').html(JSON.stringify(res));
    // };
    // $(document).ready(function(){
    //     getAll();
    // });
}]);