SliderController = function($scope, $sce){
    var ctrl = this;
    $scope.imgSrc = {
        dance_dorm1: $sce.trustAsResourceUrl('resources/images/dance_dorm1.jpg'),
        BW_cheer: $sce.trustAsResourceUrl('resources/images/BW_cheer.jpg')
    }
};

angular.module('debazeApp').component('slider', {
  templateUrl: 'slider.html',
  controller: SliderController
});
