ContactController = function($scope, $sce){
    var ctrl = this;
    $scope.imgSrc = {
        coding2: $sce.trustAsResourceUrl('resources/images/coding2.png'),
        coding3: $sce.trustAsResourceUrl('resources/images/coding3.png'),
    }
};

angular.module('debazeApp').component('contact', {
  templateUrl: 'contact.html',
  controller: ContactController
});
