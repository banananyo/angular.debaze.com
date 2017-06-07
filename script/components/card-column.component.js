CardColumnController = function($scope, $sce){
    var ctrl = this;
    $scope.imgSrc = {
        mePmeen: $sce.trustAsResourceUrl('resources/images/me_Pmeen.jpg'),
        rayong1: $sce.trustAsResourceUrl('resources/images/rayong1.jpg'),
        izy1: $sce.trustAsResourceUrl('resources/images/izy1.jpg'),
        meSuper: $sce.trustAsResourceUrl('resources/images/me_super.jpg'),
    }
};

angular.module('debazeApp').component('cardColumn', {
  templateUrl: 'card-column.html',
  controller: CardColumnController
});
